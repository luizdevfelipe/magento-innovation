/*
* Função para mover o minicart dependendo do tamanho da tela
*/
function moveMinicart() {
    const header = document.querySelector(".page-header .header.content");
    const minicart = document.querySelector(".minicart-wrapper");
    const searchBlock = document.querySelector(".block-search");
    const compareWrapper = document.querySelector("ul.compare.wrapper");

    if (header && minicart && searchBlock) {
        if (window.innerWidth <= 768) {
            header.insertBefore(minicart, searchBlock);
        } else {
            header.insertBefore(minicart, compareWrapper);
        }
    }
}

// Mover o minicart quando o conteúdo da página for carregado e quando a janela for redimensionada
window.addEventListener("DOMContentLoaded", function () {
    moveMinicart();
    window.addEventListener("resize", moveMinicart);
});
