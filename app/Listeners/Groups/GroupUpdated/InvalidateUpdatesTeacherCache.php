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
        $cacheKeyOldTeacher = 'updates_teacher_' . $event->previousTeacherId;
        if ((bool) $event->wasArchived !== (bool) $event->isArchived) {
            Cache::forget($cacheKeyOldTeacher);
        }

        if ($event->previousTeacherId !== $event->currentTeacherId) {
            Cache::forget($cacheKeyOldTeacher);
            $cacheKeyNewTeacher = 'updates_teacher_' . $event->currentTeacherId;
            Cache::forget($cacheKeyNewTeacher);
        }
    }
}
