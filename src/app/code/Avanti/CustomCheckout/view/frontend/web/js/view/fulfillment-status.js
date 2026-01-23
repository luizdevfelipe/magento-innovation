define(['uiComponent'], function (Component) {
    'use strict';

    // Extende o componente UI com as configurações padrão
    return Component.extend({
        defaults: {
            // Define o template que será utilizado
            template: 'Avanti_CustomCheckout/fulfillment-status'
        },

        // Função que retorna o HTML do status de cumprimento disponível na configuração do checkout
        getHtml: function () {
            // Verifica se a configuração do checkout e o HTML do status de cumprimento estão disponíveis
            return (window.checkoutConfig &&
                window.checkoutConfig.avanti_customcheckout &&
                window.checkoutConfig.avanti_customcheckout.fulfillment_status_html)
                ?
                // Retorna o HTML se disponível
                window.checkoutConfig.avanti_customcheckout.fulfillment_status_html
                : 
                // Retorna uma string vazia se não estiver disponível
                '';
        }
    });
});