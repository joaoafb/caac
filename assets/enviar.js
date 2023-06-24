function enviar(){

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
var arquivo = document.getElementById('arquivo').value;


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
    email: localStorage.getItem("email"),
    receita: '',

})
.then((docRef) => {
    Swal.fire({
     
        icon: 'success',
        title: 'Encaminhado Com Sucesso',
        showConfirmButton: false,
        timer: 3000
      })
      logs(nome,dataAtual,localStorage.getItem("email"),localStorage.getItem("usuario"),'Preenchimento de Dessensibilização',docRef.id)
      setTimeout(() => {
      todospac()
      }, 3500);
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
