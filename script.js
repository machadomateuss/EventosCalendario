window.onload = function () {
    gerarCalendario();
};

function gerarCalendario() {
    const calendario = document.getElementById('calendario');

    const dataAtual = new Date();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();

    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);

    const primeiroDiaDaSemana = primeiroDiaDoMes.getDay();
    const totalDias = ultimoDiaDoMes.getDate();

    for (let i = 0; i < primeiroDiaDaSemana; i++) {
        let diaVazio = document.createElement("div");
        calendario.appendChild(diaVazio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        let diaQuadrado = document.createElement("div");
        diaQuadrado.className = "dia-calendario";
        diaQuadrado.textContent = dia;
        diaQuadrado.id = `dia-${dia}`;
        calendario.appendChild(diaQuadrado);
    }
}

function mostrarModalAdicionarTarefa() {
    document.getElementById('modalAdicionarTarefa').style.display = 'block';
}

function fecharModalAdicionarTarefa() {
    document.getElementById('modalAdicionarTarefa').style.display = 'none';
}

function deletarTarefa(elementoTarefa) {

    if (confirm("Você tem certeza que deseja excluir esta tarefa?")) {
        elementoTarefa.parentNode.removeChild(elementoTarefa);
    }
}

function editarTarefa(elementoTarefa) {
    const novaDescricaoTarefa = prompt("Edite sua tarefa:", elementoTarefa.textContent);
    if (novaDescricaoTarefa !== null && novaDescricaoTarefa.trim() !== "") {
        elementoTarefa.textContent = novaDescricaoTarefa;
    }
}

function adicionarTarefa() {
    const dataTarefa = new Date(document.getElementById('data-tarefa').value);
    const descricaoTarefa = document.getElementById('descricao-tarefa').value.trim();

    if (descricaoTarefa && !isNaN(dataTarefa.getDate())) {
        const diasCalendario = document.getElementById('calendario').children;
        for (let i = 0; i < diasCalendario.length; i++) {
            const dia = diasCalendario[i];
            if (parseInt(dia.textContent) === dataTarefa.getDate()) {
                const elementoTarefa = document.createElement("div");
                elementoTarefa.className = "tarefa";
                elementoTarefa.textContent = descricaoTarefa;

                elementoTarefa.addEventListener("contextmenu", function (event) {
                    event.preventDefault(); 
                    deletarTarefa(elementoTarefa); 
                });

                elementoTarefa.addEventListener('click', function () {
                    editarTarefa(elementoTarefa); 
                });

                dia.appendChild(elementoTarefa);
                break;
            }
        }
        fecharModalAdicionarTarefa(); 
    } else {
        alert("Por favor, insira uma data e descrição de tarefa válidas!");
    }
}
