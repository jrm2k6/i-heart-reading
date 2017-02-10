<?php namespace App\Http\Helpers;

use App\Models\User;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Auth;

class AuthHelper
{
    public function register($data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $hasToken = array_key_exists('type_token', $data);
        if ($hasToken) {
            $isStaff = $hasToken && $data['type_token'] == 'admin';
        } else {
            $isStaff = false;
        }

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