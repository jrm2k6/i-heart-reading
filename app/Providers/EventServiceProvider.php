<?php

namespace App\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\UserRegistered' => [
            'App\Listeners\UserRegistered\CreateConfirmationToken',
            'App\Listeners\UserRegistered\SendConfirmationEmail',
            'App\Listeners\UserRegistered\MarkUserAsStaffIfNeeded',
            'App\Listeners\UserRegistered\CreateSchoolAdminIfNeeded'
        ],
        'App\Events\UserConfirmed' => [
            'App\Listeners\UserConfirmed\MarkUserAsConfirmed',
            'App\Listeners\UserConfirmed\MakeUserAdminIfPrimaryContact'
        ],
        'App\Events\ConfirmationEmailResent' => [
            'App\Listeners\ConfirmationEmailResent\SendConfirmationEmail'
        ],
        'App\Events\StudentAssignmentUpdated' => [
            'App\Listeners\StudentAssignmentUpdated\CreateAssignmentUpdate'
        ],
        'App\Events\StudentAssignmentEnded' => [
            'App\Listeners\StudentAssignmentEnded\CreateAssignmentEnded'  
        ],
        'App\Events\AssignmentUpdateCreated' => [
            'App\Listeners\AssignmentUpdateCreated\UpdateStats'
        ],
        'App\Events\AssignmentEndedUpdateCreated' => [
            'App\Listeners\AssignmentEndedUpdateCreated\UpdateStatsForAssignmentEnded'
        ],

        'App\Events\Signup\SchoolCreated' => [
            'App\Listeners\Signup\SchoolCreated\AttachOrganizationTokenToCreatedSchool',
            'App\Listeners\Signup\SchoolCreated\CreateSignupAdminToken',
            'App\Listeners\Signup\SchoolCreated\CreateSignupStudentToken',
        ],

        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\Goodreads\GoodreadsExtendSocialite@handle',
        ]
    ];

    /**
     * Register any other events for your application.
     *
     * @param  \Illuminate\Contracts\Events\Dispatcher  $events
     * @return void
     */
    public function boot(DispatcherContract $events)
    {
        parent::boot($events);

        //
    }
}
