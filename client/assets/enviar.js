function enviar() {

    // Retrieve the form element
    var form = document.getElementById('formulario');
    var currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    // Retrieve the values of the form fields
    var nome = document.getElementById('nome').value;
    var regPaciente = document.getElementById('regPaciente').value;
    var idConversa = document.getElementById('idConversa').value;
    var dataAgendamento = document.getElementById('dataAgendamento').value;
    var demandaPaciente = document.getElementById('demandaPaciente').value;
    var observacao = document.getElementById('observacao').value;
    var nomeOperador = document.getElementById('nomeOperador').value;
    var dataAtual = document.getElementById('dataAtual').value;
    var exame = document.getElementById('nomeExame').value;
    var telefone = document.getElementById('idTelefone').value;


    // Retrieve the file input element
    var fileInput = document.getElementById('arquivo');

    // Create a storage reference
    var storageRef = firebase.storage().ref();

    // Get the file from the file input
    var file = fileInput.files[0];

    // Set the file path in the storage
    var filePath = 'files/' + file.name;
    var fileRef = storageRef.child(filePath);

    // Upload the file to Firebase Storage
    var uploadTask = fileRef.put(file);

    // Listen to the upload progress
    uploadTask.on('state_changed',
        function(snapshot) {
            // Show upload progress if needed
            document.querySelector(".menu").style.filter = 'blur(3px)'
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload :', progress + '%');
            $(".modal-contentdessen").css("filter", "blur(3px)");

        },
        function(error) {
            // Handle upload error
            console.error('Upload error:', error);
        },
        function() {
            // Upload completed successfully
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // Get the download URL of the uploaded file



                firebase.firestore().collection("dessensibilizar").add({
                        nome: nome,
                        regPaciente: regPaciente,
                        idConversa: idConversa,
                        dataAgendamento: dataAgendamento,
                        demandaPaciente: demandaPaciente,
                        observacao: observacao,
                        nomeOperador: nomeOperador,
                        dataAtual: dataAtual,
                        arquivo: downloadURL,
                        horarioatual: currentDate,
                        enfermeira: '',
                        exame: exame,
                        status: 'pendente',
                        email: localStorage.getItem("email"),
                        receita: '',
                        telefone: telefone

                    })
                    .then((docRef) => {
                        optionPreencher()
                        toast("Dessensibilização Encaminhada!", 2000)
                        logs(nome, dataAtual, localStorage.getItem("email"), localStorage.getItem("usuario"), 'Preenchimento de Dessensibilização', docRef.id)
                        $(".modal-contentdessen").css("filter", "blur(0px)");
                        document.querySelector(".menu").style.filter = 'blur(0px)'

                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });



            });
        }

    );
    document.addEventListener("DOMContentLoaded", function() {

        var formElement = document.getElementById('formulario');
        formElement.addEventListener('submit', function(event) {
            event.preventDefault(); // Impedir o envio padrão do formulário
            enviar(); // Chamar a função enviar() quando o formulário for enviado
        });

        // ... Restante do código do cliente ...

    });

}