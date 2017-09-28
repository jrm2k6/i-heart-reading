<?php

namespace App\Listeners\Groups\GroupUpdated;

use App\Events\Groups\GroupUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Cache;

class InvalidateUpdatesTeacherCache
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
     * @param  GroupUpdated  $event
     * @return void
     */
    public function handle(GroupUpdated $event)
    {
        $oldGroup = $event->oldGroup;
        $updatedGroup = $event->updatedGroup;

        $cacheKeyOldTeacher = 'updates_teacher_' . $oldGroup->teacher_id;
        if ($oldGroup->is_archived == !$updatedGroup->is_archived) {
            Cache::forget($cacheKeyOldTeacher);
        }

        if ($oldGroup->teacher_id !== $updatedGroup->teacher_id) {
            Cache::forget($cacheKeyOldTeacher);
            $cacheKeyNewTeacher = 'updates_teacher_' . $updatedGroup->teacher_id;
            Cache::forget($cacheKeyNewTeacher);
        }
    }
}
