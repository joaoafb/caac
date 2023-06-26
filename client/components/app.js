//ONLOAD
document.addEventListener("DOMContentLoaded", function() {

    firebase.firestore().collection("admin").where("senha", "==", localStorage.getItem("pass"))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const pem = doc.data().pem;


                if (pem == 0) {
                    menupem0();
                } else if (pem == 1) {
                    menupem1();
                } else if (pem == 2) {
                    menupem2();
                } else if (pem == 3) {
                    menupem3();
                } else if (pem == 4) {
                    menupem4();
                }

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

});


//ENVIAR LOGS

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


//FUNÇÃO DESLOGAR USUARIOS
function deslogar() {
    localStorage.clear()
    firebase.auth().signOut()
        .then(() => {

            window.location.href = "./login.html";
        })
        .catch((error) => {

            console.log("Erro ao fazer logout:", error);
        });
}