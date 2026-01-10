<?php

namespace Avanti\CategorySEO\Block\Category;

use Magento\Framework\View\Element\Template;
use Magento\Catalog\Model\Layer\Resolver;

class SeoContent extends Template
{
    /**
     * Resolver da Layer do catálogo
     * Usado para obter a categoria atual de forma correta no Magento
     */
    protected $layerResolver;

    public function __construct(
        Template\Context $context,
        Resolver $layerResolver,
        array $data = []
    ) {
        // Injeta o Layer Resolver para acessar a categoria corrente
        $this->layerResolver = $layerResolver;

        // Inicializa corretamente o Block base do Magento
        parent::__construct($context, $data);
    }

    /**
     * Retorna o conteúdo SEO da categoria atual
     */
    public function getSeoContent()
    {
        // Obtém a categoria atualmente carregada na página
        $category = $this->layerResolver->get()->getCurrentCategory();

        // Retorna o valor do atributo customizado ou vazio se não existir categoria
        return $category ? $category->getData('seo_content') : '';
    }
}
