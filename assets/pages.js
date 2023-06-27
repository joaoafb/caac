function inicioadmin() {
    document.querySelector("#pagelogs").style.display = 'none';
    document.querySelector("#usercad").style.display = 'none';
    document.querySelector("#altpem").style.display = 'none';
    document.querySelector("#chamados").style.display = 'none';
}

function verLogs() {
    document.querySelector("#pagelogs").style.display = 'flex';
    document.querySelector("#usercad").style.display = 'none';
    document.querySelector("#altpem").style.display = 'none';
    document.querySelector("#chamados").style.display = 'none';

    // MENU
    document.querySelector("#opverlogs").classList.add("active");
    document.querySelector("#opusercad").classList.remove("active");
    document.querySelector("#opalt").classList.remove("active");
    document.querySelector("#opchamados").classList.remove("active");


    // Obtenha uma referência à coleção "logs"
    var logsCollection = firebase.firestore().collection('logs');

    // Obtenha uma referência ao elemento da tabela
    var table = document.getElementById('logsTable');
    // Defina estilos CSS para tornar a tabela menor e adicionar uma barra de rolagem
    table.style.width = '400px'; // Defina a largura desejada
    table.style.height = '200px'; // Defina a altura desejada
    table.style.overflow = 'auto';
    // Crie o cabeçalho da tabela
    var headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Usuário</th><th>Ação</th><th>Paciente</th>';
    table.appendChild(headerRow);

    // Obtenha os dados da coleção "logs"
    logsCollection.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // Obtenha os dados do documento
                var data = doc.data();
                var usuario = data.usuario;
                var acao = data.acao;

                var paciente = data.nome

                // Crie uma nova linha na tabela com os dados do documento
                var row = document.createElement('tr');
                row.innerHTML = '<td>' + usuario + '</td><td>' + acao + '</td><td>' + paciente + '</td>';
                table.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error('Erro ao obter os dados:', error);
        });




}

function userCadFunc() {
    // MENU
    document.querySelector("#opusercad").classList.add("active");
    document.querySelector("#opverlogs").classList.remove("active");
    document.querySelector("#opalt").classList.remove("active");
    document.querySelector("#opchamados").classList.remove("active");

    document.querySelector("#usercad").style.display = 'flex';
    document.querySelector("#pagelogs").style.display = 'none';
    document.querySelector("#altpem").style.display = 'none';
    document.querySelector("#chamados").style.display = 'none';
}

function altPemFunc() {
    // MENU



    document.querySelector("#opalt").classList.add("active");
    document.querySelector("#opverlogs").classList.remove("active");
    document.querySelector("#opusercad").classList.remove("active");
    document.querySelector("#opchamados").classList.remove("active");

    document.querySelector("#altpem").style.display = 'flex';
    document.querySelector("#pagelogs").style.display = 'none';
    document.querySelector("#usercad").style.display = 'none';
    document.querySelector("#chamados").style.display = 'none';
    document.querySelector("#altpem").innerHTML = ''
    const button = document.createElement("button")
    button.className = 'buttonenv'
    button.textContent = 'Adicionar Novo Usuario'
    document.querySelector("#altpem").appendChild(button)
    button.onclick = function() {
        document.querySelector("#modaladd").style.display = 'block'
            // Obtenha uma referência à coleção "admin"
        var adminCollection = firebase.firestore().collection('admin');

        // Adicione um evento de clique ao botão de envio do formulário
        document.getElementById('formpem').addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtenha os valores dos campos de entrada
            var nome = document.getElementById('inputnome').value;
            var permissao = document.getElementById('inputpermissao').value;

            // Crie um objeto com os dados do formulário
            var formData = {
                senha: nome,
                pem: permissao
            };

            // Adicione os dados ao Firebase
            adminCollection.add(formData)
                .then(function(docRef) {
                    document.querySelector("#modaladd").style.display = 'none'
                    document.querySelector("#altpem table").innerHTML = ''
                    altPemFunc()
                })
                .catch(function(error) {
                    console.error('Erro ao enviar os dados:', error);
                });
        });

    }
    var table = document.createElement("table");




    var thAcoes = document.createElement("th");
    var tbody = document.createElement("tbody");
    thAcoes.textContent = "";

    firebase.firestore().collection("admin").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Cria a tabela


            // Cria o corpo da tabela

            var trBody = document.createElement("tr");

            // Cria os campos de entrada
            var inputUsuario = document.createElement("input");
            inputUsuario.setAttribute("type", "text");
            inputUsuario.setAttribute("id", "usuario");
            inputUsuario.setAttribute("value", doc.data().senha);


            var inputPermissao = document.createElement("input");
            inputPermissao.setAttribute("type", "text");
            inputPermissao.setAttribute("id", "permissao");
            inputPermissao.setAttribute("value", doc.data().pem);


            // Cria o botão de salvar
            var buttonSalvar = document.createElement("button");
            buttonSalvar.setAttribute("id", "salvar");
            buttonSalvar.className = 'buttonenv'
            buttonSalvar.textContent = "Salvar";

            buttonSalvar.onclick = function() {
                firebase.firestore().collection("admin").doc(doc.id).update({
                        senha: inputUsuario.value,
                        pem: inputPermissao.value
                    })
                    .then(() => {
                        modal("Permissão Alterada!", 1500)
                        setTimeout(() => {
                            altPemFunc()
                        }, 1600);
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }

            var buttonex = document.createElement("button");
            buttonex.setAttribute("id", "excluir");
            buttonex.style.height = '50px'
            buttonex.className = 'excluir zoom'

            buttonex.textContent = "Excluir";
            buttonex.onclick = function() {
                firebase.firestore().collection("admin").doc(doc.id).delete().then(() => {
                    modal("Usuario Excluido!", 2000)
                    setTimeout(() => {
                        altPemFunc()
                    }, 2000);
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }

            // Adiciona os campos de entrada e o botão à linha do corpo da tabela
            trBody.appendChild(inputUsuario);
            trBody.appendChild(inputPermissao);
            trBody.appendChild(buttonSalvar);
            trBody.appendChild(buttonex);
            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(trBody);
            table.appendChild(tbody);

            // Adiciona a tabela ao contêiner no HTML


        });
    });
    var tableContainer = document.getElementById("altpem");
    tableContainer.appendChild(table);

}

