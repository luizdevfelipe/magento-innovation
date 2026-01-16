/**
 * Qty Stepper Component
 * 
 * Componente responsável por controlar o incremento e decremento de quantidade
 * de produtos através de botões (stepper). Permite aumentar ou diminuir a quantidade
 * respeitando valores mínimos, máximos e incrementos definidos no input.
 * 
 * @module qty-stepper
 * @requires jquery
 * 
 * @example
 * // HTML necessário:
 * // <div data-mage-init='{"qty-stepper": {}}'>
 * //   <button class="qty-minus">-</button>
 * //   <input type="number" class="qty" min="1" max="100" step="1" value="1" />
 * //   <button class="qty-plus">+</button>
 * // </div>
 */
define(['jquery'], function ($) {
    'use strict';

    /**
     * Inicializa o componente qty-stepper
     * 
     * @param {Object} config - Configurações do componente
     * @param {string} [config.inputSelector='input.qty'] - Seletor CSS para encontrar o input de quantidade
     * @param {HTMLElement} element - Elemento DOM raiz do componente
     * @returns {void}
     */
    return function (config, element) {
        var $root = $(element);

        // Prioridade: carrinho
        var $input = $root.find('input.cart-item-qty').first();

        // Fallback: PDP / PLP
        if (!$input.length) {
            $input = $root.find('input.qty').first();
        }

        if (!$input.length) {
            return;
        }
        /**
         * Obtém o valor de um atributo numérico do input
         * 
         * @private
         * @param {string} attrName - Nome do atributo (ex: 'min', 'max', 'step')
         * @param {number} fallback - Valor padrão caso o atributo não exista ou seja inválido
         * @returns {number} Valor numérico do atributo ou fallback
         */
        var getNumberAttr = function (attrName, fallback) {
            var val = $input.attr(attrName);
            if (val === undefined || val === null || val === '') {
                return fallback;
            }
            var num = Number(val);
            return Number.isFinite(num) ? num : fallback;
        };

        /**
         * Obtém o valor de incremento/decremento (atributo 'step')
         * 
         * @private
         * @returns {number} Valor do step, padrão é 1
         */
        var getStep = function () {
            return getNumberAttr('step', 1);
        };

        /**
         * Obtém o valor mínimo permitido (atributo 'min')
         * 
         * @private
         * @returns {number} Valor mínimo, padrão é 1
         */
        var getMin = function () {
            return getNumberAttr('min', 1);
        };

        /**
         * Obtém o valor máximo permitido (atributo 'max')
         * 
         * @private
         * @returns {number|null} Valor máximo ou null se não houver limite
         */
        var getMax = function () {
            // se não tiver max, devolve null
            var val = $input.attr('max');
            if (val === undefined || val === null || val === '') {
                return null;
            }
            var num = Number(val);
            return Number.isFinite(num) ? num : null;
        };

        /**
         * Limita o valor entre o mínimo e máximo permitidos
         * 
         * @private
         * @param {number} value - Valor a ser limitado
         * @returns {number} Valor ajustado dentro dos limites min/max
         */
        var clamp = function (value) {
            var min = getMin();
            var max = getMax();
            var v = value;

            // Garante que não seja menor que o mínimo
            if (v < min) v = min;

            // Garante que não seja maior que o máximo (se existir)
            if (max !== null && v > max) v = max;

            return v;
        };

        /**
         * Define o valor do input de quantidade
         * Aplica validação de limites e dispara eventos necessários para o Magento
         * 
         * @private
         * @param {number} next - Novo valor a ser definido
         * @returns {void}
         */
        var setValue = function (next) {
            var v = clamp(next);
            $input.val(v);

            // Importante: dispara eventos para validação e possíveis listeners do Magento
            // 'change' - notifica mudança de valor
            // 'input' - dispara validação em tempo real
            $input.trigger('change');
            $input.trigger('input');
            $input.trigger('keyup');
        };

        /**
         * Event Handler: Incrementa a quantidade ao clicar no botão plus (+)
         */
        $root.on('click', '.qty-plus', function () {
            var current = Number($input.val()) || getMin();
            setValue(current + getStep());
        });

        /**
         * Event Handler: Decrementa a quantidade ao clicar no botão minus (-)
         */
        $root.on('click', '.qty-minus', function () {
            var current = Number($input.val()) || getMin();
            setValue(current - getStep());
        });
    };
});
