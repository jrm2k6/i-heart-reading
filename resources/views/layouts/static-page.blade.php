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

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    @yield('css')
</head>
<body>
<section>
    <div class="landing-header-container">
        @include('partials._top-menu')
    </div>
</section>
@yield('content')
@include('partials._footer')
<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="bde5a21f-4999-4c3d-a707-e43570975713";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
<script>
    @yield('js')
</script>
</body>
</html>
