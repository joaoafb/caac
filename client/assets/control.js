document.addEventListener("DOMContentLoaded", function() {

    if (localStorage.getItem("pass") == null) {
        modallogin()
    } else {

    }
});

function submitName() {
    var nameInput = document.getElementById("nameInput");
    var name = nameInput.value.trim();
    var passInput = document.getElementById("inputsenha");
    var pass = passInput.value.trim();

    if (name !== "") {
        localStorage.setItem("usuario", name);
        localStorage.setItem("pass", pass);
        closeModal();
    } else {
        // Exiba uma mensagem de erro ou tome alguma outra ação se o campo estiver vazio
        alert("Por favor, preencha o campo de nome.");
    }
}

function optionHome() {
    $(".content").show()
    $(".optionHome").addClass("active");


    $(".optionEnvReceita").removeClass("active");
    $(".optionPreencher").removeClass("active");
    $(".optionTodosPacientes").removeClass("active");
    $(".optionCriarReceita").removeClass("active");
    document.querySelector(".content").innerHTML = ` 
    <div class="contentinfor">
    <h2>Operador</h2>
    <p>O operador tem as seguintes permissões:</p>
    <ul>
      <li>Pode ver todos os pacientes dessensibilizados;</li>
      <li>Pode preencher dessensibilização;</li>
      <li>Pode ver todas as receitas e encaminhá-las aos pacientes.</li>
    </ul>
    
</div>
    `
}

function optionHomeadmin() {

    $(".optionHomeadmin").addClass("active");

    $(".optionLogs").removeClass("active");
    $(".optionPem").removeClass("active");
    $(".optionChamados").removeClass("active");


    $(".content").show()
    document.querySelector(".content").innerHTML = ` 
    <div class="contentinfor">
    <h2>Admin</h2>
  <p>O administrador tem as seguintes permissões:</p>
  <ul>
    <li>Pode preencher dessensibilização;</li>
    <li>Pode ver todos os pacientes;</li>
    <li>Pode enviar receitas para pacientes;</li>
    <li>Pode enviar receitas para o sistema;</li>
    <li>Pode ver logs de todas as ações feitas no sistema;</li>
    <li>Pode alterar permissões de usuários;</li>
    <li>Pode ver chamados abertos no sistema para melhoria do mesmo (tanto técnica quanto em relação aos pacientes).</li>
  </ul>
    </div>
    `
}

function optionHomeEnfer() {
    $(".optionHomeEnfer").addClass("active");



    $(".optionEnvReceita").removeClass("active");
    $(".optionPreencher").removeClass("active");
    $(".optionTodosPacientes").removeClass("active");
    $(".optionCriarReceita").removeClass("active");
    $(".content").show()
    document.querySelector(".content").innerHTML = ` 
    <div class="contentinfor">
    <h2>Enfermeira</h2>
  <p>A(o) enfermeira(o) tem as seguintes permissões:</p>
  <ul>
    <li>Pode enviar receitas para o sistema;</li>
    <li>Pode ver todos os pacientes dessensibilizados;</li>
    <li>Pode preencher dessensibilização.</li>
  </ul></div>
    
    `
}

