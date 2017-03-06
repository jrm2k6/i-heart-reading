<?php
use App\Events\StudentAssignmentUpdated;
use Testing\Traits\DatabaseTruncate;

class StudentAssignmentUpdatedEventTest extends TestCase
{
    use DatabaseTruncate;
    public function testAssignmentUpdateIsCreatedWhenDispatching()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $book = factory(App\Models\Book::class)->create();
        $assignment = factory(App\Models\BookAssignment::class)->create([
            'user_id' => $user->id,
            'book_id' => $book->id
        ]);

        $assignmentProgress = factory(App\Models\AssignmentProgress::class)->create([
            'assignment_id' => $assignment->id,
            'num_pages_read' => 200
        ]);

        // when
        event(new StudentAssignmentUpdated($assignment->id, 200));

        // then
        $this->seeInDatabase('assignment_updates', [
            'assignment_id' => $assignment->id,
            'num_pages' => 200 
        ]);
    }
}