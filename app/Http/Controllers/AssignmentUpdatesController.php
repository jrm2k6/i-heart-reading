<?php namespace App\Http\Controllers;

use App\Models\AssignmentUpdate;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AssignmentUpdatesController extends Controller
{
    public function getMyUpdates()
    {
        $assignmentsUpdates = Auth::user()->assignments->map(
            function($assignment) {
                return $assignment->updates;
            }
        )->flatten()->pluck('id');
        
        $updatesWithBooks = AssignmentUpdate::whereIn('id', $assignmentsUpdates)
            ->orderBy('updated_at', 'desc')
            ->with('assignment.book')->get();

        return response(['updates' => $updatesWithBooks], 200);
    }
}
