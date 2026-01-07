require([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            if (!$('#toolbar-amount').data('oringinal-text')) { 
                $('#toolbar-amount').data('oringinal-text', $('#toolbar-amount').text());
            }          
            var totalItemsText = $('span[data-total-items]').data('total-items');
            $('#toolbar-amount').text(totalItemsText);
        },
        exit: function () {
            var originalText = $('#toolbar-amount').data('oringinal-text');
            if (originalText) {
                $('#toolbar-amount').text(originalText);
            }
        }
    });
});
