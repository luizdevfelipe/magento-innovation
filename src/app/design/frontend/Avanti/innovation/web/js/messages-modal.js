define(['jquery'], function ($) {
    'use strict';

    $(document).ready(function () {
        $(document).on('click', '.page.messages', function (e) {
            console.log(e.target);
            if ($(e.target).hasClass('messages') || $(e.target).hasClass('close')) {
                $(this).hide();
            }
        });
    });
});
