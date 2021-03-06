<?php

namespace App\Listeners\UserRegistered;

use App\Events\UserRegistered;
use App\Models\EmailConfirmation;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendConfirmationEmail
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
        $confirmationToken = EmailConfirmation::where('email', $user->email)->first();

        if ($confirmationToken) {
            $confirmationToken = $confirmationToken->token;
            $urlConfirmation = env('APP_URL').'/confirm?email='.$user->email.'&token='.$confirmationToken;

            $data = ['firstName' => $user->name, 'urlConfirmation' => $urlConfirmation];

            Mail::queue('emails.welcome', $data, function ($message) use ($user) {
                $message->from('welcome@iheartreading.co', 'I Heart Reading');
                $message->to($user->email);
            });
        }
    }
}
