<?php

namespace App\Listeners;

use App\Events\StudentAssignmentEnded;
use App\Models\BookAssignment;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Artisan;

class UpdateStatsForAssignmentEnded
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
        $assignment = BookAssignment::find($event->assignmentId);
        $userId = $assignment->user->id;

        Artisan::queue('stats:update', [
            'userId' => $userId
        ]);
    }
}
