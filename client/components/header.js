class MeuHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="page-header">
        <div class="flex">
            <h1 class="page-title">Home </h1>
            <p id="nameop"></p>
        </div>
        <div class="flex row">
            <button onclick="compartilhar()" class="button notific"><i class="lni lni-website"></i></button>
            <button class="button notific" onclick="deslogar()"><i class="lni lni-power-switch"></i></button>
        </div>
        </header>
      `;
    }
}

// Registrar o elemento personalizado
customElements.define('comp-header', MeuHeader);