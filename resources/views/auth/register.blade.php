@extends('layouts.app')

@section('content')
<div class="register-page-container">
    <div class="logo-container">
        <img src="/images/logos/i-heart-reading-logo.png" />
    </div>

    <form role="form" class="register-form" method="POST" action="{{ url('/register') }}">
        {!! csrf_field() !!}
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
            <div class="input-with-picture" tabindex="1">
                <input type="email" class="form-input"
                       name="email" value="{{ old('email') }}"
                       placeholder="mark.twain@email.com"
                >
                <div class="form-input-icon"><img src="/images/icons/email.png" /></div>
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

        <button type="submit" class="btn-register-submit">
            Register
        </button>
    </form>
</div>
@endsection

@section('js')
    <script>
        $(document).ready(function() {
            var searchParams = window.location.search.substring(1);
            var params = searchParams.split('&');
            if (params.length > 0) {
                var firstKeyValueParams = params[0].split('=');
                if (firstKeyValueParams[0] == 'email') {
                    var email = firstKeyValueParams[1];
                    if (email) {
                        $("input[name='email']").first().val(email)
                    }
                }
            }
        });
    </script>
@endsection
