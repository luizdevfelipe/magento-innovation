require(['jquery'], function ($) {
    'use strict';

    function updateActiveStep() {
        var hash = window.location.hash;

        var $steps = $('.checkout-steps li');
        $steps.removeClass('active');

        if (hash.indexOf('shipping') !== -1) {
            $('.checkout-steps .step-shipping').addClass('active');
        } else if (hash.indexOf('payment') !== -1) {
            $('.checkout-steps .step-payment').addClass('active');
        } else {
            $('.checkout-steps .step-cart').addClass('active');
        }
    }

    // Quando o DOM estiver pronto
    $(document).ready(function () {
        updateActiveStep();
    });

    // Quando mudar de etapa no checkout
    $(window).on('hashchange', function () {
        updateActiveStep();
    });
});
