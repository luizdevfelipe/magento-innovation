require([
    'jquery',
    'matchMedia',
    'slick'
], function ($, mediaCheck) {

    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {

            var $carousel = $('.main-brands-carousel');

            if ($carousel.length && $carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        },
        exit: function () {

            var $carousel = $('.main-brands-carousel');

            if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 1180,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true
                            }
                        },
                    ]
                });
            }
        }
    });
});
