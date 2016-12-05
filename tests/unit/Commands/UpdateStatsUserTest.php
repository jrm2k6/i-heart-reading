<?php
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Testing\Traits\DatabaseTruncate;

use Carbon\Carbon;

class UpdateStatsUserTest extends TestCase
{
    use DatabaseTruncate;
    public function testUserWithoutUpdatesReturnsZeroForBothValues()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $book = factory(App\Models\Book::class)->create();
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        // when
        Artisan::call('stats:update', ['userId' => $user->id]);

        // then
        $stats = Cache::get('stats_' . $user->id);

        $this->assertNull($stats['yearly']);
        $this->assertNull($stats['monthly']);
        $this->assertNull($stats['weekly']);
        $this->assertNull($stats['daily']);
    }

    public function testStatsWithUpdatesToday()
    {
        // given
        $user = factory(App\Models\User::class)->create();

        $book = factory(App\Models\Book::class)->create(['num_pages' => 100]);
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        $update = factory(App\Models\AssignmentUpdate::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages' => 100
        ]);


        // when
        Artisan::call('stats:update', ['userId' => $user->id]);

        // then
        $stats = Cache::get('stats_' . $user->id);

        $this->assertEquals($stats['yearly']['num_pages_read'], 100);
        $this->assertEquals($stats['monthly']['num_pages_read'], 100);
        $this->assertEquals($stats['weekly']['num_pages_read'], 100);
        $this->assertEquals($stats['daily']['num_pages_read'], 100);
        $this->assertEquals($stats['yearly']['books_read'], 0);
        $this->assertEquals($stats['monthly']['books_read'], 0);
        $this->assertEquals($stats['weekly']['books_read'], 0);
        $this->assertEquals($stats['daily']['books_read'], 0);
    }

    public function testStatsWithUpdatesThisWeek()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $book = factory(App\Models\Book::class)->create();
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        $update = factory(App\Models\AssignmentUpdate::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages' => 100,
            'created_at' => Carbon::yesterday()
        ]);

        // when
        Artisan::call('stats:update', ['userId' => $user->id]);

        // then
        $stats = Cache::get('stats_' . $user->id);

        $this->assertEquals($stats['yearly']['num_pages_read'], 100);
        $this->assertEquals($stats['monthly']['num_pages_read'], 100);
        $this->assertEquals($stats['weekly']['num_pages_read'], 100);
        $this->assertEquals($stats['yearly']['books_read'], 0);
        $this->assertEquals($stats['monthly']['books_read'], 0);
        $this->assertEquals($stats['weekly']['books_read'], 0);
        $this->assertNull($stats['daily']);
    }

    public function testStatsWithUpdatesThisMonth()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $book = factory(App\Models\Book::class)->create();
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        $update = factory(App\Models\AssignmentUpdate::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages' => 100,
            'created_at' => Carbon::now()->startOfMonth()
        ]);

        // when
        Artisan::call('stats:update', ['userId' => $user->id]);

        // then
        $stats = Cache::get('stats_' . $user->id);

        $this->assertEquals($stats['yearly']['num_pages_read'], 100);
        $this->assertEquals($stats['monthly']['num_pages_read'], 100);
        $this->assertEquals($stats['yearly']['books_read'], 0);
        $this->assertEquals($stats['monthly']['books_read'], 0);
        $this->assertNull($stats['daily']);
    }

    public function testStatsWithUpdatesThisYear()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $book = factory(App\Models\Book::class)->create();
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        $update = factory(App\Models\AssignmentUpdate::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages' => 100,
            'created_at' => Carbon::now()->startOfYear(),
        ]);

        // when
        Artisan::call('stats:update', ['userId' => $user->id]);

        // then
        $stats = Cache::get('stats_' . $user->id);

        $this->assertEquals($stats['yearly']['num_pages_read'], 100);
        $this->assertEquals($stats['yearly']['books_read'], 0);
        $this->assertNull($stats['daily']);
        $this->assertNull($stats['weekly']);
        $this->assertNull($stats['monthly']);
    }
}
