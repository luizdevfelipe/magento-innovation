<?php

namespace Avanti\ShippingEstimator\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;
use Magento\Catalog\Api\ProductRepositoryInterface;
use \Magento\Framework\App\Config\ScopeConfigInterface;

use Magento\Catalog\Block\Product\View as ProductView;


class ShippingEstimator extends Template
{
    const XML_PATH_ENABLED  = 'avanti_shippingestimator/general/enabled';
    const XML_PATH_CEP_LINK    = 'avanti_shippingestimator/general/cep_link';

    private ProductView $productView;
    private ScopeConfigInterface $scopeConfig;

    public function __construct(
        Template\Context $context,
        ProductView $productView,
        ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->productView = $productView;
        $this->scopeConfig = $scopeConfig;
    }

    public function getCurrentProduct(): ?\Magento\Catalog\Model\Product
    {
        return $this->productView->getProduct();
    }

    public function productHasStock(): bool
    {
        $product = $this->getCurrentProduct();

        if (!$product) {
            return false;
        }

        return (bool) $product->isSaleable();
    }

    public function isEnabled()
    {
        return (bool) $this->getConfig(self::XML_PATH_ENABLED);
    }

    public function getCepLink()
    {
        return $this->getConfig(self::XML_PATH_CEP_LINK);
    }

    private function getConfig($path)
    {
        return $this->scopeConfig->getValue(
            $path,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

}
