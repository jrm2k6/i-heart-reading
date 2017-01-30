<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
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

    public function confirmOrganizationToken()
    {
        return view('auth.confirm-token');
    }

    public function verifyOrganizationToken()
    {

    }
}
