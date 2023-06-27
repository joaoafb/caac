firebase.firestore().collection('dessensibilizar').doc(window.location.hash.substring(1)).get().then((doc) => {
    if (doc.exists) {

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
            <p>ID Huggy: <strong>${doc.data().idConversa}</strong></p>
            <p>Registro Smart Agenda <strong>${doc.data().regPaciente}</strong></p>
            <div class="btns">
                <button class="buttonenv" onclick="verGuiaMedica('${doc.data().arquivo}')">Ver Guia médica anexada</button>
                <button class="buttonenv" onclick="enviarWhatsappGeral('${doc.data().telefone}')">Enviar pelo WhatsApp Geral</button>
                <button class="buttonenv" onclick="enviarHuggy('${doc.data().telefone}')">Enviar pelo Huggy</button>
                <button class="buttonenv" onclick="verReceita('${doc.data().receita}')">Ver Receita</button>
                <button class="buttonenv" onclick="confirmarEnvio('${doc.id}')">Receita Encaminhada</button>

             
            </div>`;
    }
    document.querySelector(".dados").appendChild(divElement);
});

function verGuiaMedica(url) {


    const novaAba = window.open();
    novaAba.opener = null;
    novaAba.location = url
}

function enviarWhatsappGeral(telefone) {
    const url = 'https://api.whatsapp.com/send?phone=55' + telefone + '&text=Bom%20dia,%20prezado(a)%20cliente.%20Sou%20e%20darei%20continuidade%20ao%20seu%20atendimento.'
    const novaAba = window.open(url, '_blank');
    novaAba.opener = null;
}


function enviarHuggy(url) {
    const novaAba = window.open();
    novaAba.opener = null;
    novaAba.location = 'https://www.huggy.app/panel/contacts/' + url

}

function verReceita(url) {
    const novaAba = window.open();
    novaAba.opener = null;
    novaAba.location = url
}

function confirmarEnvio(docid) {
    const db = firebase.firestore();
    const docRef = db.collection('dessensibilizar').doc(docid);

    // Atualiza o status para 'Receita Encaminhada'
    docRef.update({
            status: 'Receita Encaminhada'
        })
        .then(() => {
            Swal.fire({

                icon: 'success',
                title: 'Receita Encaminhada Com Sucesso!',
                showConfirmButton: false,
                timer: 2500
            })
        })
        .catch((error) => {
            console.error('Erro ao confirmar o envio da receita:', error);
        });
}