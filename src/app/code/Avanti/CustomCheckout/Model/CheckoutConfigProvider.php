<?php

declare(strict_types=1);

namespace Avanti\CustomCheckout\Model;

// Interface que todo ConfigProvider do checkout deve implementar
use Magento\Checkout\Model\ConfigProviderInterface;

// Factory para criar instâncias de blocos CMS dinamicamente
use Magento\Cms\Block\BlockFactory;

// Interface para obter informações da loja atual (store, website, etc)
use Magento\Store\Model\StoreManagerInterface;

use \Avanti\CustomCheckout\Helper\CustomCheckoutHelper;

/**
 * Classe responsável por fornecer configurações personalizadas
 * para o frontend do checkout via window.checkoutConfig
 */
class CheckoutConfigProvider implements ConfigProviderInterface
{
    /**
     * Construtor com injeção de dependências via DI do Magento
     *
     * @param BlockFactory $cmsBlockFactory
     *        Usado para criar um bloco CMS programaticamente
     *
     * @param StoreManagerInterface $storeManager
     *        Usado para descobrir qual é a store atual
     */
    public function __construct(
        private BlockFactory $cmsBlockFactory,
        private StoreManagerInterface $storeManager,
        private CustomCheckoutHelper $customCheckoutHelper
    ) {}

    /**
     * Método obrigatório da interface ConfigProviderInterface
     *
     * Tudo que for retornado aqui será mesclado em:
     * window.checkoutConfig no frontend (JavaScript)
     *
     * @return array
     */
    public function getConfig(): array
    {
        // Verifica se o módulo está habilitado e se a mensagem de resumo está ativada
        if (
            !$this->customCheckoutHelper->getEnabled() ||
            !$this->customCheckoutHelper->getSummaryEnabled()
        ) {
            return [];
        }

        // Obtém o ID da store atual (importante para conteúdo multi-store)
        $storeId = (int) $this->storeManager->getStore()->getId();

        /**
         * Cria uma instância de um bloco CMS dinamicamente
         *
         * @var \Magento\Cms\Block\Block $block
         */
        $block = $this->cmsBlockFactory->create();

        // Define qual CMS Block será carregado (identifier no admin)
        // Exemplo: Content > Blocks > Identifier = fulfillment_status
        $block->setData('block_id', 'fulfillment_status');

        // Define para qual store esse bloco deve ser renderizado
        $block->setStoreId($storeId);

        /**
         * Retorna um array que será exposto no JavaScript do checkout
         *
         * No frontend você poderá acessar:
         * window.checkoutConfig.avanti_customcheckout.fulfillment_status_html
         *
         * Esse valor conterá o HTML renderizado do CMS Block
         */
        return [
            'avanti_customcheckout' => [
                // Renderiza o bloco CMS em HTML e envia para o JS
                'fulfillment_status_html' => $block->toHtml()
            ]
        ];
    }
}
