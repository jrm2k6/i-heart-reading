<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;

class AssignmentUpdatesControllerTest extends TestCase
{
    use WithoutMiddleware;
    
    public function testGetMyUpdates()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $book = factory(App\Models\Book::class)->create();
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        $assignmentProgress1 = factory(App\Models\AssignmentUpdate::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages' => 10
        ]);

        $assignmentProgress2 = factory(App\Models\AssignmentUpdate::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages' => 25,
            'previous_assignment_id' => $assignmentProgress1->id
        ]);

        // when
        $this->actingAs($user)->json('GET', 'api/updates/me', [])
             ->seeJsonStructure([
                 'updates' => [
                     '*' => [
                         "assignment" => [ 
                             "book", "book_id",
                        ],
                        "mark_book_read", "num_pages", "previous_assignment_id",
                        "num_pages_read"
                     ]
                 ]
             ]);
    }
}