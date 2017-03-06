<?php namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Teacher;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminTeacherController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
            'school_id' => 'required|exists:schools,id',
        ]);

        $teacher = Teacher::create([
            'user_id' => $request->input('user_id'),
            'school_id' => $request->input('school_id'),
        ]);

        $user = $teacher->user;
        $user->role = 'teacher';
        $user->save();

        return response(['teacher' => $teacher], 201)->header('Location', '/api/admin/teacher/'.$teacher->id);
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
            'teacher_id' => 'required|exists:teachers,id',
            'user_id' => 'required|exists:users,id',
            'school_id' => 'required|exists:schools,id'
        ]);

        $teacher = Teacher::find($id);

        if (! $teacher)
            return response(null, 400);

        $teacher->update($request->only('user_id', 'school_id'));

        return response(['teacher' => $teacher, 200]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teacher = Teacher::find($id);

        if (! $teacher)
            return response(null, 404);

        $teacher->delete();
        return response(null, 200);
    }
}
