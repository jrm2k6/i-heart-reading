<?php

namespace App\Listeners\StudentAssignmentUpdated;

use App\Events\AssignmentUpdateCreated;
use App\Events\StudentAssignmentUpdated;
use App\Models\AssignmentUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Cache;

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
        $assignmentId = $event->assignmentId;
        $previousUpdateId = $this->findPreviousUpdate($assignmentId);
        $assignmentUpdate = new AssignmentUpdate;
        $assignmentUpdate->assignment_id = $assignmentId;
        $assignmentUpdate->num_pages = $event->nbPages;
        $assignmentUpdate->previous_assignment_id = $previousUpdateId;
        $assignmentUpdate->save();

        Cache::forget('previous_assignment_id_for_' . $assignmentId);
        Cache::forever('previous_assignment_id_for_' . $assignmentId, $assignmentUpdate->id);
        
        event(new AssignmentUpdateCreated($assignmentId));
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
