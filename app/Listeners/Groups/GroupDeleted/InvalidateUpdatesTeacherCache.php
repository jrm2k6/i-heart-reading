<?php

namespace App\Listeners\Groups\GroupDeleted;

use App\Events\Groups\GroupDeleted;
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
     * @param  GroupDeleted  $event
     * @return void
     */
    public function handle(GroupDeleted $event)
    {
        $teacherId = $event->teacherId;

        if (!is_null($teacherId)) {
            $cacheKey = 'updates_teacher_' . $teacherId;
            Cache::forget($cacheKey);
        }
    }
}
