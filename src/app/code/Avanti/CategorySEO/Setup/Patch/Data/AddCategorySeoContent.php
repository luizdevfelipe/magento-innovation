<?php

namespace Avanti\CategorySEO\Setup\Patch\Data;

use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Catalog\Model\Category;
use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;

class AddCategorySeoContent implements DataPatchInterface
{
    /**
     * Factory responsável por criar o EavSetup,
     * usado para criar e alterar atributos EAV
     */
    private EavSetupFactory $eavSetupFactory;

    public function __construct(EavSetupFactory $eavSetupFactory)
    {
        // Injeção da factory que permite manipular atributos EAV
        $this->eavSetupFactory = $eavSetupFactory;
    }

    public function apply()
    {
        // Cria a instância do EavSetup
        $eavSetup = $this->eavSetupFactory->create();

        // Evita recriar o atributo caso o patch já tenha sido aplicado
        if ($eavSetup->getAttributeId(Category::ENTITY, 'seo_content')) {
            return;
        }

        // Criação do atributo EAV para categorias
        $eavSetup->addAttribute(
            Category::ENTITY,
            'seo_content',
            [
                'type' => 'text', // Tipo armazenado no banco
                'label' => 'SEO Content', // Rótulo exibido no admin
                'input' => 'textarea', // Tipo de campo no formulário
                'required' => false,
                'global' => ScopedAttributeInterface::SCOPE_STORE, // Valor por store view
                'visible' => true,
                'user_defined' => true, // Atributo customizado (não nativo)
                'is_html_allowed_on_front' => true, // Permite HTML no frontend (PageBuilder)
            ]
        );
    }

    /**
     * Define se esse patch depende de outro patch
     */
    public static function getDependencies(): array
    {
        return [];
    }

    /**
     * Aliases usados em casos de renomeação de patches
     */
    public function getAliases(): array
    {
        return [];
    }
}
