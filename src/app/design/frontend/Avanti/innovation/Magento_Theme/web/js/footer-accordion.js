define([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {
    'use strict';

    console.log("footer-accordion: módulo carregado");

    // Só aplica o comportamento em mobile
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            // Garante DOM pronto
            $(initAccordion);
        },
        exit: function () {
            // Ao sair do mobile, remove estados e estilos inline
            $('.footer-accordion')
                .removeClass('is-open')
                .find('ul')
                .attr('style', '');
        }
    });

    function initAccordion() {
        var $accordions = $('.footer-accordion');

        if (!$accordions.length) {
            console.log("footer-accordion: nenhum bloco encontrado");
            return;
        }

        $accordions.each(function () {
            var $block = $(this);
            var $title = $block.find('h4').first();
            var $list = $title.next('ul');

            if (!$list.length) {
                console.log("footer-accordion: bloco sem <ul> logo após o <h4>");
                return;
            }

            // Estado inicial: fechado
            $block.removeClass('is-open');
            $list.hide();

            // Evitar duplicar eventos
            $title
                .off('click.footerAccordion')
                .on('click.footerAccordion', function () {

                    // Se quiser só um aberto por vez, descomente:
                    // $accordions.not($block).removeClass('is-open').find('ul').slideUp();

                    $block.toggleClass('is-open');
                    $list.slideToggle(200);
                });
        });
    }
});
