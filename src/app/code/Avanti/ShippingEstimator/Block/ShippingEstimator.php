<?php

namespace Avanti\ShippingEstimator\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;
use Magento\Catalog\Api\ProductRepositoryInterface;

class ShippingEstimator extends Template
{
    private Registry $registry;
    private ProductRepositoryInterface $productRepository;

    public function __construct(
        Template\Context $context,
        Registry $registry,
        ProductRepositoryInterface $productRepository,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->registry = $registry;
        $this->productRepository = $productRepository;
    }

    /**
     * Produto atual da PDP
     */
    public function getCurrentProduct(): ?\Magento\Catalog\Model\Product
    {
        $product = $this->registry->registry('current_product');
        return $product instanceof \Magento\Catalog\Model\Product ? $product : null;
    }

    /**
     * Verifica se o produto possui estoque
     */
    public function productHasStock(?string $sku = null): bool
    {
        try {
            $product = $sku
                ? $this->productRepository->get($sku)
                : $this->getCurrentProduct();

            if (!$product) {
                return false;
            }

            return (bool) $product->isSaleable();
        } catch (\Throwable $e) {
            return false;
        }
    }
}
