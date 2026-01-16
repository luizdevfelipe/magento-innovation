require([
    'jquery',
    'slick',
    'matchMedia'
], function ($) {

    mediaCheck({
        media: '(max-width: 767px)',

        // mobile
        entry: function () {
            var $clonedLink = $('.out-of-stock .product.media .action.towishlist');
            if ($clonedLink.length) {
                $clonedLink.remove();
            }
        },

        // desktop
        exit: function () {
            var $container = $('.out-of-stock .product.media');
            var $originalLink = $('.action.towishlist').first();

            console.log($container)

            // validações
            if (!$container.length || !$originalLink.length) {
                return;
            }

            // evita duplicar o botão
            if ($container.find('.action.towishlist').length) {
                return;
            }

            // cria o clone
            var $clonedLink = $originalLink.clone(true, true);

            // remove o span APENAS do clone
            $clonedLink.find('span').remove();

            // adiciona ao container
            $container.prepend($clonedLink);
        }
    });

});
