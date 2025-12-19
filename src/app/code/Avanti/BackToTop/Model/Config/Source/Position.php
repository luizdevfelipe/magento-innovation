<?php
namespace Avanti\BackToTop\Model\Config\Source;

/**
 * Source Model
 *
 * Source Models são usados para:
 * - Fornecer opções para campos select / multiselect
 * - Centralizar valores possíveis de configuração
 * - Reutilizar essas opções em outros lugares do sistema
 */

use Magento\Framework\Option\ArrayInterface;

class Position implements ArrayInterface
{
    /**
     * Retorna as opções que aparecerão no campo select do Admin
     *
     * Estrutura esperada pelo Magento:
     * [
     *   ['value' => '...', 'label' => '...'],
     *   ...
     * ]
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [
            [
                // Valor salvo no banco e retornado via scopeConfig
                'value' => 'right',

                // Label exibido no Admin (traduzível)
                'label' => __('Right'),
            ],
            [
                'value' => 'left',
                'label' => __('Left'),
            ],
        ];
    }
}
