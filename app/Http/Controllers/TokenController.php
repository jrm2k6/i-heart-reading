<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Events\UserRegistered;
use App\Http\Requests;
use App\Models\User;
use App\Models\School;
use App\Models\SchoolAdmin;
use App\Models\PrimaryContact;
use App\Models\SignupOrganizationToken;

class TokenController extends Controller
{
    public function verifyOrganizationTokenAndRedirect(Request $request, $token)
    {
        $signupToken = SignupOrganizationToken::where('token', $token)->first();

        if ($signupToken != null) {
            $request->session()->put('organization_token', $signupToken->token);
            return redirect()->action('SignupController@index');
        }

        return response()->view('errors.404', [], 404);
    }

    public function confirmOrganizationToken(Request $request)
    {
        $email = $request->input('email');
        $name = $request->input('name');
        return view('auth.confirm-token', ['email' => $email, 'name' => $name]);
    }

    public function verifyOrganizationToken(Request $request)
    {
        $this->validate($request, [
            'organization_token' => 'required|string',
            'name' => 'required|string',
            'password' => 'required|string',
            'email' => 'required|email|exists:primary_contacts,email_address'
        ]);


        $organizationToken = $request->input('organization_token');
        $email = $request->input('email');
        $name = $request->input('name');
        $password = $request->input('password');

        $organizationToken = SignupOrganizationToken::where('token', $organizationToken)->first();
        
        if ($organizationToken && $email) {
        
            $schoolOrganizationToken = School::where('organization_token_id', $organizationToken->id)->first();
            $primaryContact = PrimaryContact::where('email_address', $email)->first();
            
            if ($primaryContact->school_id === $schoolOrganizationToken->id) {
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => bcrypt($password),
                    'role' => 'admin',
                    'school_id' => $schoolOrganizationToken->id
                ]);

                SchoolAdmin::create([
                    'user_id' => $user->id,
                    'school_id' => $schoolOrganizationToken->id
                ]);

                event(new UserRegistered($user));

                return redirect('/login');
            }
        }

        return redirect('/confirm-token')->with('error', 'Invalid organization token!');
    }
}
