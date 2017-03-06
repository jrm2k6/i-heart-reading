<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\SignupOrganizationToken;
use Closure;

class HasOrganizationSignupToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->session()->has('organization_token')) {
            $token = $request->session()->get('organization_token');
            $signupToken = SignupOrganizationToken::where('token', $token)->first();
            if ($signupToken != null) {
                return $next($request);
            }
        } else {
            throw new HttpException(401, 'Not authorized to access endpoint');
        }
    }
}
