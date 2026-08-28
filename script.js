document.addEventListener('DOMContentLoaded', () => {
    let dadosAluno = JSON.parse(localStorage.getItem('dadosAluno')) || {};

    const btnIniciar = document.getElementById('btn-iniciar');
    const formAluno = document.getElementById('form-aluno');
    const formMetas = document.getElementById('form-metas');
    const btnAcessarFicha = document.getElementById('btn-acessar-ficha');
    const btnVoltar = document.getElementById('btn-voltar');

    // TELA 1 -> TELA 2
    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => {
            document.getElementById('tela-inicio').classList.add('oculto');
            document.getElementById('tela-perfil').classList.remove('oculto');
        });
    }

    // TELA 2 -> TELA 3
    if (formAluno) {
        formAluno.addEventListener('submit', (e) => {
            e.preventDefault();

            dadosAluno.nome = document.getElementById('nome').value;
            dadosAluno.idade = document.getElementById('idade').value;
            dadosAluno.pesoAtual = parseFloat(document.getElementById('peso').value);
            dadosAluno.objetivo = document.querySelector('input[name="objetivo"]:checked').value;

            const labelMeta = document.getElementById('label-peso-desejado');
            labelMeta.innerText = dadosAluno.objetivo === 'perda' 
                ? 'Peso Desejado para Emagrecer (kg):' 
                : 'Peso Desejado para Ganhar (kg):';

            localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));

            document.getElementById('tela-perfil').classList.add('oculto');
            document.getElementById('tela-metas').classList.remove('oculto');
        });
    }

    // TELA 3 -> CÁLCULO
    if (formMetas) {
        formMetas.addEventListener('submit', (e) => {
            e.preventDefault();

            dadosAluno.pesoMeta = parseFloat(document.getElementById('peso-meta').value);
            dadosAluno.meses = parseInt(document.getElementById('prazo-meses').value);

            localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));

            const resumoBox = document.getElementById('resumo-calculo-texto');
            const resultadoContainer = document.getElementById('resultado-meta');
            const nomeBtnDestaque = document.getElementById('nome-destaque-btn');

            let diferencaPeso = 0;
            let metaMensal = 0;
            let metaSemanal = 0;
            let avaliacaoRitmo = '';
            let corBadge = '';
            let mensagemResultado = '';

            const semanasTotais = dadosAluno.meses * 4.33;

            if (dadosAluno.objetivo === 'perda') {
                diferencaPeso = dadosAluno.pesoAtual - dadosAluno.pesoMeta;
                metaMensal = (diferencaPeso / dadosAluno.meses).toFixed(1);
                metaSemanal = (diferencaPeso / semanasTotais).toFixed(2);

                if (metaSemanal <= 0.5) {
                    avaliacaoRitmo = '🟢 Ritmo Confortável e Sustentável';
                    corBadge = '#2ea44f';
                } else if (metaSemanal <= 1.0) {
                    avaliacaoRitmo = '🟡 Ritmo Moderado e Eficiente';
                    corBadge = '#e3b341';
                } else {
                    avaliacaoRitmo = '🔴 Ritmo Intenso / Agressivo';
                    corBadge = '#8b0000';
                }

                mensagemResultado = `
                    <div class="card-resultado-meta">
                        <h3>🎯 Planejamento de Emagrecimento</h3>
                        <p>Eliminar: <strong>${diferencaPeso.toFixed(1)} kg</strong> em <strong>${dadosAluno.meses} mês(es)</strong></p>
                        <p>📅 Meta Mês: <strong>${metaMensal} kg/mês</strong> | Semana: <strong>${metaSemanal} kg/sem</strong></p>
                        <span class="badge-ritmo" style="background-color: ${corBadge};">${avaliacaoRitmo}</span>
                    </div>
                `;
            } else {
                diferencaPeso = dadosAluno.pesoMeta - dadosAluno.pesoAtual;
                metaMensal = (diferencaPeso / dadosAluno.meses).toFixed(1);
                metaSemanal = (diferencaPeso / semanasTotais).toFixed(2);

                if (metaSemanal <= 0.3) {
                    avaliacaoRitmo = '🟢 Ritmo Excelente (Hipertrofia Limpa)';
                    corBadge = '#2ea44f';
                } else {
                    avaliacaoRitmo = '🟡 Ritmo Acelerado';
                    corBadge = '#e3b341';
                }

                mensagemResultado = `
                    <div class="card-resultado-meta">
                        <h3>💪 Planejamento de Hipertrofia</h3>
                        <p>Ganhar: <strong>${diferencaPeso.toFixed(1)} kg</strong> em <strong>${dadosAluno.meses} mês(es)</strong></p>
                        <p>📅 Meta Mês: <strong>${metaMensal} kg/mês</strong> | Semana: <strong>${metaSemanal} kg/sem</strong></p>
                        <span class="badge-ritmo" style="background-color: ${corBadge};">${avaliacaoRitmo}</span>
                    </div>
                `;
            }

            resumoBox.innerHTML = mensagemResultado;
            nomeBtnDestaque.innerText = dadosAluno.nome.toUpperCase();
            resultadoContainer.classList.remove('oculto');
        });
    }

    // BOTÃO FICHA -> TELA 4
    if (btnAcessarFicha) {
        btnAcessarFicha.addEventListener('click', () => {
            const textoObj = dadosAluno.objetivo === 'perda' ? 'Perda de Peso' : 'Ganho de Massa';

            document.getElementById('boas-vindas-user').innerText = `Ficha de Treino • ${dadosAluno.nome}`;
            document.getElementById('detalhes-user').innerText = `${dadosAluno.idade} anos | ${dadosAluno.pesoAtual}kg ➔ ${dadosAluno.pesoMeta}kg em ${dadosAluno.meses} mês(es) | ${textoObj}`;

            if (dadosAluno.objetivo === 'perda') {
                document.getElementById('ficha-perda').classList.remove('oculto');
                document.getElementById('ficha-ganho').classList.add('oculto');
            } else {
                document.getElementById('ficha-ganho').classList.remove('oculto');
                document.getElementById('ficha-perda').classList.add('oculto');
            }

            document.getElementById('tela-metas').classList.add('oculto');
            document.getElementById('tela-treinos').classList.remove('oculto');
        });
    }

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            document.getElementById('tela-treinos').classList.add('oculto');
            document.getElementById('tela-perfil').classList.remove('oculto');
        });
    }
});