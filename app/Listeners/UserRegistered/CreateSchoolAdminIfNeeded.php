<?php

namespace App\Listeners\UserRegistered;

use App\Events\UserRegistered;
use App\Models\SchoolAdmin;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateSchoolAdminIfNeeded
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
            $schoolId = $event->data['school_id'];

            if ($schoolId) {
                SchoolAdmin::create([
                    'user_id' => $user->id,
                    'school_id' => $schoolId
                ]);
            }
        }
    }
}
