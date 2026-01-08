require([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            // Armazenar o texto original para restaurar depois
            if (!$('#toolbar-amount').data('original-text')) { 
                $('#toolbar-amount').data('original-text', $('#toolbar-amount').text());
            }          
            // Substituir o texto de paginação pelo total de itens encontrados
            var totalItemsText = $('span[data-total-items]').data('total-items');
            $('#toolbar-amount').text(totalItemsText);
        },
        exit: function () {
            // Restaurar o texto original ao sair da mídia query
            var originalText = $('#toolbar-amount').data('original-text');
            if (originalText) {
                $('#toolbar-amount').text(originalText);
            }
        }
    });
});
