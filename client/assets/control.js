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
        toast('Por favor, preencha o campo de nome.', 2000)
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
                    <div id="div1">
                        <label for="nome">Nome do Paciente: *</label>
                        <input autocomplete="off" type="text" id="nome" name="nome" required>
                    </div>
                    <div id="div2">
                        <label for="regPaciente">Registro: *</label>
                        <input autocomplete="off" type="number" id="regPaciente" name="regPaciente" required>
                    </div>
                    <div id="div3">
                        <label for="idConversa">ID Conversa: *</label>
                        <input autocomplete="off" type="number" id="idConversa" name="idConversa" required>
                    </div>
                    <div id="div4">
                        <label for="idConversa">Telefone *</label>
                        <input autocomplete="off" type="number" id="idTelefone" name="idTelefone" required>
                    </div>
                    <div id="div5">
                        <label for="dataAgendamento">Data de Agendamento: *</label>
                        <input autocomplete="off" type="date" id="dataAgendamento" name="dataAgendamento" required>
                    </div>
                    <div id="div6">
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
                <div id="div7">
                        <label for="observacao">Observação: *</label>
                        <textarea id="observacao" name="observacao" required></textarea>
                    </div>
                    <div id="div8">
                        <label for="nomeExame">Exame: *</label>
                        <input type="text" id="nomeExame" name="nomeExame" required>
                    </div>
                    <div>
                        <div id="div9">
                            <label for="nomeOperador">Nome do Operador(a): *</label>
                            <input type="text" id="nomeOperador" name="nomeOperador" value="${localStorage.getItem("usuario")}" required>
                        </div>
                        <div id="div10">
                            <label for="dataAtual">Data Atual:</label>
                            <input autocomplete="off" disabled type="text" id="dataAtual" value="${moment().format('DD/MM/YYYY')}" name="dataAtual" required>
                        </div>
                        <div id="div11">
                            <label for="arquivo">Selecionar Arquivo: *</label>
                            <div id="customFile" class="custom-file">
                                <input type="file" id="arquivo" name="arquivo" required>
                                <label for="arquivo" id="customFileLabel"><i class="lni lni-cloud-upload"></i>Arraste e solte o arquivo aqui</label>
                            </div>
                        </div>
                        <br>
                        <div id="div12">
                            <input type="submit" value="Enviar">
                        </div>
                    </div>
            </form>
            </div>
        </div>
