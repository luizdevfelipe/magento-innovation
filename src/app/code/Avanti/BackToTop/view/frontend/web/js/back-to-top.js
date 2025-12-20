define([
    'jquery'
], function ($) {
    'use strict';

    $(function () {
        const btn = $('#back-to-top');

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 300) {
                btn.fadeIn();
            } else {
                btn.fadeOut();
            }
        });

        btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 600);
        });
    });
});
