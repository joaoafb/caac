
document.addEventListener("DOMContentLoaded", function() {
  verificarLogin();
});

var form = document.getElementById('formulario');
var currentDate = moment().format('DD/MM/YYYY HH:mm:ss');

if(localStorage.getItem("unidade")> ""){
  document.title = 'CAAC | Multimagem - ' + localStorage.getItem("unidade")
}

  function searchUsers() {
    var input = document.querySelector('#searchInput');
    var filter = input.value.toUpperCase();
    var table = document.querySelector('table');
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


  function openFilterOptions() {
    var filterOptions = document.querySelector('#filterOptions');
    if (filterOptions.style.display === 'block') {
      filterOptions.style.display = 'none';
      document.querySelector(".lni.lni-close").classList = 'lni lni-funnel' 
    } else {
      filterOptions.style.display = 'block';
      document.querySelector(".lni.lni-funnel").classList = 'lni lni-close'
    }

    
  }
  
  function handleCheckboxClick(checkbox) {
    var checkboxes = document.querySelectorAll('#filterOptions input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      
      if (checkbox !== this) {
        
        checkbox.checked = false;
      
         
  
        
      }
    }, checkbox);
  }

  function datahoje() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    var formattedDate = dd + '/' + mm + '/' + yyyy;

    document.querySelector("#searchInput").value = formattedDate;
    searchUsers()
  }

  function dataamanha() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dd = String(tomorrow.getDate()).padStart(2, '0');
    var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = tomorrow.getFullYear();

    var formattedDate = dd + '/' + mm + '/' + yyyy;

    document.querySelector("#searchInput").value = formattedDate;
    searchUsers()
  }
function alergico(){
  document.querySelector("#searchInput").value = "Alergico"
  searchUsers()
}
function asmatico(){  document.querySelector("#searchInput").value = "Asmatico"
searchUsers()
}




function dash(){
  criardash()
  document.querySelector("#pendencias").style.display = 'none'
  document.querySelector("#menu").style.display = 'none'
  document.querySelector(".back").style.display = 'none'
  document.querySelector(".backbtn").style.display = 'block'
  document.querySelector("#dashboard").style.display = 'flex'
  document.getElementById("sub-page").innerHTML = 'Dashboard'
}

function table(){
  document.querySelector("#pendencias").style.display = 'none'
  document.querySelector("#menu").style.display = 'none'
  document.querySelector(".back").style.display = 'none'
  document.querySelector("#listatable").style.display = 'block'
  document.querySelector(".backbtn").style.display = 'block'
  document.getElementById("sub-page").innerHTML= 'Lista'
    document.querySelector("#dashboard").style.display = 'none'
    document.querySelector('#list-pac').innerHTML = ''
    criartabela()
}

function backpage(){
  document.querySelector("#pendencias").style.display = 'none'
  document.querySelector("#dashboard").style.display = 'none'
  document.querySelector("#menu").style.display = 'flex'
  document.querySelector(".back").style.display = 'block'
  document.querySelector("#listatable").style.display = 'none'
  document.querySelector(".backbtn").style.display = 'none'
  document.getElementById("sub-page").innerHTML= ''
}
function pendencias(){
  document.querySelector("#dashboard").style.display = 'none'
  document.querySelector("#pendencias").style.display = 'block'
  document.querySelector("#menu").style.display = 'none'
  document.querySelector(".back").style.display = 'none'
  document.querySelector(".backbtn").style.display = 'block'
  document.querySelector("#listatable").style.display = 'none'
  document.getElementById("sub-page").innerHTML= 'Criar Receita'
  document.querySelector('#list-pend').innerHTML = ''
  criarpendencias()
}

