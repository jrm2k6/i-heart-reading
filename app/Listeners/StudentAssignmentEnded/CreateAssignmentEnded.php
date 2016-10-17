<?php

namespace App\Listeners\StudentAssignmentEnded;

use App\Events\AssignmentEndedUpdateCreated;
use App\Events\StudentAssignmentEnded;
use App\Models\AssignmentUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Cache;

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
        $assignmentId = $event->assignmentId;
        $previousUpdateId = $this->findPreviousUpdate($assignmentId);
        $assignmentUpdate = new AssignmentUpdate;
        $assignmentUpdate->assignment_id = $assignmentId;
        $assignmentUpdate->mark_book_read = true;
        $assignmentUpdate->save();

        Cache::forget('previous_assignment_id_for_' . $assignmentId);
        Cache::forever('previous_assignment_id_for_' . $assignmentId, $assignmentUpdate->id);

        event(new AssignmentEndedUpdateCreated($event->assignmentId));
    }

    private function findPreviousUpdate($assignmentId) {
        $previousAssignmentIdCached = Cache::get('previous_assignment_id_for_' . $assignmentId);
        if ($previousAssignmentIdCached !== null) {
            return $previousAssignmentIdCached;
        } else {
            $ascUpdates = AssignmentUpdate::where('assignment_id', $assignmentId)
                ->orderBy('created_at', 'DESC')->get()->last();
            return $ascUpdates;
        }
    }
}
