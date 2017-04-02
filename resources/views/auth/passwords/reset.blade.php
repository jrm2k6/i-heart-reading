@extends('layouts.app')

@section('content')

<div class="reset-password-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>
    <div class="reset-password-title">Reset Your Password</div>
    <form class="reset-password-form" role="form" method="POST" action="{{ url('/password/reset') }}">
        {!! csrf_field() !!}

        @if ($errors->count() > 0)
            <div class="alert error">
                @if ($errors->has('email'))
                    {{$errors->first('email')}}
                @endif
                @if ($errors->has('password'))
                    {{$errors->first('password')}}
                @endif
                @if ($errors->has('password_confirmation'))
                    {{$errors->first('password_confirmation')}}
                @endif

            </div>
        @endif
        <input type="hidden" name="token" value="{{ $token }}">
        <input type="email" class="static-form-input"
               name="email" value="{{ old('email') }}"
               placeholder="mark.twain@email.com"
        >
        <input type="password" class="static-form-input" name="password" placeholder="Your password">
        <input type="password" class="static-form-input" name="password_confirmation" placeholder="Confirm your password">

        <button type="submit" class="cta-button">
            Reset Password
        </button>
    </form>
</div>
@endsection
