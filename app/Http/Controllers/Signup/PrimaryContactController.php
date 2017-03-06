<?php

namespace App\Http\Controllers\Signup;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\PrimaryContact;
use App\Models\User;

class PrimaryContactController extends Controller
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
            'email_address' => 'required|string|email',
            'role' => 'required|string',
            'school_id' => 'required|exists:schools,id'
        ]);

        $primaryContact = PrimaryContact::create([
            'name' => $request->input('name'),
            'email_address' => $request->input('email_address'),
            'role' => $request->input('role'),
            'school_id' => $request->input('school_id')
        ]);

        return response(['primary_contact' => $primaryContact], 201)->header('Location', '/api/school/contact/'.$primaryContact->id);
    }

    public function verifyExists(Request $request)
    {
        $emailAddress = $request->input('email_address');
        if ($emailAddress) {
            $exists = User::where('email', $emailAddress)->count() == 1;
            return response(['exists' => $exists]);
        }

            return response([], 400);
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
            'email_address' => 'string|email',
            'role' => 'string',
            'school_id' => 'exists:schools,id'
        ]);

        $primaryContact = PrimaryContact::find($id);

        if (! $primaryContact)
            return response(null, 400);

        $primaryContact->update($request->only('name', 'email_address', 'role', 'school_id'));

        return response(['primary_contact' => $primaryContact], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $primaryContact = PrimaryContact::find($id);

        if (! $primaryContact)
            return response(null, 404);

        $primaryContact->delete();
        return response(null, 200);
    }
}
