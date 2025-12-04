define([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {

    mediaCheck({
        media: '(max-width: 767px)',

        entry: function () {
            var container = $('.right-text');
            var span = container.find('span');

            // garante que o container existe
            if (!container.length) return;

            // pega a classe do container
            var classAttr = container.attr('class') || "";

            // encontra classe do tipo mobile-length-XXX
            var lengthClass = classAttr.split(' ').find(function (c) {
                return c.startsWith('mobile-length-');
            });

            // extrai o número
            var length = lengthClass
                ? parseInt(lengthClass.replace('mobile-length-', ''), 10)
                : 0;

            // aplica o truncamento se houver número
            if (length > 0) {
                truncateText(span, length);
            }
        },

        exit: function () {
            var span = $('.right-text span');
            restoreText(span);
        }
    });


    // -------------------------------
    // Funções
    // -------------------------------

    function truncateText($el, limit) {
        if (!$el.length) return;

        var original = $el.data('original-text');

        // salva o original uma única vez
        if (original === undefined) {
            original = $el.text();
            if (!original) return;
            $el.data('original-text', original);
        }

        var limitado = original.substring(0, limit) + '.';
        $el.text(limitado);
    }

    function restoreText($el) {
        if (!$el.length) return;

        var original = $el.data('original-text');
        if (original !== undefined) {
            $el.text(original);
        }
    }

});
