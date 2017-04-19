<?php

namespace App\Listeners\UserRegistered;

use App\Events\UserRegistered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class MarkUserAsBelongingToSchool
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
     * @param  UserRegistered  $event
     * @return void
     */
    public function handle(UserRegistered $event)
    {
        $user = $event->user;

        if (!empty($event->data)) {
            $schoolId = $event->data['school_id'];
            $user->school_id = $schoolId;
            $user->save();
        }

    }
}
