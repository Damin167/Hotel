document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o usuário é admin
    if (localStorage.getItem("isAdmin") !== "true") {
        // Se não for admin, redireciona para a página de login
        window.location.href = "index.html";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const listaReservas = document.getElementById("listaReservas");

    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    if (reservas.length === 0) {
        listaReservas.innerHTML = "<p>Não há reservas feitas ainda.</p>";
    } else {
        reservas.forEach(reserva => {
            const reservaDiv = document.createElement("div");
            reservaDiv.classList.add("reserva");

            reservaDiv.innerHTML = `
                <h3>Reserva para ${reserva.tipoQuarto}</h3>
                <p><strong>Data de Entrada:</strong> ${reserva.dataEntrada}</p>
                <p><strong>Data de Saída:</strong> ${reserva.dataSaida}</p>
                <p><strong>Número de Hospedes:</strong> ${reserva.numHospedes}</p>
                <p><strong>Total da Reserva:</strong> R$ ${reserva.total}</p>
            `;

            listaReservas.appendChild(reservaDiv);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const inputsImagem = document.querySelectorAll("input[type='file']");
    const btnSalvar = document.getElementById("salvar");

    inputsImagem.forEach(input => {
        input.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageId = event.target.id; // Exemplo: "img1", "img2", "img3"
                    localStorage.setItem(imageId, e.target.result); // Salva a imagem no localStorage
                };
                reader.readAsDataURL(file);
            }
        });
    });

    btnSalvar.addEventListener("click", function () {
        alert("Alterações salvas! As imagens serão atualizadas na visualização.");
    });
});



