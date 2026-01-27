<?php

namespace Avanti\CustomCheckout\Helper;

use \Magento\Framework\App\Config\ScopeConfigInterface;

class CustomCheckoutHelper
{
    const XML_PATH_ENABLED = 'avanti_customcheckout/general/enabled';
    const XML_PATH_SUMMARY_ENABLED = 'avanti_customcheckout/general/enable_summary_message';

    public function __construct(private ScopeConfigInterface $scopeConfig) {}

    public function getEnabled()
    {
        return (int) $this->getConfigValue(self::XML_PATH_ENABLED);
    }

    public function getSummaryEnabled()
    {
        return (int) $this->getConfigValue(self::XML_PATH_SUMMARY_ENABLED);
    }

    public function getConfigValue($path)
    {
        return $this->scopeConfig->getValue(
            $path,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }
}
