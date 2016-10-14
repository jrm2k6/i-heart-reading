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

        $updates = User::find($userId)->assignmentUpdates->map(
            function($update) {

                $sameYear = $update->created_at->year == Carbon::now()->year;
                return collect([
                    'current_day' => (int) ($update->created_at->dayOfYear == Carbon::now()->dayOfYear && $sameYear),
                    'current_week' => (int) ($update->created_at->weekOfYear == Carbon::now()->weekOfYear && $sameYear),
                    'current_month' => (int) ($update->created_at->month == Carbon::now()->month && $sameYear),
                    'current_year' => (int) ($sameYear),
                    'num_pages' => $update->num_pages,
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

            $updatedNumPagesRead = $acc['num_pages_read'] + $numPagesRead;
            $updatedCompletedBooks = $acc['books_read'] + $isCompletedBook;

            return [
                'num_pages_read' => $updatedNumPagesRead,
                'books_read' => $updatedCompletedBooks
            ];

        }, ['num_pages_read' => 0, 'books_read' => 0]);
    }
}