function optionPreencher() {
    $(".optionPreencher").addClass("active");

    $(".optionEnvReceita").removeClass("active");
    $(".optionTodosPacientes").removeClass("active");
    $(".optionHome").removeClass("active");
    $(".optionHomeEnfer").removeClass("active");
    $(".optionCriarReceita").removeClass("active");

    $(".content").show()
    document.querySelector(".content").innerHTML = `
    
    <main class="menu" id="formulario">
    <div>
        <div class="modal-contentdessen">
            <form id="formulario" onsubmit="enviar();return false;">
                <div class="form-column">
                    <div>
                        <label for="nome">Nome do Paciente: *</label>
                        <input autocomplete="off" type="text" id="nome" name="nome" required>
                    </div>
                    <div>
                        <label for="regPaciente">Registro: *</label>
                        <input autocomplete="off" type="number" id="regPaciente" name="regPaciente" required>
                    </div>
                    <div>
                        <label for="idConversa">ID Conversa: *</label>
                        <input autocomplete="off" type="number" id="idConversa" name="idConversa" required>
                    </div>
                    <div>
                        <label for="idConversa">Telefone *</label>
                        <input autocomplete="off" type="number" id="idTelefone" name="idTelefone" required>
                    </div>
                    <div>
                        <label for="dataAgendamento">Data de Agendamento: *</label>
                        <input autocomplete="off" type="date" id="dataAgendamento" name="dataAgendamento" required>
                    </div>
                    <div>
                        <label for="demandaPaciente">Demanda do Paciente: *</label>
                        <select id="demandaPaciente" name="demandaPaciente" required>
                      <option value="escolha" disabled selected>Escolha</option>
                      <option value="Alérgico(a)">Alergico</option>
                      <option value="Asmático(a)">Asmático</option>
                      <option value="Asmático(a) e Alérgico(a)">Asmático e Alergico</option>
                      <option value="Outros">Outros...</option>
                   </select>
                    </div>
                    
                </div>
                <div class="form-column">
                <div>
                        <label for="observacao">Observação: *</label>
                        <textarea id="observacao" name="observacao" required></textarea>
                    </div>
                    <div>
                        <label for="nomeExame">Exame: *</label>
                        <input type="text" id="nomeExame" name="nomeExame" required>
                    </div>
                    <div>
                        <div>
                            <label for="nomeOperador">Nome do Operador(a): *</label>
                            <input type="text" id="nomeOperador" name="nomeOperador" value="${localStorage.getItem("usuario")}" required>
                        </div>
                        <div>
                            <label for="dataAtual">Data Atual:</label>
                            <input autocomplete="off" type="text" id="dataAtual" value="${moment().format('DD/MM/YYYY')}" name="dataAtual" required>
                        </div>
                        <div>
                            <label for="arquivo">Selecionar Arquivo: *</label>
                            <div id="customFile" class="custom-file">
                                <input type="file" id="arquivo" name="arquivo" required>
                                <label for="arquivo" id="customFileLabel"><i class="lni lni-cloud-upload"></i>Arraste e solte o arquivo aqui</label>
                            </div>
                        </div>
                        <br>
                        <div>
                            <input type="submit" value="Enviar">
                        </div>
                    </div>
            </form>
            </div>
        </div>
</main>
    `
}

function optionCriarReceita() {
    $(".optionCriarReceita").addClass("active");
    $(".optionHomeEnfer").removeClass("active");
    $(".optionTodosPacientes").removeClass("active");
    $(".optionPreencher").removeClass("active");

    $(".content").show()
    document.querySelector(".content").innerHTML = `
    <table>
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody id="pagecriarreceitas">  


  </tbody>
</table>
    `
    firebase.firestore().collection("dessensibilizar").where("status", "==", 'pendente')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {


                var tableRow = $("<tr></tr>");
                var nameCell = $("<td></td>").text(doc.data().nome);
                var conditionCell = $("<td></td>").text(doc.data().demandaPaciente);
                var medicationCell = $("<td></td>").text(doc.data().observacao);
                var button = $("<td><button></button></td>").text("Menu").addClass("buttonenv");

                button.click(function() {
                    toast("Gerando Pagina...", 2000)
                    setTimeout(() => {
                        var novaAba = window.open();
                        novaAba.opener = null;
                        novaAba.location = './receita.html#' + doc.id
                    }, 1000);
                });





                var optionsCell = $("<td></td>").append(button);

                tableRow.append(nameCell, conditionCell, medicationCell, optionsCell);
                $("#pagecriarreceitas").append(tableRow);

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}

function optionTodosPacientes() {
    $(".optionTodosPacientes").addClass("active");


    $(".optionEnvReceita").removeClass("active");
    $(".optionPreencher").removeClass("active");
    $(".optionHome").removeClass("active");
    $(".optionHomeEnfer").removeClass("active");
    $(".optionCriarReceita").removeClass("active");
    $(".content").show()

    firebase.firestore().collection("dessensibilizar").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var tableRow = $("<tr></tr>");
            var nameCell = $("<td></td>").text(doc.data().nome);
            var dataagend = $("<td></td>").text(doc.data().dataAgendamento);
            var conditionCell = $("<td></td>").text(doc.data().demandaPaciente);
            var medicationCell = $("<td></td>").text(doc.data().observacao);
            var nomeOpe = $("<td></td>").text(doc.data().nomeOperador);
            var optionsCell = $("<td></td>").append($("<button></button>").addClass("btnacao zoom").text("Abrir Chamado").click(function() {
                document.querySelector("#modalchamado").style.display = 'block'
            }));


            tableRow.append(nameCell, dataagend, conditionCell, medicationCell, nomeOpe, optionsCell);
            $("#tabletodospacientes").append(tableRow);


        });
    });
    document.querySelector(".content").innerHTML = `

    <table>
    <input type="search" class="inputsearch" oninput="searchtodospacientes()" placeholder="Procure aqui...">
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Agendado</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Responsável</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody id="tabletodospacientes">
  
  </tbody>
</table>
    `
}

