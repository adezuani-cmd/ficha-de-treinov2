document.addEventListener('DOMContentLoaded', () => {
    const formAluno = document.getElementById('form-aluno');
    const btnVoltar = document.getElementById('btn-voltar');

    if (formAluno) {
        formAluno.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const idade = document.getElementById('idade').value;
            const peso = document.getElementById('peso').value;
            const objetivoRadio = document.querySelector('input[name="objetivo"]:checked');
            const objetivo = objetivoRadio ? objetivoRadio.value : 'perda';

            const textoObjetivo = objetivo === 'perda' ? 'Perda de Peso' : 'Ganho de Massa';

            const elBoasVindas = document.getElementById('boas-vindas-user');
            const elDetalhes = document.getElementById('detalhes-user');
            
            if (elBoasVindas) elBoasVindas.innerText = `Ficha de Treino • ${nome}`;
            if (elDetalhes) elDetalhes.innerText = `${idade} anos | ${peso} kg | Objetivo: ${textoObjetivo}`;

            const fichaPerda = document.getElementById('ficha-perda');
            const fichaGanho = document.getElementById('ficha-ganho');

            if (objetivo === 'perda') {
                if (fichaPerda) fichaPerda.classList.remove('oculto');
                if (fichaGanho) fichaGanho.classList.add('oculto');
            } else {
                if (fichaGanho) fichaGanho.classList.remove('oculto');
                if (fichaPerda) fichaPerda.classList.add('oculto');
            }

            const telaBoasVindas = document.getElementById('tela-boas-vindas');
            const telaTreinos = document.getElementById('tela-treinos');

            if (telaBoasVindas) telaBoasVindas.classList.add('oculto');
            if (telaTreinos) telaTreinos.classList.remove('oculto');
        });
    }

    if (btnVoltar) {
        btnVoltar.addEventListener('click', function() {
            const telaBoasVindas = document.getElementById('tela-boas-vindas');
            const telaTreinos = document.getElementById('tela-treinos');

            if (telaTreinos) telaTreinos.classList.add('oculto');
            if (telaBoasVindas) telaBoasVindas.classList.remove('oculto');
        });
    }

    // Gerenciador das barras de progresso dos treinos
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

                if (barraFill) barraFill.style.width = `${porcentagem}%`;
                if (textoProgresso) textoProgresso.innerText = `${porcentagem}%`;

                if (msgConcluido) {
                    if (porcentagem === 100) {
                        msgConcluido.classList.remove('oculto');
                    } else {
                        msgConcluido.classList.add('oculto');
                    }
                }
            });
        });
    });
});