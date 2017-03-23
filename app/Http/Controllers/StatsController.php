<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class StatsController extends Controller
{
    public function getStats()
    {
        $userId = Auth::user()->id;
        return $this->getStatsForStudent($userId);
    }

    public function getStatsForStudent($studentId)
    {
        $stats = Cache::get('stats_'.$studentId);

        if ($stats) {
            return response([
                'stats' => $stats
            ], 200);
        }

        return response(['stats' => []], 200);
    }
}
