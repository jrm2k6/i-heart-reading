@extends('layouts.app')

@section('content')
<div class="login-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    <form class="login-form" role="form" method="POST" action="{{ url('/login') }}">
        {!! csrf_field() !!}

        <div>
            <div class="input-with-picture">
                <input type="email" class="form-input"
                       name="email" value="{{ old('email') }}"
                       placeholder="mark.twain@email.com"
                >
                <div class="form-input-icon"><img src="/images/icons/email.png" /></div>
                @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div>
            <div class="input-with-picture">
                <input type="password" class="form-input" name="password" placeholder="Your password">
                <div class="form-input-icon"><img src="/images/icons/lock.png" /></div>
                @if ($errors->has('password'))
                    <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="remember-me-container">
            <div class="checkbox">
                <input class="ihr-checkbox" type="checkbox" name="remember" id="remember">
                <label for="remember"><span></span>Remember Me</label>
            </div>
        </div>
        <button type="submit" class="btn-login-submit">
            Login
        </button>
        <a class="" href="{{ url('/password/reset') }}">Forgot Your Password?</a>
    </form>
</div>
@endsection
