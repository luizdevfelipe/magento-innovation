define([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {
    'use strict';

    // Só aplica o comportamento em mobile
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            // Garante DOM pronto
            $(initAccordion);
        },
        exit: function () {
            // Ao sair do mobile, remove estados e estilos inline
            var $accordions = $('.footer-accordion');
            $accordions
                .removeClass('is-open')
                .find('ul')
                .attr('style', '');

            $accordions.find('h4').off('click.footerAccordion');
        }
    });

    function initAccordion() {
        var $accordions = $('.footer-accordion');

        if (!$accordions.length) {
            return;
        }

        $accordions.each(function () {
            var $block = $(this);
            var $title = $block.find('h4').first();
            var $list = $title.next('ul');

            if (!$list.length) {
                return;
            }

            // Estado inicial: fechado
            $block.removeClass('is-open');
            $list.hide();

            // Evitar duplicar eventos
            $title
                .off('click.footerAccordion')
                .on('click.footerAccordion', function () {
                    // Apenas um accordion aberto por vez
                    $accordions.not($block).removeClass('is-open').find('ul').slideUp();

                    $block.toggleClass('is-open');
                    $list.slideToggle(200);
                });
        });
    }
});
