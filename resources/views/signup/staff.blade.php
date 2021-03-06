@extends('layouts.app')

@section('content')
<div class="register-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    <form role="form" class="register-form" method="POST" action="{{ url('/register-token') }}">
        {!! csrf_field() !!}
        <input type="hidden" name="token" value={{$token}}>
        <input type="hidden" name="school_id" value={{$school_id}}>
        <input type="hidden" name="type_token" value='admin'>
        
        @if ($errors->count() > 0)
            @if ($errors->has('name'))
                <div class="alert error">
                    {{ $errors->first('name') }}
                </div>
            @endif
            @if ($errors->has('email'))
                <div class="alert error">
                    {{ $errors->first('email') }}
                </div>
            @endif
            @if ($errors->has('password'))
                <div class="alert error">
                    {{ $errors->first('password') }}
                </div>
            @endif
            @if ($errors->has('password_confirmation'))
                <div class="alert error">
                    {{ $errors->first('password_confirmation') }}
                </div>
            @endif
        @endif
        <div>
            <div class="input-with-picture" tabindex="0">
                <input type="text" class="form-input"
                       name="name" value="{{ old('name') }}"
                       placeholder="Mark Twain"
                >
                <div class="form-input-icon"><img src="/images/icons/people.png" /></div>
            </div>
        </div>

        <div>
            <div class="input-with-domain-email" tabindex="1">
                <input type="text" class="form-input"
                       name="email_id" value="{{ old('email-id') }}"
                       placeholder="mark.twain"
                >
                <span class="email-domain">{{$domain_name}}</span>
            </div>
        </div>

        <div>
            <div class="input-with-picture" tabindex="2">
                <input type="password" class="form-input" name="password" placeholder="Your password">
                <div class="form-input-icon"><img src="/images/icons/lock.png" /></div>
            </div>
        </div>

        <div>
            <div class="input-with-picture" tabindex="3">
                <input type="password" class="form-input" name="password_confirmation"
                       placeholder="Confirm your password"
                >
                <div class="form-input-icon"><img src="/images/icons/lock.png" /></div>
            </div>
        </div>

        @if ($errors->has('accept_terms'))
            <div class="accept-terms not-checked">
        @else
            <div class="accept-terms">
        @endif
            <div class="checkbox">
                <input class="ihr-checkbox" type="checkbox" name="accept_terms" id="accept_terms">
                <label class="accept-terms-label" for="accept_terms"><span></span> I have read and agree to <a href="/terms">the terms of service</a></label>
            </div>
        </div>

        <button type="submit" class="btn-register-submit">
            Register
        </button>
    </form>
</div>
@endsection