function receitas(){
  document.querySelector("#dashboard").style.display = 'none'
  document.querySelector("#pendencias").style.display = 'none'
  document.querySelector("#receitados").style.display = 'block'
  document.querySelector("#menu").style.display = 'none'
  document.querySelector(".back").style.display = 'none'
  document.querySelector(".backbtn").style.display = 'block'
  document.querySelector("#listatable").style.display = 'none'
  document.getElementById("sub-page").innerHTML= 'Encaminhar receitas'
  document.querySelector('#list-receit').innerHTML = ''
  criarreceitas()
}
function criardash(){
  
  firebase.firestore().collection("dessensibilizar")
  .get()
  .then((querySnapshot) => {
    const count = querySnapshot.size;
    localStorage.setItem("countpacientes", count)
    document.querySelector("#countpac").innerHTML = 'Total de Pacientes: ' + count 
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

  
firebase.firestore().collection("dessensibilizar").where("status", "==", "pendente")
.get()
.then((querySnapshot) => {
  const countPendente = querySnapshot.size;
  localStorage.setItem("countPendente", countPendente);
})
.catch((error) => {
  console.log("Error getting documents: ", error);
});

// Contagem de documentos com status "Receituado"
firebase.firestore().collection("dessensibilizar").where("status", "==", "receituado")
.get()
.then((querySnapshot) => {
  const countReceituado = querySnapshot.size;
  localStorage.setItem("countReceituado", countReceituado);
})
.catch((error) => {
  console.log("Error getting documents: ", error);
});

// Contagem de documentos com status "Recebimento pendente"
firebase.firestore().collection("dessensibilizar").where("status", "==", "recebimentopendente")
.get()
.then((querySnapshot) => {
  const countRecebimentoPendente = querySnapshot.size;
  localStorage.setItem("countRecebimentoPendente", countRecebimentoPendente);
})
.catch((error) => {
  console.log("Error getting documents: ", error);
});

// Contagem de documentos com status "Recebido"
firebase.firestore().collection("dessensibilizar").where("status", "==", "recebido")
.get()
.then((querySnapshot) => {
  const countRecebido = querySnapshot.size;
  localStorage.setItem("countRecebido", countRecebido);
})
.catch((error) => {
  console.log("Error getting documents: ", error);
});


}

function criartabela(){
  firebase.firestore().collection("dessensibilizar")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
// Dados do exemplo

const data = doc.data()
// Obtenha o elemento <tbody> onde você deseja adicionar a linha da tabela
const tbody = document.querySelector('#list-pac');

// Crie um novo elemento <tr>
const tr = document.createElement('tr');

// Crie as células da tabela e adicione os valores
const tdId = document.createElement('td');
tdId.textContent = data.idConversa;
tr.appendChild(tdId);

const tdNome = document.createElement('td');
tdNome.textContent = data.nome;
tr.appendChild(tdNome);

const tdExame = document.createElement('td');
tdExame.textContent = data.exame;
tr.appendChild(tdExame);

const tdData = document.createElement('td');
tdData.textContent = data.dataAgendamento;
tr.appendChild(tdData);

const tdDemanda = document.createElement('td');
tdDemanda.textContent =  data.demandaPaciente;
tr.appendChild(tdDemanda);

const tdObservacao = document.createElement('td');
tdObservacao.textContent = data.observacao;
tr.appendChild(tdObservacao);

const tdOperador = document.createElement('td');
tdOperador.textContent = data.nomeOperador;
tr.appendChild(tdOperador);
const tdIcon = document.createElement('td');
const icon = document.createElement('i');
if(data.arquivo == ""){
tdIcon.className = ' status-negado'
icon.className = 'lni lni-close';

}else{
  tdIcon.className = ' status-autorizado'
  icon.className = 'lni lni-checkmark';
}
tdIcon.appendChild(icon);
tr.appendChild(tdIcon);

const tdstatus = document.createElement('td');
tdstatus.textContent = data.status;
tr.appendChild(tdstatus);

const tdButton = document.createElement('td');
const button = document.createElement('button');
button.className = 'imprimir';
const iconPrint = document.createElement('i');
iconPrint.className = 'lni lni-printer';


tdButton.onclick = function(){
  var doc = new jsPDF();

// Título
doc.setFontSize(20);
doc.text(data.nome + ' ' + data.exame, 10, 20);

// Corpo de texto
doc.setFontSize(12);
doc.text('ID (Huggy): ' + data.idConversa + ' Registro: ' + data.regPaciente, 10, 40);
doc.text('Paciente: ' + data.nome, 10, 50);
doc.text('Exame: ' + data.exame, 10, 60);
doc.text('Exame Agendando Para: ' + data.dataAgendamento, 10, 70);
doc.text('Demanda: ' + data.demandaPaciente, 10, 80);
doc.text('Observação: ' + data.observacao, 10, 90);
doc.text('Responsável: ' + data.nomeOperador, 10, 100);
doc.text('Status: ' + data.status, 10, 110);

// Rodapé
doc.setFontSize(10);
doc.text("Nome da Plataforma", 10, doc.internal.pageSize.getHeight() - 10);

// Salve o PDF
doc.save(data.nome + ".pdf");

// Crie um link para abrir a imagem em outra aba
var imageLink = document.createElement('a');
imageLink.href = data.arquivo; // Insira o link da imagem desejada aqui
imageLink.target = '_blank'; // Abre em uma nova aba
imageLink.style.display = 'none';
document.body.appendChild(imageLink);
imageLink.click();
document.body.removeChild(imageLink);

  
}
button.appendChild(iconPrint);
tdButton.appendChild(button);
tr.appendChild(tdButton);

// Adicione o <tr> ao <tbody>
tbody.appendChild(tr);


    
});
})
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

}


