@extends('layouts.app')

@section('content')
    <div class="login-page-container">
        <div class="logo-container">
            <img src="/images/logos/i-heart-reading-logo.png" />
        </div>

        <form class="login-form" role="form" method="POST" action="{{ url('/resend-confirmation-email') }}">
            {!! csrf_field() !!}
            @if ($errors->count() > 0)
                <div class="alert error">
                    {{$errors->first('email')}}
                </div>
            @endif
            <div>
                @if ($showHint)
                    <div class="show-hint-confirmation">
                        <p>It looks like your email is not confirmed! Bummer.</p>
                        <p>Make sure to check your inbox (including your Spam folder), to confirm your email address</p></p>
                    </div>

                @endif
                <div class="input-with-picture">
                    <input type="email" class="form-input"
                           name="email" value="{{ old('email') }}"
                           placeholder="mark.twain@email.com"
                    >
                    <div class="form-input-icon"><img src="/images/icons/email.png" /></div>
                </div>
            </div>

            <button type="submit" class="btn-login-submit">
                Resend Confirmation Email
            </button>
        </form>
    </div>
@endsection
