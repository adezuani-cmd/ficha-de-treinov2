document.addEventListener('DOMContentLoaded', () => {
    let dadosAluno = {};

    const formAluno = document.getElementById('form-aluno');
    const formMetas = document.getElementById('form-metas');
    const btnAcessarFicha = document.getElementById('btn-acessar-ficha');
    const btnVoltar = document.getElementById('btn-voltar');

    // ETAPA 1 -> ETAPA 2
    if (formAluno) {
        formAluno.addEventListener('submit', (e) => {
            e.preventDefault();

            dadosAluno.nome = document.getElementById('nome').value;
            dadosAluno.idade = document.getElementById('idade').value;
            dadosAluno.pesoAtual = parseFloat(document.getElementById('peso').value);
            dadosAluno.objetivo = document.querySelector('input[name="objetivo"]:checked').value;

            const labelMeta = document.getElementById('label-peso-desejado');
            if (dadosAluno.objetivo === 'perda') {
                labelMeta.innerText = 'Peso Desejado para Emagrecer (kg):';
            } else {
                labelMeta.innerText = 'Peso Desejado para Ganhar (kg):';
            }

            document.getElementById('tela-boas-vindas').classList.add('oculto');
            document.getElementById('tela-metas').classList.remove('oculto');
        });
    }

    // ETAPA 2 -> CÁLCULO DAS METAS MENSAL E SEMANAL
    if (formMetas) {
        formMetas.addEventListener('submit', (e) => {
            e.preventDefault();

            dadosAluno.pesoMeta = parseFloat(document.getElementById('peso-meta').value);
            dadosAluno.meses = parseInt(document.getElementById('prazo-meses').value);

            const resumoBox = document.getElementById('resumo-calculo-texto');
            const resultadoContainer = document.getElementById('resultado-meta');
            const nomeBtnDestaque = document.getElementById('nome-destaque-btn');

            let diferencaPeso = 0;
            let metaMensal = 0;
            let metaSemanal = 0;
            let avaliacaoRitmo = '';
            let corBadge = '';
            let mensagemResultado = '';

            const semanasTotais = dadosAluno.meses * 4.33; // Média exata de semanas por mês

            if (dadosAluno.objetivo === 'perda') {
                diferencaPeso = dadosAluno.pesoAtual - dadosAluno.pesoMeta;
                
                if (diferencaPeso <= 0) {
                    alert('Para perda de peso, o peso desejado deve ser menor que o peso atual!');
                    return;
                }

                metaMensal = (diferencaPeso / dadosAluno.meses).toFixed(1);
                metaSemanal = (diferencaPeso / semanasTotais).toFixed(2);

                // Validação de ritmo seguro para perda de peso (0.5kg a 1kg por semana é saudável)
                if (metaSemanal <= 0.5) {
                    avaliacaoRitmo = '🟢 Ritmo Confortável e Sustentável';
                    corBadge = '#2ea44f';
                } else if (metaSemanal <= 1.0) {
                    avaliacaoRitmo = '🟡 Ritmo Moderado e Eficiente';
                    corBadge = '#e3b341';
                } else {
                    avaliacaoRitmo = '🔴 Ritmo Intenso / Agressivo (Exige disciplina rigorosa)';
                    corBadge = '#e50914';
                }

                mensagemResultado = `
                    <div class="card-resultado-meta">
                        <h3>🎯 Planejamento de Emagrecimento</h3>
                        <p>Para ir de <strong>${dadosAluno.pesoAtual} kg</strong> até <strong>${dadosAluno.pesoMeta} kg</strong> em <strong>${dadosAluno.meses} mês(es)</strong>:</p>
                        <hr class="divisor-suave">
                        <p>📉 Eliminar no total: <strong>${diferencaPeso.toFixed(1)} kg</strong></p>
                        <p>📅 Meta por Mês: <strong>${metaMensal} kg/mês</strong></p>
                        <p class="destaque-ritmo">⚡ Meta por Semana: <strong>${metaSemanal} kg/semana</strong></p>
                        <span class="badge-ritmo" style="background-color: ${corBadge};">${avaliacaoRitmo}</span>
                    </div>
                `;
            } else {
                diferencaPeso = dadosAluno.pesoMeta - dadosAluno.pesoAtual;

                if (diferencaPeso <= 0) {
                    alert('Para ganho de massa, o peso desejado deve ser maior que o peso atual!');
                    return;
                }

                metaMensal = (diferencaPeso / dadosAluno.meses).toFixed(1);
                metaSemanal = (diferencaPeso / semanasTotais).toFixed(2);

                // Validação de ritmo seguro para ganho de massa magra (0.25kg a 0.5kg por semana é o ideal)
                if (metaSemanal <= 0.3) {
                    avaliacaoRitmo = '🟢 Ritmo Excelente (Foco em Massa Magra Limpa)';
                    corBadge = '#2ea44f';
                } else if (metaSemanal <= 0.6) {
                    avaliacaoRitmo = '🟡 Ritmo Acelerado';
                    corBadge = '#e3b341';
                } else {
                    avaliacaoRitmo = '🔴 Ritmo Desafiador para Ganho Limpo';
                    corBadge = '#e50914';
                }

                mensagemResultado = `
                    <div class="card-resultado-meta">
                        <h3>💪 Planejamento de Hipertrofia (Ganho)</h3>
                        <p>Para ir de <strong>${dadosAluno.pesoAtual} kg</strong> até <strong>${dadosAluno.pesoMeta} kg</strong> em <strong>${dadosAluno.meses} mês(es)</strong>:</p>
                        <hr class="divisor-suave">
                        <p>📈 Ganhar no total: <strong>${diferencaPeso.toFixed(1)} kg</strong></p>
                        <p>📅 Meta por Mês: <strong>${metaMensal} kg/mês</strong></p>
                        <p class="destaque-ritmo">⚡ Meta por Semana: <strong>${metaSemanal} kg/semana</strong></p>
                        <span class="badge-ritmo" style="background-color: ${corBadge};">${avaliacaoRitmo}</span>
                    </div>
                `;
            }

            resumoBox.innerHTML = mensagemResultado;
            nomeBtnDestaque.innerText = dadosAluno.nome.toUpperCase();
            resultadoContainer.classList.remove('oculto');
        });
    }

    // BOTÃO EM DESTAQUE -> NAVEGA PARA FICHA
    if (btnAcessarFicha) {
        btnAcessarFicha.addEventListener('click', () => {
            const textoObj = dadosAluno.objetivo === 'perda' ? 'Perda de Peso' : 'Ganho de Massa';

            document.getElementById('boas-vindas-user').innerText = `Ficha de Treino • ${dadosAluno.nome}`;
            document.getElementById('detalhes-user').innerText = `${dadosAluno.idade} anos | Atual: ${dadosAluno.pesoAtual}kg ➔ Meta: ${dadosAluno.pesoMeta}kg em ${dadosAluno.meses} mês(es) | Objetivo: ${textoObj}`;

            const fichaPerda = document.getElementById('ficha-perda');
            const fichaGanho = document.getElementById('ficha-ganho');

            if (dadosAluno.objetivo === 'perda') {
                fichaPerda.classList.remove('oculto');
                fichaGanho.classList.add('oculto');
            } else {
                fichaGanho.classList.remove('oculto');
                fichaPerda.classList.add('oculto');
            }

            document.getElementById('tela-metas').classList.add('oculto');
            document.getElementById('tela-treinos').classList.remove('oculto');
        });
    }

    // BOTÃO VOLTAR
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            document.getElementById('tela-treinos').classList.add('oculto');
            document.getElementById('tela-metas').classList.remove('oculto');
        });
    }

    // CHECKBOXES E PROGRESSO
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