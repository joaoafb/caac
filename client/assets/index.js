//VERIFICAR SE USUARIO ESTA LOGADO
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        localStorage.setItem("email", user.email)

    } else {

        console.log("Usuário não está logado.");
        window.location.href = "./login.html";
    }
});

//VERIFICAR USUARIO LOCAL
window.onload = function() {
    var data = localStorage.getItem("usuario");

    if (!data) {
        document.getElementById("myModal").style.display = "block";
    } else {
        document.querySelector("#nameop").innerHTML = '| ' + localStorage.getItem("usuario")
    }
}








//SUBMENU
function inicio() {

    document.querySelector("#inicio").style.display = 'flex'
    document.querySelector("#formulario").style.display = 'none'
    document.querySelector("#btninicio").classList.add("active")
    document.querySelector("#btnpreencher").classList.remove("active")
    document.querySelector("#btnreceita").classList.remove("active")
    document.querySelector("#pagereceitas").style.display = 'none'
    document.querySelector("#pagetodos").style.display = 'none'
    document.querySelector("#btntodos").classList.remove("active")
    document.querySelector("#pageenvreceita").style.display = 'none'

    document.querySelector("#btnenvreceita").classList.remove("active")
}

function preencher() {
    document.querySelector("#inicio").style.display = 'none'
    document.querySelector("#formulario").style.display = 'flex'
    document.querySelector("#btninicio").classList.remove("active")
    document.querySelector("#btnpreencher").classList.add("active")
    document.querySelector("#btnreceita").classList.remove("active")
    document.querySelector("#pagereceitas").style.display = 'none'
    document.querySelector("#pagetodos").style.display = 'none'
    document.querySelector("#btntodos").classList.remove("active")
    document.querySelector("#nomeOperador").value = localStorage.getItem("usuario")
    const dataAtual = moment().format('DD/MM/YYYY');
    document.querySelector("#dataAtual").value = dataAtual;
    document.querySelector("#pageenvreceita").style.display = 'none'
    document.querySelector("#btnenvreceita").classList.remove("active")
}

function receitas() {
    document.querySelector("#inicio").style.display = 'none'
    document.querySelector("#formulario").style.display = 'none'
    exibirreceitas()
    document.querySelector("#btninicio").classList.remove("active")
    document.querySelector("#btnpreencher").classList.remove("active")
    document.querySelector("#btnreceita").classList.add("active")
    document.querySelector("#pagereceitas").style.display = 'block'
    document.querySelector("#pagetodos").style.display = 'none'
    document.querySelector("#btntodos").classList.remove("active")
    document.querySelector("#pageenvreceita").style.display = 'none'
    document.querySelector("#btnenvreceita").classList.remove("active")
}

function todospac() {
    document.querySelector("#inicio").style.display = 'none'
    document.querySelector("#formulario").style.display = 'none'

    document.querySelector("#btninicio").classList.remove("active")
    document.querySelector("#btnpreencher").classList.remove("active")
    document.querySelector("#btnreceita").classList.remove("active")
    document.querySelector("#btntodos").classList.add("active")
    document.querySelector("#pagereceitas").style.display = 'none'
    document.querySelector("#pagetodos").style.display = 'block'
    document.querySelector("#pageenvreceita").style.display = 'none'
    document.querySelector("#btnenvreceita").classList.remove("active")

    exibirpacientes()
}

function enviarreceitas() {
    document.querySelector("#inicio").style.display = 'none'
    document.querySelector("#formulario").style.display = 'none'

    document.querySelector("#btninicio").classList.remove("active")
    document.querySelector("#btnpreencher").classList.remove("active")
    document.querySelector("#btnreceita").classList.remove("active")
    document.querySelector("#btntodos").classList.remove("active")
    document.querySelector("#btnenvreceita").classList.add("active")
    document.querySelector("#pagereceitas").style.display = 'none'
    document.querySelector("#pagetodos").style.display = 'none'
    document.querySelector("#pageenvreceita").style.display = 'block'
    pagereceita()
}

