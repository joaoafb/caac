function enviar(){

    // Retrieve the form element
var form = document.getElementById('formulario');
var currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
// Retrieve the values of the form fields
var nome = form.elements.nome.value;
var regPaciente = form.elements.regPaciente.value;
var idConversa = form.elements.idConversa.value;
var dataAgendamento = form.elements.dataAgendamento.value;
var demandaPaciente = form.elements.demandaPaciente.value;
var observacao = form.elements.observacao.value;
var nomeOperador = form.elements.nomeOperador.value;
var dataAtual = form.elements.dataAtual.value;
var exame = form.elements.nomeExame.value;
var arquivo = form.elements.arquivo.value;

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
    console.log('Upload progress:', progress + '%');
  },
  function(error) {
    // Handle upload error
    console.error('Upload error:', error);
  },
  function() {
    // Upload completed successfully
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      // Get the download URL of the uploaded file
      console.log('File download URL:', downloadURL);


firebase.firestore().collection("dessensibilizar").add({
    nome:nome,
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
    receita: '',

})
.then(() => {
    Swal.fire({
     
        icon: 'success',
        title: 'Dessensibilização Preenchida',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        document.querySelector(".menu").style.filter = 'blur(0px)'
        location.reload()
      }, 3000);
})
.catch((error) => {
    console.error("Error writing document: ", error);
});



    });
  }
);

}

window.addEventListener('DOMContentLoaded', function() {

var formElement = document.getElementById('formulario');
formElement.addEventListener('submit', function(event) {
  event.preventDefault(); // Impedir o envio padrão do formulário
  enviar(); // Chamar a função enviar() quando o formulário for enviado
});



});
