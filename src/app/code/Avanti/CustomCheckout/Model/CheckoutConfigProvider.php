<?php 

declare(strict_types=1); 

namespace Avanti\CustomCheckout\Model; 
use Magento\Checkout\Model\ConfigProviderInterface; 
use Magento\Cms\Block\BlockFactory; 
use Magento\Store\Model\StoreManagerInterface; 
 
class CheckoutConfigProvider implements ConfigProviderInterface 
{ 
    public function __construct( 
        private BlockFactory $cmsBlockFactory, 
        private StoreManagerInterface $storeManager 
    ) {} 
 
    public function getConfig(): array 
    { 
        $storeId = (int) $this->storeManager->getStore()->getId(); 
 
        /** @var \Magento\Cms\Block\Block $block */ 
        $block = $this->cmsBlockFactory->create(); 
        $block->setData('block_id', 'fulfillment_status'); // identifier do CMS Block 
        $block->setStoreId($storeId); 
 
        return [ 
            'avanti_customcheckout' => [ 
                'fulfillment_status_html' => $block->toHtml() 
            ] 
        ]; 
    } 
} 