function closemenu() {
    const menuList = document.querySelector(".menupage ul");
    const menuButton = document.querySelector(".button.notific.btnmenu i");

    menuList.style.display = 'none';
    menuButton.classList = "lni lni-shift-right";

    const toggleMenu = function() {
        if (menuList.style.display === 'none') {
            menuList.style.display = 'block';
            menuButton.classList = "lni lni-shift-left";
            document.querySelector(".menupage").style.width = '270px'
        } else {
            menuList.style.display = 'none';
            menuButton.classList = "lni lni-shift-right";
            document.querySelector(".menupage").style.width = '70px'
        }
    };

    document.querySelector(".button.notific.btnmenu").onclick = toggleMenu;
}








// MODAL





function searchUsers() {
    var input = document.querySelector('#searchInput');
    var filter = input.value.toUpperCase();
    var tables = document.querySelectorAll('table');

    tables.forEach(function(table) {
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
    });
}




function modal(message, time) {
    document.querySelector("#modalpadrao").style.display = 'block'
    document.querySelector("#modalpadrao #message").innerHTML = message

    setTimeout(() => {
        document.querySelector("#modalpadrao").style.display = 'none'
    }, time);
}
$(function() {
    $('#toggleBtn').click(function() {
        var input = $('#passInput');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            $(this).html('<i class="lni lni-key"></i>');
        } else {
            input.attr('type', 'password');

            $(this).html('<i class="lni lni-eye"></i>');
        }
    });
});




function exibirpacientes() {
    $('#todospacientes').empty();


    // Referência para o Firestore
    var db = firebase.firestore();

    // Criação de um real-time listener genérico
    db.collection("dessensibilizar").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Lógica para lidar com cada alteração
            var docData = doc.data();
            // Criação do elemento tr

            var tr = document.createElement('tr');

            // Criação das células (td) e seus conteúdos



            var td3 = document.createElement('td');
            td3.textContent = docData.nome
            tr.appendChild(td3);

            var td4 = document.createElement('td');
            td4.textContent = docData.exame
            tr.appendChild(td4);

            var td41 = document.createElement('td');
            td41.textContent = docData.demandaPaciente
            tr.appendChild(td41);

            var td10 = document.createElement('td');
            td10.textContent = docData.observacao
            tr.appendChild(td10);

            var td5 = document.createElement('td');
            td5.textContent = docData.dataAgendamento
            tr.appendChild(td5);

            var td6 = document.createElement('td');
            td6.textContent = docData.nomeOperador
            tr.appendChild(td6);

            var td7 = document.createElement('td');
            td7.textContent = docData.status
            tr.appendChild(td7);

            var td8 = document.createElement('td');
            var button = document.createElement('button');
            button.className = 'btnacao zoom';
            button.textContent = 'Chamado';
            button.onclick = function() {

                $('#formchamado').off('submit').on('submit', function(event) {
                    event.preventDefault();

                    // Verificar se o formulário está válido
                    if (this.checkValidity()) {
                        var motivo = $('#motivo').val();
                        var descricao = $('#descricao').val();
                        var paciente = docData.nome;
                        var usuario = localStorage.getItem('usuario');
                        var email = localStorage.getItem('email');
                        var dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');

                        var msg = 'Abriu Chamado'
                        logs(paciente, dataHoraAtual, email, usuario, msg, '#')

                        firebase.firestore().collection("chamados").add({
                                motivo: motivo,
                                descricao: descricao,
                                usuarios: usuario,
                                email: email,
                                dataehora: dataHoraAtual,
                                paciente: paciente,
                                status: 'Pendente'
                            })
                            .then((docRef) => {


                                modal('Chamado Aberto Com Sucesso!', 2000);
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });
                    } else {
                        // Caso o formulário não esteja válido, exibir uma mensagem de erro ou realizar outra ação necessária
                        console.log('Por favor, preencha todos os campos corretamente');
                    }
                });
            };




            td8.appendChild(button);
            tr.appendChild(td8);

            // Anexar a linha (tr) à tabela
            var table = document.getElementById('todospacientes'); // Substitua 'nomeDaTabela' pelo ID correto da sua tabela
            table.appendChild(tr);

        });
    });

}




