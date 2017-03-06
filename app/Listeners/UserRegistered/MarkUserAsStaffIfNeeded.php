<?php

namespace App\Listeners\UserRegistered;

use App\Events\UserRegistered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class MarkUserAsStaffIfNeeded
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
        $isStaff = $event->isStaff;

        if ($isStaff) {
            $user->role = 'admin';
            $user->save();
        }
    }
}
