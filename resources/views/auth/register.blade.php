@extends('layouts.app')

@section('content')
<div class="register-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    <form role="form" class="register-form" method="POST" action="{{ url('/register') }}">
        {!! csrf_field() !!}

        <div>
            <div class="input-with-picture" tabindex="0">
                <input type="text" class="form-input"
                       name="name" value="{{ old('name') }}"
                       placeholder="Mark Twain"
                >
                <div class="form-input-icon"><img src="/images/icons/people.png" /></div>
            </div>
            @if ($errors->has('name'))
                <span class="help-block">
                    <strong>{{ $errors->first('name') }}</strong>
                </span>
            @endif
        </div>

        <div>
            <div class="input-with-picture" tabindex="1">
                <input type="email" class="form-input"
                       name="email" value="{{ old('email') }}"
                       placeholder="mark.twain@email.com"
                >
                <div class="form-input-icon"><img src="/images/icons/email.png" /></div>
            </div>
            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif
        </div>

        <div>
            <div class="input-with-picture" tabindex="2">
                <input type="password" class="form-input" name="password" placeholder="Your password">
                <div class="form-input-icon"><img src="/images/icons/lock.png" /></div>
            </div>
            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>

        <div>
            <div class="input-with-picture" tabindex="3">
                <input type="password" class="form-input" name="password_confirmation"
                       placeholder="Confirm your password"
                >
                <div class="form-input-icon"><img src="/images/icons/lock.png" /></div>
            </div>

            @if ($errors->has('password_confirmation'))
                <span class="help-block">
                    <strong>{{ $errors->first('password_confirmation') }}</strong>
                </span>
            @endif
        </div>

        <button type="submit" class="btn-register-submit">
            Register
        </button>
    </form>
</div>
@endsection
