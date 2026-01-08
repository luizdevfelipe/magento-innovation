define([
    'jquery',
], function ($,) {
    $(function () {
        // Substituir conteúdo das aspas simples por span com classe search-term
        $('.page-title .base').html(function (_, html) {
            return html.replace(/'(.+?)'/, '<span class="search-term">\"$1\"</span>');
        });
    });
});