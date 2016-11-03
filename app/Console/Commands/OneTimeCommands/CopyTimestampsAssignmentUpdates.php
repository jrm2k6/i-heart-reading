<?php

namespace App\Console\Commands\OneTimeCommands;

use Illuminate\Console\Command;
use App\Models\AssignmentUpdate;

class CopyTimestampsAssignmentUpdates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'one_time_commands:copy_timestamps_updates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy from old to new timstamps on assignment updates table';

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
        AssignmentUpdate::all()->each(function($update) {
            $update->created_at = $update->created_at_old;
            $update->updated_at = $update->updated_at_old;
            $update->save();
        });
    }
}
