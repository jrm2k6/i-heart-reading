<?php

namespace App\Listeners\Signup\SchoolCreated;

use App\Events\Signup\SchoolCreated;
use App\Models\SignupTokens;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateSignupAdminToken
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
     * @param  SchoolCreated  $event
     * @return void
     */
    public function handle(SchoolCreated $event)
    {
        $schoolId = $event->schoolId;

        SignupToken::create([
            'token' => str_random(10),
            'school_id' => $schoolId,
            'type' => 'admin'
        ]);
    }
}
