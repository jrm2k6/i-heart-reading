<?php namespace App\Http\Controllers\Emails;

use App\Events\ConfirmationEmailResent;
use App\Events\StudentAssignmentEnded;
use App\Events\StudentAssignmentUpdated;
use App\Events\UserConfirmed;
use App\Models\AssignmentProgress;
use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EmailTransactionController extends Controller
{
    public function confirmEmail(Request $request)
    {
        $email = $request->input('email');
        $validator = Validator::make($request->input(), [
            'email' => 'required|exists:users,email',
            'token' => 'required|size:30|exists:email_confirmations,token,email,'.$email
        ]);

        if ($validator->passes()) {
            event(new UserConfirmed($email));
            return redirect('app');
        } else {
            return view('errors.confirmation_emails_error');
        }
    }

    public function resendConfirmationEmail(Request $request) {
        $this->validate($request, [
            'email' => 'required|exists:users,email'
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if ($user) {
            event(new ConfirmationEmailResent($user));
        }

        return redirect('app');
    }
}