function criarpendencias(){
  firebase.firestore().collection("dessensibilizar").where("status", "==", 'pendente')
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
// Dados do exemplo

const data = doc.data()
// Obtenha o elemento <tbody> onde você deseja adicionar a linha da tabela
const tbody = document.querySelector('#list-pend');

// Crie um novo elemento <tr>
const tr = document.createElement('tr');

// Crie as células da tabela e adicione os valores
const tdId = document.createElement('td');
tdId.textContent = data.regPaciente;
tr.appendChild(tdId);

const tdNome = document.createElement('td');
tdNome.textContent = data.nome;
tr.appendChild(tdNome);

const tdExame = document.createElement('td');
tdExame.textContent = data.exame;
tr.appendChild(tdExame);

const tdData = document.createElement('td');
tdData.textContent = data.dataAgendamento;
tr.appendChild(tdData);

const tdDemanda = document.createElement('td');
tdDemanda.textContent =  data.demandaPaciente;
tr.appendChild(tdDemanda);

const tdObservacao = document.createElement('td');
tdObservacao.textContent = data.observacao;
tr.appendChild(tdObservacao);

const tdOperador = document.createElement('td');
tdOperador.textContent = data.nomeOperador;
tr.appendChild(tdOperador);
const tdIcon = document.createElement('td');
const icon = document.createElement('i');
if(data.arquivo == ""){
tdIcon.className = ' status-negado'
icon.className = 'lni lni-close';

}else{
  tdIcon.className = ' status-autorizado'
  icon.className = 'lni lni-checkmark';
}
tdIcon.appendChild(icon);
tr.appendChild(tdIcon);

const tdstatus = document.createElement('td');
tdstatus.textContent = data.status;
tr.appendChild(tdstatus);

const tdUpload = document.createElement('td');
const labelUpload = document.createElement('label');
labelUpload.className = 'imprimir';
const iconUpload = document.createElement('i');
iconUpload.className = 'lni lni-upload';
labelUpload.appendChild(iconUpload);

const inputUpload = document.createElement('input');
inputUpload.type = 'file';
inputUpload.style.display = 'none';

labelUpload.appendChild(inputUpload);
tdUpload.appendChild(labelUpload);
tr.appendChild(tdUpload);

// Event listener para o input de arquivo
inputUpload.addEventListener('change', (event) => {
  document.querySelector("#pendencias").style.filter = 'blur(2px)'
  const file = event.target.files[0]; // Obtenha o arquivo selecionado

  // Crie uma referência para o storage do Firebase
  const storageRef = firebase.storage().ref();

  // Defina o caminho onde o arquivo será armazenado
  const filePath = 'images/' + file.name;

  // Faça o upload do arquivo para o Firebase Storage
  const uploadTask = storageRef.child(filePath).put(file);

  // Monitore o progresso do upload
  uploadTask.on('state_changed', (snapshot) => {
    // Você pode exibir o progresso do upload aqui, se desejar
  }, (error) => {
    // Ocorreu um erro durante o upload
    console.log('Erro no upload:', error);
  }, () => {
    // O upload foi concluído com sucesso

    // Obtenha o link da imagem recém-carregada
    storageRef.child(filePath).getDownloadURL()
      .then((url) => {
        // Imprima o link da imagem no console
        //ALTERAR STATUS DO PAC
    
        console.log('Link da imagem:', url);
        console.log(doc.id)

        firebase.firestore().collection("dessensibilizar").doc(doc.id).update({
   receita: url,
   enfermeira: localStorage.getItem("operador"),
   dataAtual: currentDate,
   status: 'recebimentopendente'
})
.then(() => {
  Swal.fire({

    icon: 'success',
    title: 'Receita Encaminhada Com Sucesso',
    showConfirmButton: false,
    timer: 3000
  })
  setTimeout(() => {
    document.querySelector("#pendencias").style.filter = 'blur(0px)'
    location.reload()
  }, 3000);
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
      })
      .catch((error) => {
        // Ocorreu um erro ao obter o link da imagem
        console.log('Erro ao obter o link da imagem:', error);
      });
  });
});



const tdButton = document.createElement('td');
const button = document.createElement('button');
button.className = 'imprimir';
const iconPrint = document.createElement('i');
iconPrint.className = 'lni lni-printer';



tdButton.onclick = function(){
  var doc = new jsPDF();

// Título
doc.setFontSize(20);
doc.text(data.nome + ' ' + data.exame, 10, 20);

// Corpo de texto
doc.setFontSize(12);
doc.text('ID (Huggy): ' + data.idConversa + ' Registro: ' + data.regPaciente, 10, 40);
doc.text('Paciente: ' + data.nome, 10, 50);
doc.text('Exame: ' + data.exame, 10, 60);
doc.text('Exame Agendando Para: ' + data.dataAgendamento, 10, 70);
doc.text('Demanda: ' + data.demandaPaciente, 10, 80);
doc.text('Observação: ' + data.observacao, 10, 90);
doc.text('Responsável: ' + data.nomeOperador, 10, 100);
doc.text('Status: ' + data.status, 10, 110);

// Rodapé
doc.setFontSize(10);
doc.text("Nome da Plataforma", 10, doc.internal.pageSize.getHeight() - 10);

// Salve o PDF
doc.save(data.nome + ".pdf");

// Crie um link para abrir a imagem em outra aba
var imageLink = document.createElement('a');
imageLink.href = data.arquivo; // Insira o link da imagem desejada aqui
imageLink.target = '_blank'; // Abre em uma nova aba
imageLink.style.display = 'none';
document.body.appendChild(imageLink);
imageLink.click();
document.body.removeChild(imageLink);

  
}
button.appendChild(iconPrint);
tdButton.appendChild(button);
tr.appendChild(tdButton);


// Adicione o <tr> ao <tbody>
tbody.appendChild(tr);


    
});
})
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

}


