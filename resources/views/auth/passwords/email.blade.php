@extends('layouts.app')

<!-- Main Content -->
@section('content')
<div class="reset-password-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    <form class="reset-password-form" role="form" method="POST" action="{{ url('/password/email') }}">
        {!! csrf_field() !!}
        @if ($errors->count() > 0)
            <div class="alert error">
                {{$errors->first('email')}}
            </div>
        @endif

        <label class="">Enter your email address</label>
        <input type="email" class="static-form-input"
           name="email" value="{{ old('email') }}"
           placeholder="mark.twain@email.com"
        >
        <button type="submit" class="cta-button">
            Send Password Reset Link
        </button>
    </form>
</div>

@endsection
