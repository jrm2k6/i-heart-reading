<script>
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (isMobile.any()) {
        var textBanner = 'This website is not optimized for mobile devices. While we are working on adapting our layouts for mobile devices, we recommend using I Heart Reading on a computer.';
        var $banner = $('<div class=\'mobile-banner\'>' + textBanner + '</div>');
        $(document.body).prepend($banner);

        window.setTimeout(function() {
            $('.mobile-banner').remove();
        }, 10000);
    }
</script>