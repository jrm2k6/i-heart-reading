<?php namespace App\Http\Controllers\Signup;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\SchoolGroup;
use App\Models\StudentsGroup;
use App\Models\User;

class SchoolGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getStudents(Request $request, $id)
    {
        $group = SchoolGroup::find($id);

        if (!$group) {
            return response(null, 400);
        }

        $studentGroups = $group->studentGroups;
        $studentIds = $studentGroups->pluck('user_id');
        $students = User::whereIn('id', $studentIds)->get();

        return response(['id' => (int) $id, 'students' => $students], 200);
    }

    public function getStudentsExcept(Request $request)
    {
        $loggedInUser = Auth::user();
        $schoolId = $loggedInUser->school_id;
        $blacklist = $request->input('blacklist');
        
        $ids = [];
        if ($blacklist != null) {
            $ids = explode(',', $blacklist); 
        }
        
        $groups = SchoolGroup::where('school_id', $schoolId)->whereNotIn('id', $ids)->get();
        
        $groupsWithStudents = $groups->map(function($group) {
            $studentGroups = $group->studentGroups;
            $students = [];
            
            if ($studentGroups !== null) {
                $studentIds = $studentGroups->pluck('user_id');
                $students = User::whereIn('id', $studentIds)->get()->toArray();
            }
            
            return [
                'id' => $group->id,
                'students' => $students
            ];
        });

        $studentsIds = $groupsWithStudents->map(function($groupWithStudents) {
            $students = collect($groupWithStudents['students']);
            return $students->map(function($student) {
                return $student['id'];
            });
        })->flatten();

        $userNotInAnyGroups = User::where(['school_id' => $schoolId, 'role' => 'student'])
            ->whereNotIn('id', $studentsIds)->get();
        
        $groupsWithStudents->push(['id' => 0, 'students' => $userNotInAnyGroups]);
        
        return response($groupsWithStudents, 200);
    }

    /**
    * Gets a group id and a list of user ids as part of the request payload.
    * Updates the group_id attached to those user_ids
    */
    public function updateStudentsGroup(Request $request, $id)
    {
        $this->validate($request, [
            'group_id' => 'required|exists:school_groups,id',
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:users,id' 
        ]);

        $studentsIds = $request->input('student_ids');
        collect($studentsIds)->each(function($studentId) use ($id) {
            $studentsGroup = StudentsGroup::where('user_id', $studentId)->first();
            if ($studentsGroup != null) {
                $studentsGroup->update(['group_id' => $id]);
            } else {
                StudentsGroup::create(['user_id' => $studentId, 'group_id' => $id]);
            }
        });

        $students = StudentsGroup::whereIn('user_id', $studentsIds)->get();
        $group = SchoolGroup::find($id);
        return response(['students' => $students, 'group' => $group], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'grade' => 'required|string',
            'nickname' => 'string',
            'teacher_id' => 'integer|exists:teachers,id',
            'school_id' => 'required|exists:schools,id'
        ]);
        
        $group = SchoolGroup::create([
            'name' => $request->input('name'),
            'grade' => $request->input('grade'),
            'nickname' => $request->input('nickname'),
            'school_id' => $request->input('school_id'),
            'teacher_id' => $request->input('teacher_id')
        ]);

        $groupWithTeacher = $group->load('teacher');

        return response(['group' => $groupWithTeacher], 201)->header('Location', '/api/school/group/'.$group->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'string',
            'grade' => 'string',
            'nickname' => 'string',
            'school_id' => 'exists:schools,id',
            'teacher_id' => 'exists:teachers,id',
        ]);

        $group = SchoolGroup::find($id);
        
        if (! $group)
            return response(null, 400);

        $nonNullParams = collect($request->only('name', 'grade', 'nickname', 'school_id', 'teacher_id'))->filter(function($param) {
           return $param != null;
        })->toArray();

        $group->update($nonNullParams);

        return response(['group' => $group], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = SchoolGroup::find($id);

        if (! $group)
            return response(null, 404);

        $group->delete();
        return response(null, 200);
    }
}
