

  //VERIFICAR SE USUARIO ESTA LOGADO
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
localStorage.setItem("email", user.email)

    } else {
 
      console.log("Usuário não está logado.");
      window.location.href = "../login/login.html";
    }
  });

  //VERIFICAR USUARIO LOCAL
  window.onload = function(){ 
  var data = localStorage.getItem("usuario");

  if (!data) {
    document.getElementById("myModal").style.display = "block";
  }else{
    document.querySelector("#nameop").innerHTML = '| ' + localStorage.getItem("usuario")
  }}

//FUNÇÃO DESLOGAR USUARIOS
function deslogar() {
    localStorage.clear()
    firebase.auth().signOut()
      .then(() => {

        window.location.href = "../login/login.html";
      })
      .catch((error) => {

        console.log("Erro ao fazer logout:", error);
      });
  }




//FUNCAO OPERADOR
function operador(){
    document.getElementById("modalpem").style.display = "block";

    document.querySelector(".menupage").style.filter = 'blur(3px)'
const menu = document.querySelector("#menu")
const operador = document.querySelector("#operador")
menu.style.display = 'none'
operador.style.display = 'flex'
document.querySelector("#btnenvreceita").style.display = 'none'
inicio()
document.querySelector("#btninicio li").innerText = 'Operador(a) ' + localStorage.getItem("usuario")
}

function back(){
    const menu = document.querySelector("#menu")
    const operador = document.querySelector("#operador")
    menu.style.display = 'flex'
    operador.style.display = 'none'
    }
    

//SUBMENU
function inicio(){
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
function preencher(){
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
function receitas(){
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
function todospac(){
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

function enviarreceitas(){
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
  

//FUNCAO ENFERMEIRA
function enfermeira(){
    document.getElementById("modalpem").style.display = "block";

    document.querySelector(".menupage").style.filter = 'blur(3px)'
operador()
document.querySelector("#btninicio li").innerText = 'Enfermeira(o) ' + localStorage.getItem("usuario")
document.querySelector("#btnenvreceita").style.display = 'block'
}



//FUNCAO ADMIN
function admin(){
const menu = document.querySelector("#menu")
menu.style.display = 'none'    
}


// MODAL


  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  function submitName() {
    var name = document.getElementById("nameInput").value;
    localStorage.setItem("usuario", name)
    document.querySelector("#nameop").innerHTML = '| ' + localStorage.getItem("usuario")
    closeModal();
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


  //PERMISAO ENFERMEIRA
  function passpem(){
if(document.querySelector("#passInput").value > ""){
    document.querySelector(".menupage").style.filter = 'blur(0px)'
    document.getElementById("modalpem").style.display = "none";
}
  }

  function modal(message,time){
    document.querySelector("#modalpadrao").style.display  = 'block'
    document.querySelector("#modalpadrao #message").innerHTML = message

    setTimeout(() => {
        document.querySelector("#modalpadrao").style.display  = 'none'
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


function logs(nome,data,email,usuario,acao,id){

firebase.firestore().collection("logs").add({
    nome: nome,
    data:data,
   email: email,
   usuario:usuario,
   acao:acao,
   id:id

})
.then((docRef) => {
    console.log("Log Salvo");
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
}


function exibirpacientes(){
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
var td1 = document.createElement('td');
td1.textContent = docData.regPaciente
tr.appendChild(td1);

var td2 = document.createElement('td');
td2.textContent = docData.idConversa
tr.appendChild(td2);

var td3 = document.createElement('td');
td3.textContent = docData.nome
tr.appendChild(td3);

var td4 = document.createElement('td');
td4.textContent = docData.exame
tr.appendChild(td4);

var td41= document.createElement('td');
td41.textContent = docData.demandaPaciente
tr.appendChild(td41);
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
    document.querySelector("#modalacao").style.display = 'block';
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
      
          firebase.firestore().collection("chamados").add({
            motivo: motivo,
            descricao: descricao,
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
  };
  
 
  
  
 
td8.appendChild(button);
tr.appendChild(td8);

// Anexar a linha (tr) à tabela
var table = document.getElementById('todospacientes'); // Substitua 'nomeDaTabela' pelo ID correto da sua tabela
table.appendChild(tr);

    });
  });

}






function exibirreceitas(){
    const db = firebase.firestore()
    document.querySelector("#exibirreceitas").innerHTML = ''
    db.collection("dessensibilizar").where("status", "==", 'Envio Pendente')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
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

var button1 = document.createElement('button');
button1.classList.add('buttonenv');
button1.textContent = 'Baixar Receita';
modalContent.appendChild(button1);

var button2 = document.createElement('button');
button2.classList.add('buttonenv');
button2.textContent = 'Abrir Huggy';
modalContent.appendChild(button2);

var button3 = document.createElement('button');
button3.classList.add('buttonenv');
button3.textContent = 'Baixar Whatsapp';
modalContent.appendChild(button3);

var button4 = document.createElement('button');
button4.classList.add('buttonenv');
button4.textContent = 'Reportar Erro';
modalContent.appendChild(button4);

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