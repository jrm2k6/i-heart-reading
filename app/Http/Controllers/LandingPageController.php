<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\ProspectEmail;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function saveEmail(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email'
        ]);

        $email = $request->input('email');
        $prospectEmail = ProspectEmail::where('email', $email)->first();

        if ($prospectEmail) {
            return response()->json(null, 200);
        }

        ProspectEmail::create([
            'email' => $email
        ]);

        return response()->json(null, 200);
    }
}
