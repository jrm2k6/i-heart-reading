<?php
use App\Events\StudentAssignmentEnded;
use Testing\Traits\DatabaseTruncate;

class StudentAssignmentEndedEventTest extends TestCase
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
            'is_read' => true
        ]);

        // when
        event(new StudentAssignmentEnded($assignment->id));

        // then
        $this->seeInDatabase('assignment_updates', [
            'assignment_id' => $assignment->id,
            'mark_book_read' => true 
        ]);
    }
}