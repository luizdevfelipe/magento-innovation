<?php

namespace Avanti\NewsletterExtend\Plugin\Newsletter\Model;

/**
 * Plugin da classe SubscriptionManager (Magento Newsletter)
 *
 * Este plugin intercepta o processo de inscrição na newsletter
 * para adicionar comportamento extra SEM alterar o core.
 */

use Magento\Framework\App\Request\Http;
use Magento\Newsletter\Model\SubscriberFactory;
use Magento\Store\Model\StoreManagerInterface;

class SubscriptionManager
{
    /**
     * Request HTTP atual
     *
     * Usado para recuperar dados enviados via formulário
     * (ex: campos extras no subscribe)
     */
    protected $request;

    /**
     * Factory do model Subscriber
     *
     * Permite:
     * - Carregar subscriber existente
     * - Salvar dados adicionais
     */
    protected $subscriberFactory;

    /**
     * Store Manager
     *
     * Usado para:
     * - Obter store / website
     * - Garantir escopo correto do subscriber
     */
    protected $storeManager;

    /**
     * Construtor do plugin
     *
     * Todas as dependências são injetadas via DI
     */
    public function __construct(
        Http $request,
        SubscriberFactory $subscriberFactory,
        StoreManagerInterface $storeManager
    ) {
        $this->request = $request;
        $this->subscriberFactory = $subscriberFactory;
        $this->storeManager = $storeManager;
    }

    /**
     * Plugin do tipo After
     *
     * Fluxo:
     * 1. Código do método subscribe() é executado
     * 2. Execução do método plugin afterSubscribe()
     * 3. Retorno do valor original do método subscribe()
     * 
     * @param \Magento\Newsletter\Model\SubscriptionManager $subject
     *   Instância original da classe interceptada
     *
     * @param mixed $result
     *   Resultado do método original
     *
     * @param string $email
     *   Parâmetro original do método subscribe()
     *
     * @param int $storeId
     *   Store atual do método subscribe()
     */
    public function afterSubscribe(
        \Magento\Newsletter\Model\SubscriptionManager $subject,
        $result,
        $email,
        $storeId
    ) {
        /**
         *  Obtém dados extras enviados no request
         */
        $name = $this->request->getParam('name');
        $privacy = $this->request->getParam('privacy');

        /**
         * Aplica lógica adicional APÓS o subscribe
         */
        if ($name && $privacy) {

            /**
             * Obtém o website correto a partir da store
             * Subscriber é vinculado ao WEBSITE, não à store
             */
            $websiteId = (int) $this->storeManager
                ->getStore($storeId)
                ->getWebsiteId();

            /**
             * Carrega o subscriber recém-criado pelo email
             */
            $subscriber = $this->subscriberFactory
                ->create()
                ->loadBySubscriberEmail($email, $websiteId);

            /**
             * Garante que o subscriber existe antes de salvar
             */
            if ($subscriber->getId()) {

                /**
                 * Salva o nome, se informado
                 */
                if ($name) {
                    $subscriber->setSubscriberName($name);
                }

                /**
                 * Normaliza o valor de privacy para 0 ou 1
                 */
                $privacyValue = ($privacy == '1') ? 1 : 0;
                $subscriber->setSubscriberPrivacy($privacyValue);

                /**
                 * Persiste os dados no banco
                 */
                $subscriber->save();
            }
        }

        /**
         * Retorna o resultado original do método subscribe()
         * como previsto para o método after
         */
        return $result;
    }
}
