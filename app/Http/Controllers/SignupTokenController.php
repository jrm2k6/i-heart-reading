<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\SignupToken;

class SignupTokenController extends Controller
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
        return response(null, 400);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $currentToken = SignupToken::find($id);

        if ($currentToken) {
            return response(['signup_token' => $currentToken], 200);
        }

        return response(null, 200);
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
            'id' => 'required|exists:signup_tokens,id',
            'token' => 'required|unique:signup_tokens,id,'.$id
        ]);

        $currentToken = SignupToken::find($id);
        $currentToken->update([
            'token' => $request->input('token')
        ]);

        return response(['signup_token' => $currentToken], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $signupToken = SignupToken::find($id);

        if ($signupToken) {
            $signupToken->delete();

            return response(null, 200);
        }

        return response(null, 404);
    }
}
