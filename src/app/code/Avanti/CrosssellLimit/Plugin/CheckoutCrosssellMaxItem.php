<?php

namespace Avanti\CrosssellLimit\Plugin;

use \Magento\Checkout\Block\Cart\Crosssell;
use Avanti\CrosssellLimit\Helper\CrossSellLimitHelper;
use ReflectionProperty;

class CheckoutCrosssellMaxItem
{
    public function __construct(
        private CrossSellLimitHelper $crossSellLimitHelper
    ) {}

    public function beforeGetItems(Crosssell $subject)
    {
        // Usa Reflection API para alterar a propriedade protected
        $reflection = new ReflectionProperty($subject, '_maxItemCount');
        $reflection->setValue($subject, $this->crossSellLimitHelper->getCrossSellLimitValue());
    }
}
