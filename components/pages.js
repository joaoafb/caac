function logs() {
    class ConteudoLogs extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
            <main id="pagelogs" class="dnone">
            <h1>LOGS</h1>
            <table id="logsTable"></table>
        </main>
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('conteudo-logs', ConteudoLogs);
}

function permissao() {
    class ConteudoPermissao extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
            <main id="altpem" class="dnone">
            </main>
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('conteudo-permissao', ConteudoPermissao);
}


function chamados() {
    class ConteudoChamados extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
           
            <main id="chamados" class="dnone chamados">
       
        </main>
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('conteudo-chamados', ConteudoChamados);
}






function envreceitas() {
    class EnvConteudoReceitas extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
           
            <main class="menu" id="pageenvreceita" style="display: none;">
            <div class="search-container">
                <input type="text" oninput="searchUsers()" placeholder="Pesquisar...">
            </div>
            <table id="dataTable">
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>EXAME</th>
                        <th>OBS</th>
                        <th>DEMANDA</th>
                        <th>AGENDADO</th>
                        <th>RESPONSAVEL</th>
                        <th>STATUS</th>
                        <th>AÇÃO</th>
                    </tr>
                </thead>
                <tbody id="pagereceita">
                    <!-- Adicione mais linhas com dados fictícios conforme necessário -->
                </tbody>
            </table>
        </main>
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('conteudo-receitas-env', EnvConteudoReceitas);
}