function chamadosFunc() {
    // MENU
    document.querySelector("#opchamados").classList.add("active");
    document.querySelector("#opverlogs").classList.remove("active");
    document.querySelector("#opusercad").classList.remove("active");
    document.querySelector("#opalt").classList.remove("active");
    document.querySelector("#chamados").innerHTML = ''
    document.querySelector("#chamados").style.display = 'flex';
    document.querySelector("#pagelogs").style.display = 'none';
    document.querySelector("#usercad").style.display = 'none';
    document.querySelector("#altpem").style.display = 'none';

    firebase.firestore().collection("chamados").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            // Criar elemento <div> com a classe "card"
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            // Criar elemento <h1> para o título
            const titleH1 = document.createElement("h1");
            titleH1.textContent = doc.data().motivo

            // Criar elementos <p> para os detalhes
            const motivoP = document.createElement("p");
            motivoP.textContent = doc.data().descricao

            const responsavelP = document.createElement("p");
            responsavelP.textContent = doc.data().usuarios

            const pacienteP = document.createElement("p");
            pacienteP.textContent = doc.data().paciente

            const dataP = document.createElement("p");
            dataP.textContent = doc.data().dataehora



            // Verificar o status
            if (doc.data().status === "Pendente") {
                // Criar botão "Resolvido"
                const resolvidoButton = document.createElement("button");
                resolvidoButton.className = "buttonenv";
                resolvidoButton.textContent = "Resolvido";

                flexDiv.appendChild(resolvidoButton);

                resolvidoButton.onclick = function() {
                    firebase.firestore().collection("chamados").doc(doc.id).update({
                            status: 'Resolvido'
                        })
                        .then(() => {
                            setTimeout(() => {
                                chamadosFunc()
                            }, 1000);
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            }
            // Criar elemento <div> com a classe "flex row" para os botões
            const flexDiv = document.createElement("div");
            flexDiv.className = "flex row";
            const Button = document.createElement("button");
            Button.className = "buttonenv excluir";
            Button.textContent = "Excluir";
            Button.onclick = function() {
                firebase.firestore().collection("chamados").doc(doc.id).delete().then(() => {
                    modal("Chamado Excluido.", 2000)
                    setTimeout(() => {
                        chamadosFunc()
                    }, 2100);
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }

            flexDiv.appendChild(Button);
            // Adicionar todos os elementos criados ao elemento <div> principal
            cardDiv.appendChild(titleH1);
            cardDiv.appendChild(motivoP);
            cardDiv.appendChild(responsavelP);
            cardDiv.appendChild(pacienteP);
            cardDiv.appendChild(dataP);
            cardDiv.appendChild(flexDiv);

            // Adicionar o elemento <div> ao documento
            document.querySelector("#chamados").appendChild(cardDiv);

        });
    });

}


function closemodal() {
    document.querySelector("page-modal").style.display = 'none'
}