function criarreceitas(){
  firebase.firestore().collection("dessensibilizar").where("status", "==", 'recebimentopendente')
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
// Dados do exemplo

const data = doc.data()
// Obtenha o elemento <tbody> onde você deseja adicionar a linha da tabela
const tbody = document.querySelector('#list-receit');

// Crie um novo elemento <tr>
const tr = document.createElement('tr');

// Crie as células da tabela e adicione os valores
const tdId = document.createElement('td');
tdId.textContent = data.regPaciente;
tr.appendChild(tdId);

const tdNome = document.createElement('td');
tdNome.textContent = data.nome;
tr.appendChild(tdNome);

const tdExame = document.createElement('td');
tdExame.textContent = data.exame;
tr.appendChild(tdExame);

const tdData = document.createElement('td');
tdData.textContent = data.dataAgendamento;
tr.appendChild(tdData);

const tdDemanda = document.createElement('td');
tdDemanda.textContent =  data.demandaPaciente;
tr.appendChild(tdDemanda);

const tdObservacao = document.createElement('td');
tdObservacao.textContent = data.observacao;
tr.appendChild(tdObservacao);

const tdOperador = document.createElement('td');
tdOperador.textContent = data.nomeOperador;
tr.appendChild(tdOperador);
const tdIcon = document.createElement('td');
const icon = document.createElement('i');
if(data.arquivo == ""){
tdIcon.className = ' status-negado'
icon.className = 'lni lni-close';

}else{
  tdIcon.className = ' status-autorizado'
  icon.className = 'lni lni-checkmark';
}
tdIcon.appendChild(icon);
tr.appendChild(tdIcon);

const tdstatus = document.createElement('td');
tdstatus.textContent = data.status;
tr.appendChild(tdstatus);

const tdButton3 = document.createElement('td');
const button3 = document.createElement('button');
button3.className = 'imprimir';
const iconPrint3 = document.createElement('i');
iconPrint3.className = 'lni lni-share';
button3.appendChild(iconPrint3);
tdButton3.appendChild(button3);


tr.appendChild(tdButton3);


tdButton3.onclick = function() {
  Swal.fire({
    title: 'Enviar Receita',
    html: '',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'Abrir Huggy',
    cancelButtonText: 'Baixar Imagem',
    focusConfirm: false,
    focusCancel: true,
    preConfirm: function () {
      return new Promise(function (resolve) {
        // Ação do Botão 1
        resolve();
      });
    }
  }).then(function (result) {
    if (result.dismiss === Swal.DismissReason.cancel) {
      // Ação do Botão 2
     
      var imageLink = document.createElement('a');
      imageLink.href = data.arquivo; // Insira o link da imagem desejada aqui
      imageLink.target = '_blank'; // Abre em uma nova aba
      imageLink.style.display = 'none';
      document.body.appendChild(imageLink);
      imageLink.click();
      document.body.removeChild(imageLink);
      
      
    } else if (result.isConfirmed) {

      window.open('https://www.huggy.app/panel/chats/' + data.idConversa + '?tab=opened', '_blank');
   
      
    }
  });

  
};



const tdButton = document.createElement('td');
const button = document.createElement('button');
button.className = 'imprimir';
const iconPrint = document.createElement('i');
iconPrint.className = 'lni lni-checkmark';



tdButton.onclick = function(){
//MUDAER STATUS PARA PACIENTE RECEBEU
firebase.firestore().collection("dessensibilizar").doc(doc.id).update({
    status: 'receituado',
    receituadopor: localStorage.getItem("nome")
})
.then(() => {
  Swal.fire({
  
    icon: 'success',
    title: 'Receita enviada com sucesso!',
    showConfirmButton: false,
    timer: 1500
  })
  setTimeout(() => {
    location.reload()
  }, 2000);
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}
button.appendChild(iconPrint);
tdButton.appendChild(button);
tr.appendChild(tdButton);


// Adicione o <tr> ao <tbody>
tbody.appendChild(tr);


    
});
})
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

}


