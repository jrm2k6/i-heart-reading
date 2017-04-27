<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class SearchStudentsController extends Controller
{
    public function search(Request $request)
    {
        $this->validate($request, [
            'query' => 'required|string'
        ]);

        $query = $request->input('query');
        $users = User::search($query)->get();

        return response()->json(['suggestions' => $users]);
    }
}
