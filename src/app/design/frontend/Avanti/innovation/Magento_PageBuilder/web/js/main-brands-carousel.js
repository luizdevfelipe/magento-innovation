require([
    'jquery',
    'matchMedia',
    'slick'
], function ($, mediaCheck) {

    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {

            $('.main-brands-carousel').slick('unslick');

        },
        exit: function () {

            $('.main-brands-carousel').slick({
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
    });
});
