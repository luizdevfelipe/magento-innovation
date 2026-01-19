<?php

namespace Avanti\ShippingEstimator\Block;

use \Magento\Framework\View\Element\Template;
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

    /**
     * Get the current product from the product view block.
     * @return \Magento\Catalog\Model\Product|null
     */        
    public function getCurrentProduct(): ?\Magento\Catalog\Model\Product
    {
        return $this->productView->getProduct();
    }

    /**
     * Check if the current product has stock available.
     * @return bool
     */
    public function productHasStock(): bool
    {
        $product = $this->getCurrentProduct();

        if (!$product) {
            return false;
        }

        return (bool) $product->isSaleable();
    }

    /**
     * Check if the shipping estimator feature is enabled.
     * @return bool
     */
    public function isEnabled()
    {
        return (bool) $this->getConfig(self::XML_PATH_ENABLED);
    }

    /**
     * Get the CEP link from configuration.
     * @return string|null
     */
    public function getCepLink()
    {
        return $this->getConfig(self::XML_PATH_CEP_LINK);
    }

    /**
     * Retrieve configuration value by path.
     * @param string $path
     * @return mixed
     */
    private function getConfig($path)
    {
        return $this->scopeConfig->getValue(
            $path,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

}
