document.addEventListener("DOMContentLoaded", function() {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 228,
        height: 228
    });

    firebase.firestore().collection('dessensibilizar').doc(window.location.hash.substring(1)).get().then((doc) => {
        if (doc.exists) {

            if (doc.data().status == 'Envio Pendente') {
                modal("A Receita Já Foi Enviada", 2000);
                setTimeout(() => {
                    window.close();
                }, 2500);
            }
            const data = doc.data();
            var nome = data.nome;
            var exame = data.exame;
            var dataAgendamento = data.dataAgendamento;
            var demanda = data.status;
            var observacao = data.observacao;
            var nomeOperador = data.nomeOperador;
            var dataAtual = data.horarioatual;
            var telefoneContato = data.telefone;

            var divElement = document.createElement("div");
            divElement.innerHTML = `
            <p>O(a) paciente <strong>${nome}</strong> tem um(a) <strong>${exame}</strong> agendado para <strong>${dataAgendamento}</strong>.</p>
            <p>Status: <strong>${demanda}</strong></p>
            <p>Observação: <strong>${data.demandaPaciente}</strong></p>
            <p>Alergia à: <strong>${observacao}</strong></p>
            <p>A dessensibilização foi preenchida por <strong>${nomeOperador}</strong> no dia ${dataAtual}</p>
            <p>Telefone para contato: <strong>${telefoneContato}</strong></p>
            <div class="btns">
            <button class="buttonenv">Ver Guia médica anexada</button><button id="chamado" class="buttonenv">Abrir Chamado</button>
            </div>
            <div><br>
                <form id="customFile" class="custom-file">
                    <input type="file" id="arquivo" name="arquivo" required>
                    <label for="arquivo" id="customFileLabel"><i class="lni lni-cloud-upload"></i>Arraste e solte o arquivo aqui</label>
                    <input type="submit" id="encaminhar" class="buttonenv" value="Encaminhar Receita"><br>
                </form>
              
            </div>
            `;

            var buttonElement = divElement.querySelector("button");
            buttonElement.addEventListener("click", function() {
                executarFuncao();
            });

            setTimeout(() => {
                // Adicionar evento de clique ao botão de envio do formulário
                document.getElementById('customFile').addEventListener('submit', function(event) {
                    event.preventDefault();

                    // Verificar se há um arquivo selecionado
                    var arquivoInput = document.getElementById('arquivo');
                    if (arquivoInput.files.length === 0) {
                        // Exibir alerta caso não haja arquivo selecionado
                        toast('Por favor, selecione um arquivo.', 2000)
                        return;
                    }

                    // Obter o arquivo selecionado
                    var arquivo = arquivoInput.files[0];

                    // Criar uma referência para o arquivo no Firebase Storage
                    var storageRef = firebase.storage().ref().child('arquivos/' + arquivo.name);

                    // Fazer o upload do arquivo para o Firebase Storage
                    var uploadTask = storageRef.put(arquivo);

                    // Monitorar o progresso do upload
                    uploadTask.on('state_changed', function(snapshot) {
                        document.querySelector(".box").style.filter = 'blur(3px)'
                    }, function(error) {
                        // Tratar erros durante o upload do arquivo
                        console.error('Erro ao fazer o upload do arquivo:', error);
                    }, function() {
                        // Upload concluído com sucesso
                        // Obter a URL do arquivo no Firebase Storage
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            // URL do arquivo disponível
                            console.log('URL do arquivo:', downloadURL);

                            firebase.firestore().collection("dessensibilizar").doc(doc.id).update({
                                    receita: downloadURL,
                                    enfermeira: localStorage.getItem("usuario"),
                                    emailenfermeira: localStorage.getItem("email"),
                                    horariodeenvio: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    status: 'Envio Pendente'
                                })
                                .then(() => {
                                    document.querySelector(".box").style.filter = 'blur(0px)'
                                    setTimeout(() => {
                                        window.close()
                                    }, 3000);
                                    console.log("Document successfully updated!");
                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                });

                            modal("Receita Enviada Com Sucesso", 2000);
                            // Faça o que desejar com a URL do arquivo (por exemplo, salvar no banco de dados)
                        });
                    });
                });
            }, 1000);

            document.querySelector(".dados").appendChild(divElement);
            setTimeout(() => {
                document.querySelector("#chamado").addEventListener("click", function() {
                    chamado();
                });
            }, 1000);

            function executarFuncao() {
                var guiamedica = data.arquivo;

                var novaAba = window.open();
                novaAba.opener = null;
                novaAba.location = guiamedica;
            }

            function chamado() {
                document.querySelector("#modalacao").style.display = 'block';

                $('#formchamado').off('submit').on('submit', function(event) {
                    event.preventDefault();

                    // Verificar se o formulário está válido
                    if (this.checkValidity()) {
                        var motivo = $('#motivo').val();
                        var descricao = $('#descricao').val();
                        var paciente = nome;
                        var usuario = localStorage.getItem('usuario');
                        var email = localStorage.getItem('email');
                        var dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');

                        var msg = 'Abriu Chamado';
                        logs(paciente, dataHoraAtual, email, usuario, msg, '#');

                        firebase.firestore().collection("chamados").add({

                                descricao: motivo + ' |' + descricao,
                                usuarios: usuario,
                                email: email,
                                dataehora: dataHoraAtual,
                                paciente: paciente,
                            })
                            .then((docRef) => {
                                document.querySelector("#modalacao").style.display = 'none';
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
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});

function logs(nome, data, email, usuario, acao, id) {
    firebase.firestore().collection("logs").add({
            nome: nome,
            data: data,
            email: email,
            usuario: usuario,
            acao: acao,
            id: id
        })
        .then((docRef) => {
            console.log("Log Salvo");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function modal(message, time) {
    document.querySelector("#modalpadrao").style.display = 'block';
    document.querySelector("#modalpadrao #message").innerHTML = message;

    setTimeout(() => {
        document.querySelector("#modalpadrao").style.display = 'none';
    }, time);
}