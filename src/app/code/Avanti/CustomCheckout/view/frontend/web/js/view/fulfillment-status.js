define(['uiComponent'], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Avanti_CustomCheckout/fulfillment-status'
        },

        getHtml: function () {
            return (window.checkoutConfig &&
                window.checkoutConfig.avanti_customcheckout &&
                window.checkoutConfig.avanti_customcheckout.fulfillment_status_html)
                ?
                window.checkoutConfig.avanti_customcheckout.fulfillment_status_html
                : '';
        }
    });
}); 