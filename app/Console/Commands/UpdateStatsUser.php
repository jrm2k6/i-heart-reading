<?php namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class UpdateStatsUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stats:update {userId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update statistics for specified user';

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
        $userId = $this->argument('userId');

        $startDate = Carbon::createFromDate(2016, 9, 1);
        $endDate = Carbon::createFromDate(2017, 6, 1);

        $updates = User::find($userId)->assignmentUpdates->map(
            function($update) use ($startDate, $endDate) {
                
                $previousAssignmentUpdate = $update->previousAssignmentUpdate;
                $duringCurrentYear = $update->created_at->between($startDate, $endDate);

                return collect([
                    'current_day' => (int) ($update->created_at->dayOfYear == Carbon::now()->dayOfYear && $duringCurrentYear),
                    'current_week' => (int) ($update->created_at->weekOfYear == Carbon::now()->weekOfYear && $duringCurrentYear),
                    'current_month' => (int) ($update->created_at->month == Carbon::now()->month && $duringCurrentYear),
                    'current_year' => (int) ($duringCurrentYear),
                    'num_pages' => $update->num_pages,
                    'previous_num_pages' => $previousAssignmentUpdate ? $previousAssignmentUpdate->num_pages : null,
                    'mark_book_read' => $update->mark_book_read]);
            }
        );

        $dailyUpdates = $updates->groupBy('current_day')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $weeklyUpdates = $updates->groupBy('current_week')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $monthlyUpdates = $updates->groupBy('current_month')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $yearlyUpdates = $updates->groupBy('current_year')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $stats = [
            'daily' => $dailyUpdates,
            'weekly' => $weeklyUpdates,
            'monthly' => $monthlyUpdates,
            'yearly' => $yearlyUpdates
        ];

        Cache::forget('stats_'.$userId);
        Cache::forever('stats_'.$userId, $stats);
    }

    private function reduceGroup($group)
    {
        return $group->reduce(function($acc, $current) {
            $isCompletedBook = (int) $current->get('mark_book_read');
            $numPagesRead = $current->get('num_pages');
            $previousPagesRead = $current->get('previous_num_pages');
            $toSubtract = $previousPagesRead ?? 0;
            $updatedNumPagesRead = $acc['num_pages_read'];
            if ($isCompletedBook == 0) {
                 $updatedNumPagesRead += $numPagesRead - $previousPagesRead;
            }

            $updatedCompletedBooks = $acc['books_read'] + $isCompletedBook;

            return [
                'num_pages_read' => $updatedNumPagesRead,
                'books_read' => $updatedCompletedBooks
            ];

        }, ['num_pages_read' => 0, 'books_read' => 0]);
    }
}
