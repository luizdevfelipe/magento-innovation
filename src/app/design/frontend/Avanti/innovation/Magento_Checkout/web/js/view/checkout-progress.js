define([
    'uiComponent',
    'Magento_Checkout/js/model/step-navigator'
], function (Component, stepNavigator) {
    'use strict';

    return Component.extend({
        initialize: function () {
            this._super();
            return this;
        },

        /**
         * Verifica qual step deve estar ativo.
         * - /checkout/cart → "Carrinho"
         * - /checkout (shipping/payment) → usa stepNavigator
         */
        isStepActive: function (stepCode) {
            const path = window.location.pathname;

            // Se estiver no carrinho (/checkout/cart)
            if (path.includes('/checkout/cart')) {
                return stepCode === 'cart';
            }

            // Se estiver em outra página de checkout (/checkout/...)
            if (path.startsWith('/checkout') && !path.includes('/checkout/cart')) {
                const activeStep = stepNavigator.getActiveItemIndex();
                const stepCodes = ['shipping', 'payment'];

                if (!stepCodes.includes(stepCode)) return false;
                return stepCodes.indexOf(stepCode) === activeStep;
            }

            // Fora do fluxo do checkout
            return false;
        }
    });
});
