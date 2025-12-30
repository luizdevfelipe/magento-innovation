define([
    'jquery',
], function ($,) {
    $(function () {
        $('.page-title .base').html(function (_, html) {
            return html.replace(/'(.+?)'/, '<span class="search-term">\"$1\"</span>');
        });
    });
});