function exibirreceitas() {
    const db = firebase.firestore()
    document.querySelector("#exibirreceitas").innerHTML = ''
    db.collection("dessensibilizar").where("status", "==", 'Envio Pendente')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const idcolecao = doc.id
                var button = $('<button>').addClass('btnacao zoom').text('Ação');

                button.on('click', function() {
                    document.querySelector("#modalinfor").style.display = 'block'
                    var modalContent = document.createElement('div');
                    modalContent.classList.add('modal-content');
                    modalContent.id = 'bodyreceita';

                    var title = document.createElement('h2');
                    title.style.textAlign = 'center';
                    title.textContent = 'Ações para receitas';
                    modalContent.appendChild(title);

                    var button6 = document.createElement('button');
                    button6.classList.add('buttonenv');
                    button6.textContent = 'Confirmar Envio';
                    modalContent.appendChild(button6);
                    button6.onclick = function() {
                        document.querySelector("#modalinfor").style.display = 'none'
                        Swal.fire({
                            title: 'A receita foi encaminhada?',
                            text: "Eu, " + localStorage.getItem("usuario") + ' declaro que a receita do paciente ' + doc.data().nome + ' foi encaminhada com sucesso!',
                            icon: 'warning',
                            color: 'white',
                            showCancelButton: true,
                            confirmButtonColor: '#004e80',
                            cancelButtonColor: '#801500',
                            cancelButtonText: 'Voltar',
                            confirmButtonText: 'Sim, confirmo'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                receitas()
                                firebase.firestore().collection("dessensibilizar").doc(idcolecao).update({
                                        status: 'Receita Enviada',
                                        receitaenviadapor: localStorage.getItem("usuario"),
                                        emaildeenvio: localStorage.getItem("email"),

                                    })
                                    .then(() => {
                                        console.log("Document successfully updated!");
                                    })
                                    .catch((error) => {
                                        // The document probably doesn't exist.
                                        console.error("Error updating document: ", error);
                                    });

                                Swal.fire(
                                    'Envio Confirmado Com Sucesso',
                                    '""',
                                    'success'
                                )
                            }
                        })
                    }

                    var button1 = document.createElement('button');
                    button1.classList.add('buttonenv');
                    button1.textContent = 'Ver Receita';
                    modalContent.appendChild(button1);
                    button1.onclick = function() {
                        var novaAba = window.open();
                        novaAba.opener = null;
                        novaAba.location = doc.data().receita;
                    }
                    var button21 = document.createElement('button');
                    button21.classList.add('buttonenv');
                    button21.textContent = 'Ver Guia';
                    modalContent.appendChild(button21);
                    button21.onclick = function() {
                        var novaAba = window.open();
                        novaAba.opener = null;
                        novaAba.location = doc.data().arquivo
                    }


                    var button2 = document.createElement('button');
                    button2.classList.add('buttonenv');
                    button2.textContent = 'Abrir Huggy';
                    modalContent.appendChild(button2);
                    button2.onclick = function() {
                        var novaAba = window.open();
                        novaAba.opener = null;
                        novaAba.location = 'https://www.huggy.app/panel/chats/' + doc.data().idConversa + '?tab=opened'
                    }

                    var button3 = document.createElement('button');
                    button3.classList.add('buttonenv');
                    button3.textContent = 'Abrir Whatsapp Web';
                    modalContent.appendChild(button3);
                    button3.onclick = function() {
                        var telefone = doc.data().telefone;
                        var mensagem = "MSG IDENTIFICAÇÃO"; // Mensagem pré-definida

                        var linkWhatsapp = "https://wa.me/55" + telefone + "?text=" + encodeURIComponent(mensagem);

                        var novaAba = window.open();
                        novaAba.opener = null;
                        novaAba.location = linkWhatsapp;
                    }


                    var button4 = document.createElement('button');
                    button4.classList.add('buttonenv');
                    button4.textContent = 'Abrir Chamado';
                    modalContent.appendChild(button4);
                    button4.onclick = function() {


                        $('#formchamado').off('submit').on('submit', function(event) {
                            event.preventDefault();

                            // Verificar se o formulário está válido
                            if (this.checkValidity()) {
                                var motivo = $('#motivo').val();
                                var descricao = $('#descricao').val();
                                var paciente = docData.nome;
                                var usuario = localStorage.getItem('usuario');
                                var email = localStorage.getItem('email');
                                var dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');

                                var msg = 'Abriu Chamado'
                                logs(paciente, dataHoraAtual, email, usuario, msg, '#')

                                firebase.firestore().collection("chamados").add({
                                        motivo: motivo,
                                        descricao: descricao,
                                        usuarios: usuario,
                                        email: email,
                                        dataehora: dataHoraAtual,
                                        paciente: paciente,
                                        status: 'Pendente'
                                    })
                                    .then((docRef) => {


                                        modal('Chamado Aberto Com Sucesso!', 2000);
                                    })
                                    .catch((error) => {
                                        console.error("Error adding document: ", error);
                                    });
                            } else {
                                // Caso o formulário não esteja válido, exibir uma mensagem de erro ou realizar outra ação necessária
                                console.log('Por favor, preencha todos os campos corretamente');
                            }
                        });
                    }

                    var button5 = document.createElement('button');
                    button5.classList.add('buttonenv');
                    button5.textContent = 'Fechar';
                    button5.addEventListener('click', function() {
                        document.querySelector('#modalinfor').style.display = 'none';
                    });
                    modalContent.appendChild(button5);

                    document.querySelector('#modalinfor').appendChild(modalContent);

                });

                var row = $('<tr>').append(
                    $('<td>').text(doc.data().idConversa),
                    $('<td>').text(doc.data().regPaciente),
                    $('<td>').text(doc.data().nome),
                    $('<td>').text(doc.data().exame),
                    $('<td>').text(doc.data().demandaPaciente),
                    $('<td>').text(doc.data().dataAgendamento),
                    $('<td>').text(doc.data().dessens),
                    $('<td>').text(doc.data().enfermeira),
                    $('<td>').append(button)
                );

                $('#exibirreceitas').append(row);

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}


