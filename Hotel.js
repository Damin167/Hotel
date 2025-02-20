document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            const targetId = this.getAttribute("href").substring(1); // Pega o ID da seção
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Ajuste para não cobrir o topo
                    behavior: "smooth" // Efeito de rolagem suave
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dataEntrada = document.getElementById("dataEntrada");
    const dataSaida = document.getElementById("dataSaida");
    const tipoQuarto = document.getElementById("tipoQuarto");
    const totalReserva = document.getElementById("totalReserva");
    const formReserva = document.getElementById("formReserva");
    const numHospedes = document.getElementById("numHospedes");

    const precos = {
        standard: 200,
        luxo: 350,
        suite: 500
    };

    let reserva = {}; 

    function calcularTotal() {
        const entrada = new Date(dataEntrada.value);
        const saida = new Date(dataSaida.value);
        const tipoSelecionado = tipoQuarto.value;

        if (entrada && saida && tipoSelecionado) {
            const diffTime = Math.abs(saida - entrada);
            const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDias > 0) {
                const precoTotal = diffDias * precos[tipoSelecionado];
                totalReserva.value = `R$ ${precoTotal},00`;
                reserva.total = precoTotal;
            } else {
                totalReserva.value = "";
            }
        }
    }

    dataEntrada.addEventListener("change", calcularTotal);
    dataSaida.addEventListener("change", calcularTotal);
    tipoQuarto.addEventListener("change", calcularTotal);

    formReserva.addEventListener('submit', function (event) {
        event.preventDefault();

        const dataEntradaValor = dataEntrada.value;
        const dataSaidaValor = dataSaida.value;
        const tipo = tipoQuarto.value;
        const numHospedesValor = parseInt(numHospedes.value);

        if (!dataEntradaValor || !dataSaidaValor || !tipo || !numHospedesValor) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        reserva = {
            dataEntrada: dataEntradaValor,
            dataSaida: dataSaidaValor,
            tipoQuarto: tipoQuarto.options[tipoQuarto.selectedIndex].text,
            numHospedes: numHospedesValor,
            total: reserva.total
        };

        
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        formReserva.reset();
        calcularTotal(); 

        alert('Reserva confirmada!');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const imagens = document.querySelectorAll("#quartos img");

    imagens.forEach(img => {
        const imagemSalva = localStorage.getItem(img.id);
        if (imagemSalva) {
            img.src = imagemSalva; // Atualiza a imagem se houver uma substituição no localStorage
        }
    });
});


