<?php

namespace Avanti\CrosssellLimit\Plugin;

use Magento\Checkout\Block\Cart\Crosssell;
use ReflectionProperty;

class CheckoutCrosssellMaxItem
{
    public function beforeGetItems(Crosssell $subject)
    {
        // Usa Reflection para alterar a propriedade protected
        $reflection = new ReflectionProperty($subject, '_maxItemCount');
        $reflection->setAccessible(true);
        $reflection->setValue($subject, 12);
    }
}