</main>
    `
    for (var i = 2; i <= 12; i++) {
        $('#div' + i).hide();
    }

    // Função para exibir a próxima div quando uma div é clicada
    $('[id^="div"]').click(function() {
        var divAtual = $(this);
        var proximaDivId = parseInt(divAtual.attr('id').substring(3)) + 1; // Obtém o número da próxima div
        var proximaDiv = $('#div' + proximaDivId);



        setTimeout(function() {
            proximaDiv.fadeIn('slow'); // Exibe a próxima div suavemente após 2 segundos
        }, 1500);
    });

    $('#dataAgendamento').change(function() {
        var dataAgendamento = $(this).val(); // Obtém a data selecionada no input
        var dataAtual = new Date(); // Obtém a data atual

        // Verifica se a data corresponde à data atual
        if (dataAgendamento === formatarData(dataAtual)) {
            toast("Não é Possivel Dessensibilizar o Paciente para Hoje!", 2000)
            setTimeout(() => {
                document.querySelector("#dataAgendamento").value = ''
            }, 1000);
        }
    });

    // Função para formatar a data no formato "YYYY-MM-DD"
    function formatarData(data) {
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();

        if (dia < 10) {
            dia = '0' + dia;
        }

        if (mes < 10) {
            mes = '0' + mes;
        }

        return ano + '-' + mes + '-' + dia;

    }

    // Evento para autocompletar ao selecionar uma data


    $(document).ready(function() {
        // Array de exemplo com os dados para o autocomplete
        var exames = [
            "RM CRANIO",
            "RM COL LOMB",
            "RM COL CERV",
            "RM COL TORAC",
            "RM BACIA SACRO",
            "RM ABD TOTAL",
            "RM ABD SUP",
            "RM PELVE (ABD INF)",
            "RM PE",
            "RM PERNA",
            "RM TORNOZELO",
            "RM JOELHO",
            "RM BACIA",
            "RM COXA",
            "RM TORAX",
            "COLANGIORM",
            "RM PESCOCO",
            "RM HIPOFISE",
            "ANGIO RM ART CRANIO",
            "ANGIO RM VEN CRANIO",
            "RM ATM",
            "RM FACE",
            "RM CORACAO",
            "RM BRACO",
            "RM MAO",
            "RM PUNHO",
            "RM OMBRO",
            "RM MEATOS",
            "ARTRO RM",
            //TC
            "TC PE",
            "TC TORNOZELO",
            "TC PERNA",
            "TC COXA",
            "TC QUADRIL",
            "TC COL LOMB",
            "TC COL CERV",
            "TC COL TORAC",
            "TC CRANIO",
            "TC PESCOCO",
            "TC TORAX",
            "TC ABD TOTAL",
            "TC PELVE",
            "TC ABD SUP",
            "ANGIO TC VEN TORAX",
            "ANGIO TC ART TORAX",

            // Adicione aqui os outros nomes de exame desejados
        ];

        // Inicializar o autocomplete
        $("#nomeExame").autocomplete({
            source: exames // Define o array de dados para o autocomplete
        });

        // Evento para autocompletar ao pressionar a seta para a direita
        $("#nomeExame").on("keydown", function(event) {
            if (event.keyCode === 39) { // Verifica se a tecla pressionada é a seta para a direita
                var valorAtual = $(this).val();
                var opcaoAutocompletar = exames.find(function(exame) {
                    return exame.toLowerCase().startsWith(valorAtual.toLowerCase());
                });

                if (opcaoAutocompletar) {
                    $(this).val(opcaoAutocompletar);
                }
            }
        });
    });

    firebase.firestore().collection("dessensibilizar").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {


            var pacientes = doc.data().nome




            // Inicializar o autocomplete
            $("#nome").autocomplete({
                source: pacientes // Define o array de dados para o autocomplete
            });

            // Evento para autocompletar ao pressionar a seta para a direita
            $("#nome").on("keydown", function(event) {
                if (event.keyCode === 39) { // Verifica se a tecla pressionada é a seta para a direita
                    var valorAtual = $(this).val();
                    var opcaoAutocompletar = pacientes.find(function(exame) {
                        return exame.toLowerCase().startsWith(valorAtual.toLowerCase());
                    });

                    if (opcaoAutocompletar) {
                        $(this).val(opcaoAutocompletar);
                    }
                }

            });
        });
    });
    firebase.firestore().collection("dessensibilizar").get().then((querySnapshot) => {
        var pacientes = []; // Inicializa o array vazio para armazenar os nomes dos pacientes

        querySnapshot.forEach((doc) => {
            var nome = doc.data().nome; // Obtém o nome do paciente do documento
            pacientes.push(nome); // Adiciona o nome do paciente ao array de pacientes
        });

        // Inicializar o autocomplete
        $("#nome").autocomplete({
            source: pacientes // Define o array de dados para o autocomplete
        });
        $(document).ready(function() {
            $('#nome').on('input', function() {
                var valorNome = $(this).val().toUpperCase();
                $(this).val(valorNome);
            });
        });

        // Evento para autocompletar ao pressionar a seta para a direita
        $("#nome").on("keydown", function(event) {
            if (event.keyCode === 39) { // Verifica se a tecla pressionada é a seta para a direita
                var valorAtual = $(this).val();
                var opcaoAutocompletar = pacientes.find(function(paciente) {
                    return paciente.toLowerCase().startsWith(valorAtual.toLowerCase());
                });

                if (opcaoAutocompletar) {
                    $(this).val(opcaoAutocompletar);
                }
            }
        });
    });
    firebase.firestore().collection("dessensibilizar").get().then((querySnapshot) => {
        var pacientes = []; // Inicializa o array vazio para armazenar os nomes dos pacientes

        querySnapshot.forEach((doc) => {
            var nome = doc.data().nome; // Obtém o nome do paciente do documento
            pacientes.push(nome); // Adiciona o nome do paciente ao array de pacientes
        });

        // Inicializar o autocomplete
        $("#nome").autocomplete({
            source: pacientes // Define o array de dados para o autocomplete
        });

        // Evento para autocompletar ao pressionar a seta para a direita
        $("#nome").on("keydown", function(event) {
            if (event.keyCode === 39) { // Verifica se a tecla pressionada é a seta para a direita
                var valorAtual = $(this).val();
                var opcaoAutocompletar = pacientes.find(function(paciente) {
                    return paciente.toLowerCase().startsWith(valorAtual.toLowerCase());
                });

                if (opcaoAutocompletar) {
                    $(this).val(opcaoAutocompletar);
                }
            }
        });
    });


    firebase.firestore().collection("dessensibilizar").get().then((querySnapshot) => {
        var pacientes = []; // Inicializa o array vazio para armazenar os nomes dos pacientes

        querySnapshot.forEach((doc) => {
            var nome = doc.data().nome; // Obtém o nome do paciente do documento
            var regPaciente = doc.data().regPaciente;

            var observacao = doc.data().observacao // Obtém o registro do paciente do documento
            pacientes.push(nome); // Adiciona o nome do paciente ao array de pacientes

            // Evento de alteração para verificar o valor do campo #nome
            $("#nome").on("input", function() {
                var valorNome = $(this).val();

                if (valorNome == nome) {

                    $("#regPaciente").val(regPaciente);
                    $("#idTelefone").val(doc.data().telefone);
                    $("#observacao").val(observacao); // Atribui o valor de regPaciente ao campo #regPaciente.value
                }
            });
        });

        // Inicializar o autocomplete
        $("#nome").autocomplete({
            source: pacientes // Define o array de dados para o autocomplete
        });

        // Evento para autocompletar ao pressionar a seta para a direita
        $("#nome").on("keydown", function(event) {
            if (event.keyCode === 39) { // Verifica se a tecla pressionada é a seta para a direita
                var valorAtual = $(this).val();
                var opcaoAutocompletar = pacientes.find(function(paciente) {
                    return paciente.toLowerCase().startsWith(valorAtual.toLowerCase());
                });

                if (opcaoAutocompletar) {
                    $(this).val(opcaoAutocompletar);
                }
            }
        });
    });



    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowString = tomorrow.toISOString().split('T')[0];
    document.getElementById("dataAgendamento").setAttribute("min", tomorrowString);

    // Defina as palavras-chave que acionarão os alertas
    var palavrasChave = ["agonia", "extrapiramidal", ];

    // Adicione o evento input ao campo de texto
    $("#observacao").on("input", function() {
        var texto = $(this).val();

        // Verifique se alguma palavra-chave está presente no texto digitado
        palavrasChave.forEach(function(palavra) {
            if (texto.includes(palavra)) {
                toast("Reação: " + palavra + ". É possível que não seja necessario dessensibiliza-la. ", 8000); // Exibe o alerta com a palavra-chave
            }
        });
    });


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
      <th>Exame</th>
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
                var exame = $("<td></td>").text(doc.data().exame);
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

                tableRow.append(nameCell, exame, conditionCell, medicationCell, optionsCell);
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
            var exame = $("<td></td>").text(doc.data().exame);
            var dataagend = $("<td></td>").text(doc.data().dataAgendamento);
            var conditionCell = $("<td></td>").text(doc.data().demandaPaciente);
            var medicationCell = $("<td></td>").text(doc.data().observacao);
            var nomeOpe = $("<td></td>").text(doc.data().nomeOperador);

            var optionsCell = $("<td></td>").append($("<button></button>").addClass("btnacao zoom").text("Ver Mais").click(function() {
                toast("Gerando dados...", 500)
                document.querySelector(".submenu").style.filter = 'blur(3px)'
                setTimeout(() => {

                    document.querySelector("#modalchamado").innerHTML = `
           
                    <div class="modalcontent">
                    <h2>Escolha uma opção</h2>
                    <button type="button" class="buttonenv" onclick="alterarNome('${doc.data().nome}', '${doc.id}')">Alterar Nome</button>


                    <button type="button" class="buttonenv" onclick="alterarExame('${doc.data().exame}', '${doc.id}')">Alterar Exame</button>
                    <button type="button" class="buttonenv" onclick="alterarDemanda('${doc.data().demandaPaciente}', '${doc.id}')">Alterar Demanda</button>
                    <button type="button" class="buttonenv" onclick="alterarObservacao('${doc.data().observacao}', '${doc.id}')">Alterar Observação</button>
                    <button type="button" class="buttonenv" onclick="excluirPaciente('${doc.data().nome}', '${doc.id}')">Excluir Paciente</button>
                    
                    <button type="button" class="buttonenv" onclick="abrirChamado()">Abrir Chamado</button>
                    <button class="buttonenv" type="button" onclick="document.querySelector('#modalchamado').style.display = 'none'; document.querySelector('.submenu').style.filter = 'blur(0px)'">Fechar</button>

                </div>
                
           
                `


                    document.querySelector("#modalchamado").style.display = 'block'
                }, 600);
            }));


            tableRow.append(nameCell, exame, dataagend, conditionCell, medicationCell, nomeOpe, optionsCell);
            $("#tabletodospacientes").append(tableRow);


        });
    });
    document.querySelector(".content").innerHTML = `

    <table class="tabela">
    <input type="search" class="inputsearch" oninput="searchtodospacientes()" placeholder="Procure aqui...">
  <thead>
    <tr>
      <th>Paciente</th>
      <th>Exame</th>
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
      <th>Exame</th>
      <th>Demanda</th>
      <th>Observação</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody id="pacientesparaenviar">
   
  </tbody>
