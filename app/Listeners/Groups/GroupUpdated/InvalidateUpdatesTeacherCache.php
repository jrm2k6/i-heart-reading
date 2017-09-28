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

        if (is_null($updatedGroup) || $oldGroup->is_archived == !$updatedGroup->is_archived ||
            $oldGroup->teacher_id !== $updatedGroup->teacher_id
        ) {
            $cacheKey = 'updates_teacher_' . $oldGroup->teacher_id;
            Cache::forget($cacheKey);
        }
    }
}
