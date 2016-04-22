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


        $daily_updates = $updates->groupBy('current_day')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $weekly_updates = $updates->groupBy('current_week')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $monthly_updates = $updates->groupBy('current_month')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $yearly_updates = $updates->groupBy('current_year')->map(function($group) {
            return $this->reduceGroup($group);
        })->get(1);

        $stats = [
            'daily' => $daily_updates,
            'weekly' => $weekly_updates,
            'monthly' => $monthly_updates,
            'yearly' => $yearly_updates
        ];

        Cache::forget('stats_'.$userId);
        Cache::forever('stats_'.$userId, $stats);
    }

    private function reduceGroup($group)
    {
        return $group->reduce(function($acc, $current) {
            $is_completed_book = (int) $current->get('mark_book_read');
            $num_pages_read = $current->get('num_pages');

            $updated_num_pages_read = $acc['num_pages_read'] + $num_pages_read;
            $updated_completed_books = $acc['books_read'] + $is_completed_book;

            return [
                'num_pages_read' => $updated_num_pages_read,
                'books_read' => $updated_completed_books
            ];

        }, ['num_pages_read' => 0, 'books_read' => 0]);
    }
}
