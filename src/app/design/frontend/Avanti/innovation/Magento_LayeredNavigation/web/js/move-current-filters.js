define([
    'jquery',
], function ($,) {
    $(function () {
        var $container = $('#narrow-by-list');
        $container.prepend(
            $('.filter-current'),
            $('.block-actions.filter-actions')
        );
    });
});