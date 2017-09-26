<?php namespace App\Http\Controllers;

use App\Models\AssignmentUpdate;
use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class AssignmentUpdatesController extends Controller
{
    const KEY_TEACHER_UPDATES = 'updates_teacher';
    const CACHE_TIMEOUT = 30;

    public function getMyUpdates()
    {
        $assignmentsUpdates = Auth::user()->assignments->map(
            function($assignment) {
                return $assignment->updates;
            }
        )->flatten()->pluck('id');

        $updatesWithBooks = AssignmentUpdate::whereIn('id', $assignmentsUpdates)
            ->orderBy('created_at', 'desc')
            ->with('assignment.book')->get();

        return response(['updates' => $updatesWithBooks], 200);
    }

    public function getMyStudentUpdates()
    {
        $teacher = Auth::user()->teacher;
        $teacherId = $teacher->id;
        $groups = $teacher->groups;
        $cacheKey = self::KEY_TEACHER_UPDATES . '_' . $teacherId;
        $updatesWithBooks = null;

        if (Cache::has($cacheKey) != null) {
            $updatesWithBooks = Cache::get($cacheKey);
        } else {
            $assignmentsUpdates = $groups->filter(function($group) { return $group->is_archived == false; })
                ->map(function($group) { return $group->studentGroups; })
                ->flatten()
                ->map(function($studentGroup) { return $studentGroup->student; })
                ->map(function($user) {return $user->assignments;})
                ->flatten()->map(function($assignment) { return $assignment->updates; })
                ->flatten()
                ->pluck('id');

            $updatesWithBooks = AssignmentUpdate::whereIn('id', $assignmentsUpdates)
                ->orderBy('created_at', 'desc')
                ->with(['assignment.book', 'assignment.user'])->get();

            Cache::put($cacheKey, $updatesWithBooks, self::CACHE_TIMEOUT);
        }


        return response(['updates' => $updatesWithBooks], 200);
    }

    public function getUpdatesForStudent($studentId)
    {
        $assignmentsUpdateIds = User::find($studentId)->assignments->pluck('id');

        $updatesWithBooks = AssignmentUpdate::whereIn('assignment_id', $assignmentsUpdateIds)
            ->orderBy('created_at', 'desc')
            ->with(['assignment.book', 'assignment.response'])
            ->get();
        
        return response(['user_id' => $studentId, 'updates' => $updatesWithBooks], 200);
    }
}
