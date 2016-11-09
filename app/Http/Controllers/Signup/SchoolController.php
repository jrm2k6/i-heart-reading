<?php namespace App\Http\Controllers\Signup;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\School;

class SchoolController extends Controller
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
            'address' => 'required|string',
            'domain_name' => 'required|string|unique:schools,domain_name'
        ]);

        $school = School::create([
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'domain_name' => $request->input('domain_name')
        ]);

        return response(['school' => $school], 201)->header('Location', '/api/school/'.$school->id);
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
            'name' => 'required|string',
            'address' => 'required|string',
            'domain_name' => 'required|string|unique:schools,domain_name'
        ]);

        $school = School::find($id);

        if (! $school)
            return response(null, 400);

        $school->update($request->only('name', 'address', 'domain_name'));

        return response(['school' => $school, 200]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $school = School::find($id);

        if (! $school)
            return response(null, 404);

        $school->delete();
        return response(null, 200);
    }
}