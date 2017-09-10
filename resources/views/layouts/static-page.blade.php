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
    <script type="text/javascript"> (function(){ var surge = document.createElement('script'); surge.type = 'text/javascript'; surge.async = true; surge.src = 'http://www.usersurge.com/145593930/usersurge.js'; (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(surge); })(); </script>
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
