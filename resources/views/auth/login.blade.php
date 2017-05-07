@extends('layouts.app')

@section('content')
<div class="login-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    @if(env('DEMO_MODE'))
        <div class="demo-explanation">
            <div class="demo-explanation-content">This is a demo version of iheartreading.co. All updates will be re-initialized daily</div>
            <div class="demo-explanation-credentials">Student Credentials: student1@unicorn.com / studentpassword</div>
            <div class="demo-explanation-credentials">Teacher Credentials: teacher1@unicorn.com / teacherpassword</div>
            <div class="demo-explanation-credentials">Admin Credentials: admin1@unicorn.com / adminpassword</div>
        </div>
    @endif
    <form class="login-form" role="form" method="POST" action="{{ url('/login') }}">
        {!! csrf_field() !!}
        @if ($errors->count() > 0)
            <div class="alert error">
                {{$errors->first('email')}}
            </div>
        @endif
        <div>
            <div class="input-with-picture">
                <input type="email" class="form-input"
                       name="email" value="{{ old('email') }}"
                       placeholder="mark.twain@email.com"
                >
                <div class="form-input-icon"><img src="/images/icons/email.png" /></div>
            </div>
        </div>

        <div>
            <div class="input-with-picture">
                <input type="password" class="form-input" name="password" placeholder="Your password">
                <div class="form-input-icon"><img src="/images/icons/lock.png" /></div>
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
