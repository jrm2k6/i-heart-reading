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
          <input class='signup-form-input' />
        </div>
        <button type="submit" class="btn-login-submit">
            Verify Token
        </button>
    </form>
</div>
@endsection
