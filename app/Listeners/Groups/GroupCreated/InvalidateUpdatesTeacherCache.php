<?php

namespace App\Listeners\Groups\GroupCreated;

use App\Events\Groups\GroupCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

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
     * @param  GroupCreated  $event
     * @return void
     */
    public function handle(GroupCreated $event)
    {
        //
    }
}