function addpaciente(){
 document.querySelector(".table").style.display = 'none'
 document.querySelector("#preencher").style.display = 'flex'
}

function back(){
  document.querySelector(".table").style.display = 'block'
  document.querySelector("#preencher").style.display = 'none'
}

function criardash(){
   // Dados de exemplo
 var allPatientsData = [
  ['Pendente', Number(localStorage.getItem('countPendente'))],
  ['Receituado', Number(localStorage.getItem("countReceituado"))],
  ['Recebido a Receita', Number(localStorage.getItem("countRecebido"))],
  ['Recebimento pendênte', Number(localStorage.getItem("countRecebimentoPendente"))]

]; 


// Configuração do gráfico
var chartOptions = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Dashboard de Pacientes'
  },
  series: [{
    name: 'Quantidade de Pacientes',
    data: allPatientsData
  }]
};

// Criação dos gráficos
Highcharts.chart('chartAllPatients', chartOptions);


}

function deslogar() {
  firebase.auth().signOut()
    .then(() => {
      // Redirecionar para a página de login
      window.location.href = "./login.html";
    })
    .catch((error) => {
      // Tratar erros, se houver
      console.log("Erro ao fazer logout:", error);
    });
}

function verificarLogin() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Usuário está logado
      console.log("Usuário logado:", user.uid);
    } else {
      // Usuário não está logado, redirecionar para a página de login
      console.log("Usuário não está logado.");
      window.location.href = "./login.html";
    }
  });
}
