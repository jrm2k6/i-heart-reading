<?php

namespace App\Listeners\UserConfirmed;

use App\Events\UserConfirmed;
use App\Models\EmailConfirmation;
use App\Models\User;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class MarkUserAsConfirmed
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
        EmailConfirmation::where('email', $email)->first()->delete();
        User::where('email', $email)->update([
            'confirmed' => true
        ]);
    }
}
