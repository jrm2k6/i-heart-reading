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
        $stats = Cache::get('stats_'.$userId);

        $daily = ['nb_pages_read' => 0, 'nb_books_read' => 0];
        $weekly = ['nb_pages_read' => 0, 'nb_books_read' => 0];
        $monthly = ['nb_pages_read' => 0, 'nb_books_read' => 0];
        $yearly = ['nb_pages_read' => 0, 'nb_books_read' => 0];

        return response([
            'stats' => $stats
        ], 200);
    }
}
