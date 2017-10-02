<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="google-site-verification" content="GvrKP1xMmkiIPx_-xPBQCesjRiJZxBU8-Mo5XPpZu68" />
    <meta name="description" content="Help your students reach their objectives by making reading fun. Intuitive and hassle free. Get Started Now!">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>I Heart Reading</title>
    <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://d2wy8f7a9ursnm.cloudfront.net/bugsnag-3.min.js" data-apikey="{{env('BUGSNAG_API_KEY')}}"></script>
    <!-- Styles -->
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css">

    @if(!env('APP_DEBUG'))
        <!-- Begin Inspectlet Embed Code -->
        <script type="text/javascript" id="inspectletjs">
            (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 1311018816]);
                function ldinsp(){ if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1311018816&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
                setTimeout(ldinsp, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
            })();
        </script>
        <!-- End Inspectlet Embed Code -->
    @endif
</head>
<body id="app-layout">
    @yield('content')
    @include('scripts._analytics')
    @include('scripts._mobile-detection')
    @yield('js')
</body>
</html>
