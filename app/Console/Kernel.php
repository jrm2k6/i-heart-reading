<?php

namespace App\Console;

use App\Console\Commands\CacheUpdatesAllUsers;
use App\Console\Commands\OneTimeCommands\CreateGoogleAPIBooks;
use App\Console\Commands\ResetDemoApp;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\GenerateOrganizationSignupToken::class,
        Commands\UpdateStatsUser::class,
        Commands\SendTestEmail::class,
        Commands\OneTimeCommands\AttachPreviousAssignmentUpdateId::class,
        Commands\OneTimeCommands\CopyTimestampsAssignmentUpdates::class,
        Commands\Testing\DeleteContentTestingDatabase::class,
        CreateGoogleAPIBooks::class,
        CacheUpdatesAllUsers::class,
        ResetDemoApp::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        if (env('DEMO_MODE', false) === true) {
            $schedule->command('demo:reset')
                ->dailyAt('1:00');
            $schedule->command('stats:update_all')
                ->dailyAt('1:10');
        }
    }
}
