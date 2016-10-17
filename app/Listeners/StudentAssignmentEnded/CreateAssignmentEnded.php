<?php

namespace App\Listeners;

use App\Events\StudentAssignmentEnded;
use App\Models\AssignmentUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateAssignmentEnded
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  StudentAssignmentEnded  $event
     * @return void
     */
    public function handle(StudentAssignmentEnded $event)
    {
        $assignmentUpdate = new AssignmentUpdate;
        $assignmentUpdate->assignment_id = $event->assignmentId;
        $assignmentUpdate->mark_book_read = true;
        $assignmentUpdate->save();
    }
}
