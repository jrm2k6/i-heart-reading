<?php

namespace App\Console\Commands\OneTimeCommands;

use Illuminate\Console\Command;
use App\Models\AssignmentUpdate;

class AttachPreviousAssignmentUpdateId extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'one_time_commands:attach_previous_assignment_update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Iterate through updates and attach a previous assignment to fix statistics';

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
        $updatesGroupByAssignment = AssignmentUpdate::all()->groupBy('assignment_id');
        
        $updatesGroupByAssignment->each(function($group) {
            $orderedUpdates = $group->sortBy('created_at');
            while ($orderedUpdates->count() > 0) {
                $currentUpdate = $orderedUpdates->pop();
                $previousUpdate = $orderedUpdates->last();
                if ($previousUpdate) {
                    $currentUpdate->previous_assignment_id = $previousUpdate->id;
                    $currentUpdate->save();
                }
            }
        });
    }
}
