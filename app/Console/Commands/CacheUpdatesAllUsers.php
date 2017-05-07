<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Facades\Artisan;

class CacheUpdatesAllUsers extends Command
{
    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stats:update_all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Queue a job to cache updates for each user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        User::all()->chunk(500)->each(function($chunk) {
            $chunk->each(function($user) {

                Artisan::queue('stats:update', [
                    'userId' => $user->id,
                    '--queue' => 'default'
                ]);

            });
        });
    }
}
