define(['jquery'], function ($) {
    'use strict';

    return function (config, element) {
        // Inicializa o componente com config recebido e o nó DOM onde está instanciado
        var $root = $(element);
        // Título usado no compartilhamento; usa document.title como fallback
        var title = config.title || document.title;
        // URL do produto/página; usa location atual como fallback
        var url = config.url || window.location.href;

        // Botão que dispara o compartilhamento/cópia
        var $btn = $root.find('.share-native');
        // Elemento de feedback visual (ex: "copiado")
        var $feedback = $root.find('.share-feedback');

        // Mostra feedback visual por um curto período
        function showFeedback() {
            if (!$feedback.length) return;
            $feedback.stop(true, true).fadeIn(150);
            setTimeout(function () {
                $feedback.fadeOut(150);
            }, 2000);
        }

        // Tenta usar Clipboard API moderna; se falhar, usa fallback com input temporário
        async function copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                showFeedback();
            } catch (e) {
                // Fallback simples para navegadores antigos: input temporário + execCommand
                var $temp = $('<input>');
                $('body').append($temp);
                $temp.val(text).select();
                document.execCommand('copy');
                $temp.remove();
                showFeedback();
            }
        }

        // Ao clicar: usa Web Share API quando disponível; caso contrário copia a URL
        $btn.on('click', function () {
            if (navigator.share) {
                navigator.share({ title: title, url: url })
                    .catch(function () {
                        // Usuário cancelou ou houve erro -> fallback para cópia
                        copyToClipboard(url);
                    });
            } else {
                copyToClipboard(url);
            }
        });
    };
});
