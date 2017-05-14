<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\School;
use App\Http\Controllers\Controller;
use App\Models\SignupToken;
use App\Models\SignupOrganizationToken;
use App\Http\Helpers\AuthHelper;

class SignupController extends Controller
{
    private $authHelper;

    public function __construct()
    {
        $this->authHelper = new AuthHelper;
    }

    public function index()
    {
        return view('signup');
    }

    public function registerWithToken(Request $request)
    {
        $school = School::find($request->input('school_id'));
        $email = $request->input('email_id') . '@' . $school->domain_name;
        $request->merge(['email' => $email]);
        
        $this->validate($request, [
            'name' => 'required|max:255',
            'type_token' => 'required|in:admin,student',
            'token' => 'required|string|exists:signup_tokens,token,type,'.$request->input('type_token'),
            'school_id' => 'required|exists:schools,id',
            'email_id' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|confirmed|min:6',
            'accept_terms' => 'required|in:on'
        ]);
        
        $data = array_merge($request->all(), ['email' => $email]);

        $route = 'IHeartReadingAdminController@index';
        if ($request->input('type_token') == 'student') {
            $route = 'HomeController@index';
        }

        return $this->authHelper->registerAndAuthenticate($data, $route);
    }

    public function signupStudents(Request $request, $token)
    {
        $signupToken = SignupToken::where(['token' => $token, 'type' => 'student'])->first();

        if ($signupToken != null) {
            $schoolDomainName = '@' . $signupToken->school->domain_name;
            $schoolId = $signupToken->school->id;
            $request->session()->put('student_signup_token', $signupToken->token);
            
            return view('signup.students')
                ->with('domain_name', $schoolDomainName)
                ->with('token', $token)
                ->with('school_id', $schoolId);
        }

        return response()->view('errors.404', [], 404);
    }

    public function signupStaffMember(Request $request, $token)
    {
        $signupToken = SignupToken::where(['token' => $token, 'type' => 'admin'])->first();

        if ($signupToken != null) {
            $schoolDomainName = $signupToken->school->domain_name;
            $schoolId = $signupToken->school->id;
            $request->session()->put('staff_signup_token', $signupToken->token);
            
            return view('signup.staff')
                ->with('domain_name', $schoolDomainName)
                ->with('token', $token)
                ->with('school_id', $schoolId);
        }

        return response()->view('errors.404', [], 404);
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
