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
     * Plugin do tipo AROUND
     *
     * around + NomeDoMetodoOriginal
     * aroundSubscribe intercepta SubscriptionManager::subscribe()
     *
     * Fluxo:
     * 1. Código ANTES do $proceed()
     * 2. Execução do método original ($proceed)
     * 3. Código DEPOIS do $proceed()
     *
     * @param \Magento\Newsletter\Model\SubscriptionManager $subject
     *   Instância original da classe interceptada
     *
     * @param callable $proceed
     *   Callback para executar o método original
     *
     * @param string $email
     *   Parâmetro original do método subscribe()
     *
     * @param int $storeId
     *   Store atual
     */
    public function aroundSubscribe(
        \Magento\Newsletter\Model\SubscriptionManager $subject,
        callable $proceed,
        $email,
        $storeId
    ) {
        /**
         * 1️⃣ Executa o fluxo padrão do Magento
         *
         * IMPORTANTE:
         * Se você NÃO chamar $proceed():
         * - O subscribe não acontece
         * - Você substitui totalmente o método original
         */
        $result = $proceed($email, $storeId);

        /**
         * 2️⃣ Recupera dados extras enviados no request
         *
         * Esses campos normalmente vêm de:
         * - formulário customizado
         * - AJAX
         */
        $name = $this->request->getParam('name');
        $privacy = $this->request->getParam('privacy');

        /**
         * 3️⃣ Aplica lógica adicional APÓS o subscribe
         *
         * Só executa se os dados extras existirem
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
         * 4️⃣ Retorna o resultado original do método subscribe()
         *
         * Mantém compatibilidade total com o core
         */
        return $result;
    }
}
