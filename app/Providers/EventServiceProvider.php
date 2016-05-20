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
        'App\Events\StudentAssignmentUpdated' => [
            'App\Listeners\CreateAssignmentUpdate',
            'App\Listeners\UpdateStats'
        ],
        'App\Events\StudentAssignmentEnded' => [
            'App\Listeners\CreateAssignmentEnded',
            'App\Listeners\UpdateStatsForAssignmentEnded'
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
