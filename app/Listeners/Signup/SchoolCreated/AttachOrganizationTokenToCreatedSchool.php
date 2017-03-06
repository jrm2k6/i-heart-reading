<?php

namespace App\Listeners\Signup\SchoolCreated;

use App\Models\School;
use App\Models\SignupOrganizationToken;
use App\Events\Signup\SchoolCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AttachOrganizationTokenToCreatedSchool
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
        $organizationToken = $event->session->get('organization_token');
        
        $signupOrganizationToken = SignupOrganizationToken::where('token', $organizationToken)->first();
        
        if ($signupOrganizationToken) {
            School::find($schoolId)->update([
                'organization_token_id' => $signupOrganizationToken->id
            ]);
        }
    }
}
