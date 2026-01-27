define([
    'domReady',
    'Magento_Ui/js/lib/view/utils/dom-observer',
    'jquery',
    'mage/validation',
    'Avanti_CustomCheckout/js/validation/postcode-br'
], function (
    domReady,
    domObserver,
    $
) {
    'use strict';

    var VIACEP_URL = 'https://viacep.com.br/ws/{cep}/json/';

    function onlyDigits(value) {
        return (value || '').replace(/\D/g, '');
    }

    domReady(function () {

        domObserver.get('input[name*="postcode"]', function (el) {
            var $el = $(el);

            // 1) garante que o form tenha validator
            var $form = $el.closest('form');
            if ($form.length && !$form.data('validator')) {
                $form.validation();
            }

            // 2) aplica regra de formato BR
            if ($el.rules) {
                $el.rules('add', {
                    'validate-postcodeBR': true
                });
            }

            // 3) valida existência no ViaCEP no blur
            $el.on('blur', function () {
                var cep = onlyDigits($el.val());

                if (cep.length !== 8) {
                    return;
                }

                $.ajax({
                    url: VIACEP_URL.replace('{cep}', cep),
                    dataType: 'json'
                }).done(function (data) {
                    if (data.erro) {
                        // força erro manualmente
                        $el
                            .removeClass('valid')
                            .addClass('mage-error');

                        // injeta mensagem no container padrão
                        var $msg = $el.siblings('.mage-error');
                        if (!$msg.length) {
                            $msg = $('<div class="mage-error"></div>').insertAfter($el);
                        }

                        $msg.text($.mage.__('CEP não encontrado. Verifique se ele existe.'));
                    } else {
                        // remove classe de erro do input
                        $el.removeClass('mage-error');

                        // remove mensagem de erro criada manualmente
                        var $msg = $el.siblings('.mage-error');
                        if ($msg.length) {
                            $msg.remove();
                        }

                        // limpa estado interno do jQuery Validation (se existir)
                        var $form = $el.closest('form');
                        if ($form.length && $form.data('validator')) {
                            var validator = $form.data('validator');

                            // remove erro específico deste campo
                            if (validator.errorMap && validator.errorMap[$el.attr('name')]) {
                                delete validator.errorMap[$el.attr('name')];
                            }

                            // remove da lista de elementos inválidos
                            if (validator.invalid && validator.invalid[$el.attr('name')]) {
                                delete validator.invalid[$el.attr('name')];
                            }

                            // força revalidação visual do campo
                            $el.valid();
                        }

                        // Auto-preenche campos básicos
                        var $form = $el.closest('form');

                        var $country = $form.find('[name*="country_id"]');
                        var $city = $form.find('[name*="city"]');
                        var $street = $form.find('[name*="street[0]"]');
                        var $region = $form.find('[name*="region_id"]');

                        
                        if ($country.length) {
                            $country.val('BR').trigger('change');
                        }

                        if ($city.length && data.localidade) {
                            $city.val(data.localidade).trigger('change');
                        }

                        if ($street.length && data.logradouro) {
                            $street.val(data.logradouro).trigger('change');
                        }

                        if ($region.length && data.estado) {
                            $region.find('option').each(function () {
                                if ($(this).text().trim().toUpperCase() === data.estado.trim().toUpperCase()) {
                                    $region.val($(this).val()).trigger('change');
                                    return false; // break
                                }
                            });
                        }                        
                    }
                });
            });
        });

    });
});
