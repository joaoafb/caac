function modalpermissao() {
    class ModalPermissao extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
            <!--MODAL ADD USER-->
            <div id="modapermissao" class="modal" style="display:none">
                <div class="modal-content" id="addmodal">
                    <h2 style="text-align: center;">Adicionar Permissão</h2>
                    <form action="" id="formpem">
                        <label for="inputsenha"></label>
                        <input type="text" required id="inputnome" placeholder="Digite Aqui a Senha">
                        <label for="inputpermissao"></label>
                        <input type="text" required id="inputpermissao" placeholder="{0,1,2 ou 3}">
                        <label for="" class="inform">
                          <p>0 = Administrador(a)</p>
                          <p>1 = Operador(a)</p>
                          <p>2 = Enfermeira(o)</p>
                          <p>3 = Supervisor(a)</p>
                       </label>
                        <button type="submit" class="buttonenv">Adicionar</button>
                    </form>
                    <button class="buttonenv closemodal" >Voltar</button>
                </div>
            </div>
            
          `;
        }

    }

    customElements.define('page-modal-permissao', ModalPermissao);
}

function modalchamado() {
    class ModalChamado extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
           
    <!--MODAL-->
    <div id="modachamado" class="modal" style="display:block">
        <div class="modal-content">
            <form id="formchamado" onsubmit="return false;">
                <h2 style="text-align: center;" id="message">Motivo do Chamado</h2>
                <input required type="text" id="motivo">
                <h2 style="text-align: center;">Descrição do Chamado</h2>
                <textarea required name="" id="descricao" cols="30" rows="20"></textarea>
                <br>
                <button class="buttonenv" type="submit">Enviar</button>
            </form>
            <button class="buttonenv" onclick="closemodal()"  type="button">Fechar</button>
        </div>
    </div>
            
          `;
        }
    }

    customElements.define('page-modal-chamado', ModalChamado);
}


function modalenfermeira() {
    class ModalEnfermeira extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
           
          
            <div id="modalenfermeira" class="modal">
                <div class="modal-content" id="enfermeiramodal">
                </div>
            </div>
            
          `;
        }
    }

    customElements.define('page-modal-enfermeira', ModalEnfermeira);
}