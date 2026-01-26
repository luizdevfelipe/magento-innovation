<?php 

namespace Avanti\CrosssellLimit\Helper;

use \Magento\Framework\App\Config\ScopeConfigInterface;

class CrossSellLimitHelper
{
    const XML_PATH_CROSSSELL_LIMIT = 'avanti_crosssell_limit/general/max_value';

    public function __construct (private ScopeConfigInterface $scopeConfig) {}

    public function getCrossSellLimitValue()
    {
        return (int) $this->scopeConfig->getValue(
            self::XML_PATH_CROSSSELL_LIMIT,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }
}