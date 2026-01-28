define([
    'jquery',
    'mage/translate',
    'mage/validation'
], function ($) {
    'use strict';

    function onlyDigits(value) {
        return (value || '').replace(/\D/g, '');
    }

    /**
     * Regra BR:
     * - 8 dígitos
     * - aceita com ou sem hífen
     */
    $.validator.addMethod(
        'validate-postcodeBR',
        function (value, element) {
            var digits = onlyDigits(value);

            // se não for obrigatório, deixa o required cuidar disso
            if (this.optional(element)) {
                return true;
            }

            return digits.length === 8;
        },
        $.mage.__('Informe um CEP válido no formato 12345-678.')
    );

    return function () {};
});
