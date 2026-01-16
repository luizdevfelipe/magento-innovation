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

            if ($carousel.length && $carousel.children().length < 2) {
                return;
            }

            initSlick();
        },

        // desktop
        exit: function () {

            var $carousel = $('.products.list.items.product-items');

            if ($carousel.length && $carousel.children().length < 5) {
                return;
            }

            initSlick();
        }
    });

    function initSlick() {

        var $carousel = $('.products.list.items.product-items');

        if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
            $carousel.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1180,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: false,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: false,
                            dots: true
                        }
                    }
                ]
            });
        }
    }

});


