<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\School;
use App\Http\Controllers\Controller;
use App\Models\SignupOrganizationToken;

class SignupController extends Controller
{
    public function index()
    {
        return view('signup');
    }

    public function finish(Request $request)
    {
        $this->validate($request, [
            'school_id' => 'required|integer|exists:schools,id'
        ]);

        $organizationTokenSession = $request->session()->get('organization_token');
        
        if ($organizationTokenSession) {
            $school = School::find($request->input('school_id'));
            $organizationToken = SignupOrganizationToken::where('token', $organizationTokenSession)->first();
            if ($organizationToken && $school->organization_token_id == $organizationToken->id) {
                $organizationToken->signup_completed = true;
                $organizationToken->save();

                return response()->json(['message' => 'Signup completed'], 200);
            }
        }

        return response()->json(['error' => 'not authorized'], 401);
    }
}
