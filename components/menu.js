function menupem0() {
    toast("Olá, " + localStorage.getItem("usuario"), 2000)
    class MenuInicial0 extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
             <!--MENU INICIAL-->
             <main class="menu" id="menu">
                 <div onclick="operador()" class="menu-item">
                     <i class="lni lni-network"></i>
                     <h3>Enfermeira(o)</h3>
                 </div>
                 <div onclick="enfermeira()"  class="menu-item">
                     <i class="lni lni-sthethoscope"></i>
                     <h3>Operador(a)</h3>
                 </div>
                 <div onclick="admin()"  class="menu-item">
                     <i class="lni lni-cog"></i>
                     <h3>Admin</h3>
                 </div>
                 <div onclick="autorizacao()"  class="menu-item">
                 <i class="lni lni-agenda"></i>
                 <h3>Autorização</h3>
             </div>
             </main>
         
             <!--FIM MENU INICIAL-->
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('menu-inicial0', MenuInicial0);
}

function menupem1() {
    toast("Olá, " + localStorage.getItem("usuario"), 2000)
    class MenuInicial1 extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
             <!--MENU INICIAL-->
             <main class="menu" id="menu">
                 <div onclick="enfermeira()" class="menu-item">
                     <i class="lni lni-network"></i>
                     <h3>Operador(a)</h3>
                 </div>
                 
             </main>
         
             <!--FIM MENU INICIAL-->
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('menu-inicial1', MenuInicial1);
}

function menupem2() {
    toast("Olá, " + localStorage.getItem("usuario"), 2000)
    class MenuInicial2 extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
             <!--MENU INICIAL-->
             <main class="menu" id="menu">
             
                 <div id="enfer" onclick="operador()" class="menu-item">
                     <i class="lni lni-sthethoscope"></i>
                     <h3>Enfermeira(o)</h3>
                 </div>
                
             </main>
         
             <!--FIM MENU INICIAL-->
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('menu-inicial2', MenuInicial2);
}

function menupem3() {
    toast("Olá, " + localStorage.getItem("usuario"), 2000)
    class MenuInicial3 extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
             <!--MENU INICIAL-->
             <main class="menu" id="menu">
                 <div onclick="enfermeira()"class="menu-item">
                     <i class="lni lni-network"></i>
                     <h3>Operador(a)</h3>
                 </div>
                 <div onclick="operador()" class="menu-item">
                     <i class="lni lni-sthethoscope"></i>
                     <h3>Enfermeira(o)</h3>
                 </div>
                
             </main>
         
             <!--FIM MENU INICIAL-->
          `;
        }
    }

    // Registrar o elemento personalizado
    customElements.define('menu-inicial3', MenuInicial3);
}



//SIDEBAR
class SUBMENUOPERADOR extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const menuContent = `
          <div id="homeenfer" style="display:none">
            <div class="menupage">
              <ul style="overflow-y: scroll;">
                <div class="optionHome" onclick="optionHome()">
                  <li>Operador</li>
                </div>
                <div class="optionPreencher">
                  <li>Preencher Dessensibilização</li>
                </div>
                <div class="optionEnvReceita">
                  <li>Enviar Receitas</li>
                </div>
                <div class="optionTodosPacientes">
                  <li>Todos os Pacientes</li>
                </div>
              </ul>
            </div>
            <div class="headermenu">
              <button class="button notific btnmenu zoom"><i class="lni lni-shift-left"></i></button>
            </div>
          </div>
        `;

        // Append do conteúdo usando jQuery
        $(this).append(menuContent);

        // Adicionar eventos de clique aos elementos do menu usando jQuery
        $(this).find('.active').click(optionHome);
        $(this).find('li:contains("Preencher Dessensibilização")').parent().click(optionPreencher);
        $(this).find('li:contains("Enviar Receitas")').parent().click(optionEnvReceita);
        $(this).find('li:contains("Todos os Pacientes")').parent().click(optionTodosPacientes);

        // Adicionar evento de clique ao botão de voltar usando jQuery
        $(this).find('.headermenu .btnmenu').click(back);
    }

}

// Registrar o elemento personalizado
customElements.define('sub-menu-operador', SUBMENUOPERADOR);



class SUBMENUENF extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <!--MENU LATERAL-->
    <div id="homeop" style="display:none" >
        <div class="menupage">
     
            <ul style="overflow-y: scroll;">
               <div class="optionHomeEnfer" onclick="optionHomeEnfer()" >
               <li>Enfermeira(o)</li>
               </div>
               
               <div class="optionPreencher" onclick="optionPreencher()">
               <li>Preencher Dessensibilização</li>
               </div>
               
               <div class="optionCriarReceita" onclick="optionCriarReceita()">
               <li>Criar Receita</li>
               </div>
               <div class="optionTodosPacientes" onclick="optionTodosPacientes()">
               <li>Todos os Pacientes</li>
               </div>
               
           
               
              
               
            </ul>
        </div>
        <div class="headermenu">
        <button class="button notific btnmenu zoom" onclick="back()"><i class="lni lni-shift-left"></i></button>
    </div>
        <!--FIM MENU LATERAL-->
      `;
    }
}

// Registrar o elemento personalizado
customElements.define('sub-menu-enfermeira', SUBMENUENF);





class SUBMENUADMIN extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <!--MENU LATERAL-->
    <div  id="homeadmin"  style="display:none">
        <div class="menupage">
       
            <ul style="overflow-y: scroll;">
                <div onclick="optionHomeadmin()" class="optionHomeadmin">
                    <li>Administrador</li>
                </div>
                <div onclick="optionLogs()" class="optionLogs">
                    <li>Logs</li>
                </div>
                <div onclick="optionPem()" class="optionPem" >
                    <li>Permissões</li>
                </div>
                <div  onclick="optionChamados()" class="optionChamados">
                    <li>Chamados</li>
                </div>
                
              
             
              
            </ul>
            <div class="headermenu">
            <button class="button notific btnmenu zoom" onclick="back()"><i class="lni lni-shift-left"></i></button>
        </div>
        </div>
        <!--FIM MENU LATERAL-->
      `;
    }
}

// Registrar o elemento personalizado
customElements.define('sub-menu-admin', SUBMENUADMIN);









function operador() {
    $(".menuinicial").hide();
    $("#homeop").show();
    $("#menuadmin, #menuenfer").hide();



}

function enfermeira() {
    $(".menuinicial").hide();
    $("#homeenfer").show();
    $("#menuop, #menuadmin").hide();

}

function admin() {
    $(".menuinicial").hide();
    $("#homeadmin").show();
    $("#menuop, #menuenfer").hide();

}

function autorizacao() {
    toast("Módulo Disponível Em Breve...", 2000)

}

function back() {
    $("#homeop, #homeadmin, #homeenfer").hide();
    $(".menuinicial").show();
    $(".content").hide()

    $(".optionPreencher").removeClass("active");

    $(".optionEnvReceita").removeClass("active");
    $(".optionTodosPacientes").removeClass("active");
    $(".optionHome").removeClass("active");
    $(".optionHomeEnfer").removeClass("active");
    $(".optionHomeadmin").removeClass("active");
    $(".optionChamados").removeClass("active");
    $(".optionPem").removeClass("active");
    $(".optionLogs").removeClass("active");
}