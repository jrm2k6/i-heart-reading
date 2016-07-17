<?php

namespace App\Listeners\UserRegistered;

use App\Events\UserRegistered;
use App\Models\EmailConfirmation;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Hash;

class CreateConfirmationToken
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  UserRegistered  $event
     * @return void
     */
    public function handle(UserRegistered $event)
    {
        $token = str_random(30);
        $email = $event->user->email;

        EmailConfirmation::create([
           'token' => $token,
            'email' => $email
        ]);
    }
}
