define(['jquery'], function ($) {
    'use strict';

    $(document).ready(function () {
        $(document).on('click', '.page.messages', function (e) {
            if ($(e.target).hasClass('messages') || $(e.target).hasClass('close-modal')) {
                $(this).hide();
            }
        });
    });
});
