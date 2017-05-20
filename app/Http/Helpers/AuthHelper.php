<?php namespace App\Http\Helpers;

use App\Models\User;
use App\Events\UserRegistered;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class AuthHelper
{
    public function register($data)
    {
        $user = new User;

        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = bcrypt($data['password']);

        $hasToken = array_key_exists('type_token', $data);

        if ($hasToken) {
            $isStaff = $data['type_token'] == 'admin';
        } else {
            $isStaff = false;
        }

        if (!$isStaff) {
            $dateOfBirth = $data['date_of_birth'];
            $guardianEmail = !empty($data['guardian_email']) ? $data['guardian_email'] : null;

            $user->birth_date = Carbon::parse($dateOfBirth);
            $user->guardian_email = $guardianEmail;
        }

        $user->save();

        event(new UserRegistered($user, $isStaff, $data));

        return $user;
    }

    public function authenticate(User $user, $action)
    {
        Auth::login($user);
        return redirect()->action($action);
    }

    public function registerAndAuthenticate($data, $action)
    {
        $user = $this->register($data);
        return $this->authenticate($user, $action);
    }
}