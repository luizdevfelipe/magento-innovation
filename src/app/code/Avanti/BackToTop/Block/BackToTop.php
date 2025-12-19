<?php
namespace Avanti\BackToTop\Block;

/**
 * Classe Block
 * 
 * Blocks são a camada intermediária entre:
 * - Configuração / lógica (PHP)
 * - Template (.phtml)
 *
 * Tudo que o template precisa "saber" deve vir daqui
 */

use Magento\Framework\View\Element\Template;
use Magento\Store\Model\ScopeInterface;

class BackToTop extends Template
{
    /**
     * Constantes com os paths de configuração
     *
     * Esses paths devem refletir:
     * section/group/field definidos no system.xml
     */
    const XML_PATH_ENABLED  = 'avanti_backtotop/general/enabled';
    const XML_PATH_POSITION = 'avanti_backtotop/general/position';
    const XML_PATH_COLOR    = 'avanti_backtotop/general/color';

    /**
     * Serviço responsável por ler valores de configuração
     * (stores > configuration)
     */
    protected $scopeConfig;

    /**
     * Construtor do Block
     *
     * @param Template\Context $context
     *   Contexto padrão do Magento para Blocks
     *   Contém:
     *   - scopeConfig
     *   - storeManager
     *   - urlBuilder
     *   - etc
     *
     * @param ScopeConfigInterface $scopeConfig
     *   Interface usada para acessar configurações do sistema
     *
     * @param array $data
     *   Dados opcionais passados via layout XML
     */
    public function __construct(
        Template\Context $context,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        $this->scopeConfig = $scopeConfig;
        parent::__construct($context, $data);
    }

    /**
     * Verifica se o recurso está habilitado
     *
     * Normalmente usado em templates:
     * if ($block->isEnabled())
     */
    public function isEnabled()
    {
        return (bool) $this->getConfig(self::XML_PATH_ENABLED);
    }

    /**
     * Retorna a posição configurada
     *
     * Ex: left, right
     */
    public function getPosition()
    {
        return $this->getConfig(self::XML_PATH_POSITION);
    }

    /**
     * Retorna a cor configurada no admin
     */
    public function getColor()
    {
        return $this->getConfig(self::XML_PATH_COLOR);
    }

    /**
     * Método interno genérico para leitura de config
     *
     * Centraliza:
     * - Escopo (store / website / default)
     * - Forma de leitura
     *
     * @param string $path
     * @return mixed
     */
    private function getConfig($path)
    {
        return $this->scopeConfig->getValue(
            $path,
            ScopeInterface::SCOPE_STORE
        );
    }
}
