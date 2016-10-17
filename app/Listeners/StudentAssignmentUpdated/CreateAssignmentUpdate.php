<?php

namespace App\Listeners\StudentAssignmentUpdated;

use App\Events\AssignmentUpdateCreated;
use App\Events\StudentAssignmentUpdated;
use App\Models\AssignmentUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateAssignmentUpdate
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
     * @param  StudentAssignmentUpdated  $event
     * @return void
     */
    public function handle(StudentAssignmentUpdated $event)
    {
        $assignmentUpdate = new AssignmentUpdate;
        $assignmentUpdate->assignment_id = $event->assignmentId;
        $assignmentUpdate->num_pages = $event->nbPages;
        $assignmentUpdate->save();

        event(new AssignmentUpdateCreated($event->assignmentId));
    }
}
