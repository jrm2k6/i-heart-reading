<?php

namespace App\Listeners\UserConfirmed;

use App\Events\UserConfirmed;
use App\Models\PrimaryContact;
use App\Models\SchoolAdmin;
use App\Models\User;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class MakeUserAdminIfPrimaryContact
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
     * @param  UserConfirmed  $event
     * @return void
     */
    public function handle(UserConfirmed $event)
    {
        $email = $event->email;
        $primaryContact = PrimaryContact::where('email_address', $email)->first();

        if ($primaryContact) {
            $user = User::where('email', $email)->first();

            $schoolId = $primaryContact->school_id;
            
            if ($user) {
                $user->role = 'teacher';
                $user->save();

                SchoolAdmin::create([
                    'user_id' => $user->id,
                    'school_id' => $schoolId
                ]);
            }
        }
    }
}