function pagereceita() {


    $('#pagereceita').empty();


    // Referência para o Firestore
    var db = firebase.firestore();

    // Criação de um real-time listener genérico
    db.collection("dessensibilizar").where("status", "==", 'pendente').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Lógica para lidar com cada alteração
            var docData = doc.data();
            // Criação do elemento tr

            var tr = document.createElement('tr');

            // Criação das células (td) e seus conteúdos



            var td3 = document.createElement('td');
            td3.textContent = docData.nome
            tr.appendChild(td3);

            var td4 = document.createElement('td');
            td4.textContent = docData.exame
            tr.appendChild(td4);

            var td41 = document.createElement('td');
            td41.textContent = docData.demandaPaciente
            tr.appendChild(td41);

            var td10 = document.createElement('td');
            td10.textContent = docData.observacao
            tr.appendChild(td10);

            var td5 = document.createElement('td');
            td5.textContent = docData.dataAgendamento
            tr.appendChild(td5);

            var td6 = document.createElement('td');
            td6.textContent = docData.nomeOperador
            tr.appendChild(td6);

            var td7 = document.createElement('td');
            td7.textContent = docData.status
            tr.appendChild(td7);

            var td8 = document.createElement('td');
            var button = document.createElement('button');
            button.className = 'btnacao zoom';
            button.textContent = 'Ações';
            button.onclick = function() {
                document.querySelector("#enfermeiramodal").innerHTML = ''
                document.querySelector("#modalenfermeira").style.display = 'block'
                var parentElement = document.getElementById("enfermeiramodal");

                var h2 = document.createElement("h2");
                h2.style.textAlign = "center";
                h2.textContent = "Painel Enfermeira(o)";
                parentElement.appendChild(h2);

                const idcolecao = doc.id
                var button2 = document.createElement("button");
                button2.classList.add("buttonenv");
                button2.textContent = "Confirmar Envio";
                parentElement.appendChild(button2);

                button2.onclick = function() {
                    document.querySelector("#modalenfermeira").style.display = 'none'
                    Swal.fire({
                        title: 'A receita foi encaminhada?',
                        text: "Eu, " + localStorage.getItem("usuario") + ' declaro que a receita do paciente ' + doc.data().nome + ' foi encaminhada com sucesso!',
                        icon: 'warning',
                        color: 'white',
                        showCancelButton: true,
                        confirmButtonColor: '#004e80',
                        cancelButtonColor: '#801500',
                        cancelButtonText: 'Voltar',
                        confirmButtonText: 'Sim, confirmo'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            firebase.firestore().collection("dessensibilizar").doc(idcolecao).update({
                                    status: 'Envio Pendente',
                                    receitaenviadapor: localStorage.getItem("usuario"),
                                    emaildeenvio: localStorage.getItem("email"),

                                })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                })
                                .catch((error) => {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });

                            Swal.fire(
                                'Envio Confirmado Com Sucesso',
                                '""',
                                'success'
                            )
                        }
                    })
                }

                var uploadButton = document.createElement("button");
                uploadButton.classList.add("buttonenv");
                uploadButton.textContent = "Enviar Receita";
                parentElement.appendChild(uploadButton);
                uploadButton.addEventListener("click", function() {
                    var receita = './receita.html'

                    var novaAba = window.open();
                    novaAba.opener = null;
                    novaAba.location = receita + "#" + doc.id;
                });



                var button4 = document.createElement("button");
                button4.classList.add("buttonenv");
                button4.textContent = "Abrir Chamado";
                parentElement.appendChild(button4);
                button4.onclick = function() {


                    document.querySelector("#modalenfermeira").style.display = 'none';
                    $('#formchamado').off('submit').on('submit', function(event) {
                        event.preventDefault();

                        // Verificar se o formulário está válido
                        if (this.checkValidity()) {
                            var motivo = $('#motivo').val();
                            var descricao = $('#descricao').val();
                            var paciente = docData.nome;
                            var usuario = localStorage.getItem('usuario');
                            var email = localStorage.getItem('email');
                            var dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');

                            var msg = 'Abriu Chamado'
                            logs(paciente, dataHoraAtual, email, usuario, msg, '#')

                            firebase.firestore().collection("chamados").add({
                                    motivo: motivo,
                                    descricao: descricao,
                                    usuarios: usuario,
                                    email: email,
                                    dataehora: dataHoraAtual,
                                    paciente: paciente,
                                })
                                .then((docRef) => {


                                    modal('Chamado Aberto Com Sucesso!', 2000);
                                })
                                .catch((error) => {
                                    console.error("Error adding document: ", error);
                                });
                        } else {
                            // Caso o formulário não esteja válido, exibir uma mensagem de erro ou realizar outra ação necessária
                            console.log('Por favor, preencha todos os campos corretamente');
                        }
                    });
                }

                var button5 = document.createElement("button");
                button5.classList.add("buttonenv");
                button5.textContent = "Voltar";
                parentElement.appendChild(button5);
                button5.onclick = function() {
                    document.querySelector("#modalenfermeira").style.display = 'none'
                }

            };




            td8.appendChild(button);
            tr.appendChild(td8);

            // Anexar a linha (tr) à tabela
            var table = document.getElementById('pagereceita'); // Substitua 'nomeDaTabela' pelo ID correto da sua tabela
            table.appendChild(tr);

        });
    });




}

function fecharModal() {
    var modal = document.getElementById("modalurl");
    modal.style.display = "none";
}

function compartilhar() {
    // Obtenha a URL da página atual
    var url = window.location.href;
    document.getElementById("qrcodeurl").innerHTML = ''
        // Crie uma instância do objeto QRCode usando a biblioteca qrcode.js
    var qrCode = new QRCode(document.getElementById("qrcodeurl"), {
        text: url,
        width: 258,
        height: 258
    });

    // Exiba o modal
    var modal = document.getElementById("modalurl");
    modal.style.display = "flex";

}