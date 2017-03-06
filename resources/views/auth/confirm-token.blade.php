@extends('layouts.app')

@section('content')
<div class="confirm-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    <form class="confirm-token-form" role="form" method="POST" action="{{ url('/verify-token') }}">
        {!! csrf_field() !!}
        @if ($errors->count() > 0)
            <div class="alert error">
                {{$errors->first('token')}}
            </div>
        @endif
        <div class='signup-form-input-wrapper'>
          <span class='signup-form-label'>Enter your organization token</span>
          <input class='signup-form-input' name='organization_token' />
        </div>
        <div class='signup-form-input-wrapper'>
          <span class='signup-form-label'>Re-enter your password</span>
          <input class='signup-form-input' type='password' name='password' />
        </div>
        <input type='hidden' name='email' value='{{$email}}' />
          <input type='hidden' name='name' value='{{$name}}' />
        <button type="submit" class="btn-login-submit">
            Verify Token
        </button>
    </form>
</div>
@endsection
