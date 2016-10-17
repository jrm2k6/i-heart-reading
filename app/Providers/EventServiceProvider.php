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
            'App\Listeners\UserRegistered\SendConfirmationEmail'
        ],
        'App\Events\UserConfirmed' => [
            'App\Listeners\UserConfirmed\MarkUserAsConfirmed',
        ],
        'App\Events\ConfirmationEmailResent' => [
            'App\Listeners\ConfirmationEmailResent\SendConfirmationEmail',
        ],
        'App\Events\StudentAssignmentUpdated' => [
            'App\Listeners\StudentAssignmentUpdated\CreateAssignmentUpdate',
            'App\Listeners\StudentAssignmentUpdated\UpdateStats'
        ],
        'App\Events\StudentAssignmentEnded' => [
            'App\Listeners\StudentAssignmentEnded\CreateAssignmentEnded',
            'App\Listeners\StudentAssignmentEnded\UpdateStatsForAssignmentEnded'
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\Goodreads\GoodreadsExtendSocialite@handle',
        ],
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
