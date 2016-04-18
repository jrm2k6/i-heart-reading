<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class StatsController extends Controller
{
    public function getStats()
    {
        $daily = ['nb_pages_read' => 0, 'nb_books_read' => 0];
        $weekly = ['nb_pages_read' => 0, 'nb_books_read' => 0];
        $monthly = ['nb_pages_read' => 0, 'nb_books_read' => 0];
        $yearly = ['nb_pages_read' => 0, 'nb_books_read' => 0];

        return response([
            'daily' => $daily,
            'weekly' => $weekly,
            'monthly' => $monthly,
            'yearly' => $yearly
        ], 200);
    }
}
