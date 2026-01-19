require([
    'jquery',
    'matchMedia',
], function ($, mediaCheck) {

    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            var $openingHours = $('.footer-checkout ul li').find('span');

            $openingHours.html(function (index, currentText) {
                return currentText.replace('|', '<br>');
            });

        },
        exit: function () {
            var $openingHours = $('.footer-checkout ul li').find('span');

            $openingHours.html(function (index, currentText) {
                return currentText.replace('<br>', '|');
            });

        }
    });
});
