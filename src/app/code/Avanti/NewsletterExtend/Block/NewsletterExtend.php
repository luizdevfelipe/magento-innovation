<?php

namespace Avanti\NewsletterExtend\Block;

use Magento\Framework\View\Element\Template;
use Magento\Store\Model\ScopeInterface;

class NewsletterExtend extends \Magento\Newsletter\Block\Subscribe
{
    const XML_PATH_ENABLED           = 'avanti_newsletterextend/general/enabled';
    const XML_PATH_PRIVACY_POLICY_LINK    = 'avanti_newsletterextend/general/privacy_policy';

    protected $scopeConfig;

    public function __construct(
        Template\Context $context,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        $this->scopeConfig = $scopeConfig;
        parent::__construct($context, $data);
    }

    public function isEnabled()
    {
        return (bool) $this->getConfig(self::XML_PATH_ENABLED);
    }

    public function getPrivacyPolicyLink()
    {
        return $this->getConfig(self::XML_PATH_PRIVACY_POLICY_LINK);
    }

    private function getConfig($path)
    {
        return $this->scopeConfig->getValue($path, ScopeInterface::SCOPE_STORE);
    }
}
