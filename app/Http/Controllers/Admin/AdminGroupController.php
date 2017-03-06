<?php namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\StudentsGroup;
use App\Http\Controllers\Controller;

class AdminGroupController extends Controller
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
            'group_id' => 'required|exists:school_groups,id',
        ]);

        $studentGroup = StudentsGroup::create([
            'user_id' => $request->input('user_id'),
            'group_id' => $request->input('group_id'),
        ]);

        return response(['student_group' => $studentGroup], 201)->header('Location', '/api/groups/'.$studentGroup->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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
            'group_id' => 'required|exists:school_groups,id',
            'user_id' => 'required|exists:users,id',
            'group_student_id' => 'required|exists:students_groups,id'
        ]);

        $studentGroup = StudentsGroup::find($id);

        if (! $studentGroup)
            return response(null, 400);

        $studentGroup->update($request->only('user_id', 'group_id'));

        return response(['student_group' => $studentGroup, 200]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $studentGroup = StudentsGroup::find($id);

        if (! $studentGroup)
            return response(null, 404);

        $studentGroup->delete();
        return response(null, 200);
    }
}
