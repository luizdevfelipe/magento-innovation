require([
    'jquery',
    'slick',
    'matchMedia'
], function ($) {


    mediaCheck({
        media: '(max-width: 767px)',

        // mobile
        entry: function () {
            var $carousel = $('.products.list.items.product-items');

            resetCarousel($carousel);

            if ($carousel.length && $carousel.children().length > 2) {
                initSlick(2, 1);
            }

        },

        // desktop
        exit: function () {
            var $carousel = $('.products.list.items.product-items');

            resetCarousel($carousel);

            if ($carousel.length && $carousel.children().length >= 5) {

                if (window.innerWidth <= 1180) {
                    initSlick(4, 1);

                    checkResponsiveBreakpoint($carousel, 4);

                } else {
                    initSlick(5, 1);

                    checkResponsiveBreakpoint($carousel, 5);

                }

            }

        }
    });

    function initSlick(slides, scroll) {

        var $carousel = $('.products.list.items.product-items');

        if (!$carousel.hasClass('slick-initialized') && !$carousel.data('original-items')) {
            $carousel.data('original-items', $carousel.html());
        }

        if (!$carousel.data('slides-per-page')) {
            $carousel.data('slides-per-page', slides);
        }

        if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
            $carousel.slick({
                slidesToShow: slides || 5,
                slidesToScroll: scroll || 1,
                dots: true,
                arrows: true,
                infinite: false,
            });
        }
    }

    function resetCarousel($carousel) {
        if ($carousel.hasClass('slick-initialized') && $carousel.data('original-items')) {
            $carousel.slick('unslick');
            $carousel.html($carousel.data('original-items'));
        }
    }

    function checkResponsiveBreakpoint($carousel, currentSlides) {
        // Garante responsividade ao redimensionar a janela
        // Não usa a responsividade nativa do Slick por comportamento inesperado ao voltar para o desktop
        $(window).on('resize', function () {
            if (window.innerWidth <= 1180 &&
                $carousel.hasClass('slick-initialized') &&
                $carousel.data('slides-per-page') > 4) {
                resetCarousel($carousel);
                initSlick(4, 1);
                $carousel.data('slides-per-page', 4);

            } else if (window.innerWidth > 1180 &&
                $carousel.hasClass('slick-initialized') &&
                $carousel.data('slides-per-page') <= 4) {
                resetCarousel($carousel);
                initSlick(5, 1);
                $carousel.data('slides-per-page', 5);
            }
        });
    }

});