function optionEnvReceita() {
    $(".optionEnvReceita").addClass("active");



    $(".optionTodosPacientes").removeClass("active");
    $(".optionPreencher").removeClass("active");
    $(".optionHome").removeClass("active");

    $(".content").show()
    document.querySelector(".content").innerHTML = `
    <table>
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>John Doe</td>
      <td>Alérgico</td>
      <td>Plasil == coceira</td>
      <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
  </tbody>
</table>
    `
}

function optionLogs() {
    $(".optionLogs").addClass("active");


    $(".optionHomeadmin").removeClass("active");
    $(".optionPem").removeClass("active");
    $(".optionChamados").removeClass("active");

    $(".content").show()
    document.querySelector(".content").innerHTML = `
    <table>
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>John Doe</td>
      <td>Alérgico</td>
      <td>Plasil == coceira</td>
      <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
  </tbody>
</table>
    `
}

function optionPem() {
    $(".optionPem").addClass("active");
    $(".optionLogs").removeClass("active");
    $(".optionHomeadmin").removeClass("active");

    $(".optionChamados").removeClass("active");
    $(".content").show()
    document.querySelector(".content").innerHTML = `
    <table>
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>John Doe</td>
      <td>Alérgico</td>
      <td>Plasil == coceira</td>
      <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
  </tbody>
</table>
    `
}

function optionChamados() {
    $(".optionChamados").addClass("active");
    $(".optionLogs").removeClass("active");
    $(".optionHomeadmin").removeClass("active");
    $(".optionPem").removeClass("active");

    $(".content").show()
    document.querySelector(".content").innerHTML = `
    <table>
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>John Doe</td>
      <td>Alérgico</td>
      <td>Plasil == coceira</td>
      <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
    <tr>
    <td>John Doe</td>
    <td>Alérgico</td>
    <td>Plasil == coceira</td>
    <td><button class="btnacao zoom">Opções</button></td>
    </tr>
  </tbody>
</table>
    `
}


function searchtodospacientes() {
    var input = document.querySelector('.inputsearch');
    var filter = input.value.toUpperCase();
    var table = document.querySelector('#tabletodospacientes');
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var rowData = rows[i].getElementsByTagName('td');
        var found = false;

        for (var j = 0; j < rowData.length; j++) {
            var cellData = rowData[j];

            if (cellData) {
                if (cellData.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }

        if (found || rows[i].querySelector('th')) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}


function closemodalchamado() {
    document.querySelector("#modalchamado").style.display = 'none'
}

function salvarChamado() {
    var descricao = document.querySelector('#inputchamado').value;
    var dataHora = moment().format("YYYY-MM-DD HH:mm:ss");
    var email = localStorage.getItem('email');
    var usuario = localStorage.getItem('usuario');

    firebase.firestore().collection('chamados').add({
            descricao: descricao,
            dataHora: dataHora,
            email: email,
            usuario: usuario
        })
        .then(function(docRef) {
            closemodalchamado()
            toast('Chamado Aberto!', 2000)
        })
        .catch(function(error) {
            console.error("Erro ao salvar o chamado: ", error);
        });
}

function toast(message, time) {
    var toastContainer = $("<div></div>").addClass("toast-container position-fixed bottom-0 end-0 p-3");
    var toast = $("<div></div>").addClass("toast").attr("id", "liveToast").attr("role", "alert").attr("aria-live", "assertive").attr("aria-atomic", "true");
    var toastHeader = $("<div></div>").addClass("toast-header");

    var toastStrong = $("<strong></strong>").addClass("me-auto").text("Plataforma");

    var toastButton = $("<button></button>").addClass("btn-close").attr("type", "button").attr("data-bs-dismiss", "toast").attr("aria-label", "Close");
    var toastBody = $("<div></div>").addClass("toast-body").text(message);

    toastHeader.append(toastStrong, toastButton);
    toast.append(toastHeader, toastBody);
    toastContainer.append(toast);

    $("body").append(toastContainer);
    $(".toast").toast("show");

    setTimeout(function() {
        toastContainer.remove();
    }, time);
}