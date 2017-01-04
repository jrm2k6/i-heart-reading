<?php namespace App\Http\Controllers\Signup;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\SchoolGroup;

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
            'school_id' => 'required|exists:schools,id'
        ]);
        
        $group = SchoolGroup::create([
            'name' => $request->input('name'),
            'grade' => $request->input('grade'),
            'nickname' => $request->input('nickname'),
            'school_id' => $request->input('school_id')
        ]);

        return response(['group' => $group], 201)->header('Location', '/api/school/group/'.$group->id);
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