</table>
    `

    firebase.firestore().collection("dessensibilizar").where("status", "==", 'Envio Pendente')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {


                var tableRow = $("<tr></tr>");
                var nameCell = $("<td></td>").text(doc.data().nome);
                var exame = $("<td></td>").text(doc.data().exame);
                var conditionCell = $("<td></td>").text(doc.data().demandaPaciente);
                var medicationCell = $("<td></td>").text(doc.data().observacao);
                var button = $("<td><button></button></td>").text("Enviar").addClass("buttonenv");

                button.click(function() {
                    toast("Gerando Pagina...", 2000)
                    setTimeout(() => {
                        var novaAba = window.open();
                        novaAba.opener = null;
                        novaAba.location = './enviar.html#' + doc.id
                    }, 1000);
                });





                var optionsCell = $("<td></td>").append(button);

                tableRow.append(nameCell, exame, conditionCell, medicationCell, optionsCell);
                $("#pacientesparaenviar").append(tableRow);

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


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

    document.querySelector(".submenu").style.filter = 'blur(0px)'
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

    $(document).ready(function() {

        var audio = $("#Audio")[0]; // Obtém o elemento de áudio
        audio.volume = 0.1

        audio.play();

    });

    setTimeout(function() {
        toastContainer.remove();
    }, time);
}



function alterarNome(nome, docid) {
    const formHTML = `
        <form onsubmit="enviarFormulario(event, '${docid}')" class="conteudomodal">
            <h1 style="color: white;">Alterar Nome</h1>
            <input id="novoNomeInput" value="${nome}" placeholder="Digite o novo nome">
            <button class="buttonenv" type="submit">Enviar</button>
            <button class="buttonenv" type="button" onclick="fecharModal()">Fechar</button>
        </form>
    `;
    document.querySelector("#modalchamado").innerHTML = formHTML;
}

function enviarFormulario(event, docid) {
    event.preventDefault(); // Impede o envio do formulário padrão
    const novoNome = document.querySelector("#novoNomeInput").value;

    // Atualiza o nome no documento com o ID docid na pasta "dessensibilizar" do Firebase Cloud Firestore
    firebase.firestore().collection("dessensibilizar").doc(docid).update({
            nome: novoNome
        })
        .then(() => {
            toast("Nome Atualizado Com Sucesso!", 2000)
            fecharModal(); // Fecha o modal após atualizar o nome
            optionTodosPacientes()
        })
        .catch((error) => {
            console.error("Erro ao atualizar o nome:", error);
        });
}

function fecharModal() {
    document.querySelector("#modalchamado").style.display = "none";
    document.querySelector(".submenu").style.filter = "blur(0px)";
}

function alterarExame(exame, docid) {
    const formHTML = `
        <form onsubmit="enviarFormularioExame(event, '${docid}')" class="conteudomodal">
            <h1 style="color: white;">Alterar Exame</h1>
            <input id="novoExameInput" value="${exame}" placeholder="Digite o novo exame">
            <button class="buttonenv" type="submit">Enviar</button>
            <button class="buttonenv" type="button" onclick="fecharModal()">Fechar</button>
        </form>
    `;
    document.querySelector("#modalchamado").innerHTML = formHTML;
}

function enviarFormularioExame(event, docid) {
    event.preventDefault(); // Impede o envio do formulário padrão
    const novoExame = document.querySelector("#novoExameInput").value;

    // Atualiza o exame no documento com o ID docid na pasta "dessensibilizar" do Firebase Cloud Firestore
    firebase.firestore().collection("dessensibilizar").doc(docid).update({
            exame: novoExame
        })
        .then(() => {
            toast("Exame Atualizado Com Sucesso!", 2000);
            fecharModal(); // Fecha o modal após atualizar o nome
            optionTodosPacientes();
        })
        .catch((error) => {
            console.error("Erro ao atualizar o exame:", error);
        });
}

function alterarDemanda(demanda, docid) {
    const formHTML = `
        <form onsubmit="enviarFormularioDemanda(event, '${docid}')" class="conteudomodal">
            <h1 style="color: white;">Alterar Demanda</h1>
            <input id="novaDemandaInput" value="${demanda}" placeholder="Digite a nova demanda">
            <button class="buttonenv" type="submit">Enviar</button>
            <button class="buttonenv" type="button" onclick="fecharModal()">Fechar</button>
        </form>
    `;
    document.querySelector("#modalchamado").innerHTML = formHTML;
}

function enviarFormularioDemanda(event, docid) {
    event.preventDefault(); // Impede o envio do formulário padrão
    const novaDemanda = document.querySelector("#novaDemandaInput").value;

    // Atualiza a demanda no documento com o ID docid na pasta "dessensibilizar" do Firebase Cloud Firestore
    firebase.firestore().collection("dessensibilizar").doc(docid).update({
            demanda: novaDemanda
        })
        .then(() => {
            toast("Demanda Atualizada Com Sucesso!", 2000);
            fecharModal(); // Fecha o modal após atualizar o nome
            optionTodosPacientes();
        })
        .catch((error) => {
            console.error("Erro ao atualizar a demanda:", error);
        });
}

function fecharModal() {
    document.querySelector("#modalchamado").style.display = "none";
    document.querySelector(".submenu").style.filter = "blur(0px)";
}

function alterarObservacao(observacao, docid) {
    const formHTML = `
        <form onsubmit="enviarFormularioObservacao(event, '${docid}')" class="conteudomodal">
            <h1 style="color: white;">Alterar Observação</h1>
            <input id="novaObservacaoInput" value="${observacao}" placeholder="Digite a nova observação">
            <button class="buttonenv" type="submit">Enviar</button>
            <button class="buttonenv" type="button" onclick="fecharModal()">Fechar</button>
        </form>
    `;
    document.querySelector("#modalchamado").innerHTML = formHTML;
}

function enviarFormularioObservacao(event, docid) {
    event.preventDefault(); // Impede o envio do formulário padrão
    const novaObservacao = document.querySelector("#novaObservacaoInput").value;

    // Atualiza a observação no documento com o ID docid na pasta "dessensibilizar" do Firebase Cloud Firestore
    firebase.firestore().collection("dessensibilizar").doc(docid).update({
            observacao: novaObservacao
        })
        .then(() => {
            toast("Observação Atualizada Com Sucesso!", 2000);
            fecharModal(); // Fecha o modal após atualizar a observação
            optionTodosPacientes();
        })
        .catch((error) => {
            console.error("Erro ao atualizar a observação:", error);
        });
}

function excluirPaciente(nome, docid) {
    const formHTML = `
        <form onsubmit="" class="conteudomodal">
            <h1 style="color: white;">Excluir Paciente</h1>
            <p>Deseja realmente excluir o paciente ${nome}?</p>
            <button class="buttonenv" type="button" onclick="excluirPacienteFirestore('${docid}')">Excluir Paciente</button>
            <button class="buttonenv" type="button" onclick="fecharModal()">Fechar</button>
        </form>
    `;
    document.querySelector("#modalchamado").innerHTML = formHTML;
}

function excluirPacienteFirestore(docid) {
    // Apaga o documento com o ID docid na pasta "dessensibilizar" do Firebase Cloud Firestore
    firebase.firestore().collection("dessensibilizar").doc(docid).delete()
        .then(() => {
            toast("Paciente excluído com sucesso!", 2000);
            fecharModal(); // Fecha o modal após excluir o paciente
            optionTodosPacientes();
        })
        .catch((error) => {
            console.error("Erro ao excluir o paciente:", error);
        });
}

function fecharModal() {
    document.querySelector("#modalchamado").style.display = "none";
    document.querySelector(".submenu").style.filter = "blur(0px)";
}



function abrirChamado() {
    // Lógica para abrir um chamado
}

function closemodalchamado() {
    // Lógica para fechar o modal
}