<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class SearchStudentsController extends Controller
{
    const EXPIRE_CACHE = 15;

    public function search(Request $request)
    {
        $this->validate($request, [
            'query' => 'required|string'
        ]);

        $currentSchoolId = Auth::user()->school_id;
        $query = $request->input('query');

        $queryCached = Cache::tags(['students_search', 'school_' . $currentSchoolId])->get($query);

        if ($queryCached !== null) {
            return response()->json(['suggestions' => $queryCached]);
        }

        $users = User::search($query)->get();

        $users = collect($users)->filter(function($user) use ($currentSchoolId) {
            return $user->school_id == $currentSchoolId &&
                $user->role == 'student';
        });

        Cache::tags(['students_search', 'school_' . $currentSchoolId])->put($query, $users, self::EXPIRE_CACHE);
        return response()->json(['suggestions' => $users]);
    }
}
