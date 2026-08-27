document.getElementById('form-aluno').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const objetivo = document.querySelector('input[name="objetivo"]:checked').value;

    const textoObjetivo = objetivo === 'perda' ? 'Perda de Peso' : 'Ganho de Massa';

    document.getElementById('boas-vindas-user').innerText = `Ficha de Treino • ${nome}`;
    document.getElementById('detalhes-user').innerText = `${idade} anos | ${peso} kg | Objetivo: ${textoObjetivo}`;

    if (objetivo === 'perda') {
        document.getElementById('ficha-perda').classList.remove('oculto');
        document.getElementById('ficha-ganho').classList.add('oculto');
    } else {
        document.getElementById('ficha-ganho').classList.remove('oculto');
        document.getElementById('ficha-perda').classList.add('oculto');
    }

    document.getElementById('tela-boas-vindas').classList.add('oculto');
    document.getElementById('tela-treinos').classList.remove('oculto');
});

document.getElementById('btn-voltar').addEventListener('click', function() {
    document.getElementById('tela-treinos').classList.add('oculto');
    document.getElementById('tela-boas-vindas').classList.remove('oculto');
});

document.querySelectorAll('.card-treino').forEach(card => {
    const checkboxes = card.querySelectorAll('.chk-exercicio');
    const barraFill = card.querySelector('.barra-progresso-fill');
    const textoProgresso = card.querySelector('.progresso-texto');
    const msgConcluido = card.querySelector('.mensagem-concluido');

    checkboxes.forEach(chk => {
        chk.addEventListener('change', () => {
            const total = checkboxes.length;
            const checados = card.querySelectorAll('.chk-exercicio:checked').length;
            const porcentagem = Math.round((checados / total) * 100);

            barraFill.style.width = `${porcentagem}%`;
            textoProgresso.innerText = `${porcentagem}%`;

            if (porcentagem === 100) {
                msgConcluido.classList.remove('oculto');
            } else {
                msgConcluido.classList.add('oculto');
            }
        });
    });
});