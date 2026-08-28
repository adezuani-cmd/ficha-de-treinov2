document.addEventListener('DOMContentLoaded', () => {
    let dadosAluno = JSON.parse(localStorage.getItem('dadosAluno')) || {};
    let progressoExer = JSON.parse(localStorage.getItem('progressoExer')) || {};

    // DADOS DAS FICHAS COMPLETAS DE SEGUNDA A SEXTA
    const treinosPerda = [
        {
            dia: "Segunda-Feira • Treino A",
            foco: "🦵 Quadríceps e Panturrilhas",
            exercicios: [
                { id: "p_a1", nome: "1. Leg Press 45º", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Carga progressiva. Desça o máximo sem tirar o quadril do banco.", guia: "Postura: Pés alinhados na largura dos ombros. Empurre pelo calcanhar e mantenha o joelho firme sem travar no topo." },
                { id: "p_a2", nome: "2. Agachamento Hack Machine ou Smith", series: "4x 10 reps", descanso: "90s", obs: "Controle bem a descida (3 segundos descendo).", guia: "Postura: Coluna bem apoiada. Desça suavemente mantendo a tensão na coxa." },
                { id: "p_a3", nome: "3. Cadeira Extensora", series: "4x 12 reps", descanso: "60s", obs: "Segure 2 segundos no topo em cada repetição.", guia: "Postura: Ajuste o encosto para o joelho ficar alinhado ao eixo do aparelho. Esmague o quadríceps em cima." },
                { id: "p_a4", nome: "4. Passada (Afundo) Caminhando", series: "3x 20 passos totais", descanso: "60s", obs: "Passos firmes e controlados.", guia: "Postura: Mantenha o tronco levemente inclinado para frente e o joelho da frente a 90º." },
                { id: "p_a5", nome: "5. Gêmeos Sentada (Panturrilha)", series: "4x 15 reps", descanso: "45s", obs: "Pausa rápida no topo.", guia: "Postura: Desça o máximo o calcanhar para alongar e suba até contrair totalmente a panturrilha." }
            ]
        },
        {
            dia: "Terça-Feira • Treino B",
            foco: "🎒 Costas, Bíceps e Abdômen",
            exercicios: [
                { id: "p_b1", nome: "1. Puxada Alta Pronada (Barra aberta)", series: "4x 10 reps", descanso: "75s", obs: "Puxe direcionando os cotovelos para baixo.", guia: "Postura: Peito estufado, puxe a barra até a altura do peito sem balançar o tronco." },
                { id: "p_b2", nome: "2. Remada Baixa Sentada com Triângulo", series: "4x 10 reps", descanso: "75s", obs: "Esmague as escápulas atrás ao puxar.", guia: "Postura: Tronco reto, puxe em direção ao umbigo fechando as costas." },
                { id: "p_b3", nome: "3. Puxada Articulada (ou Cavalinho)", series: "3x 12 reps", descanso: "60s", obs: "Movimento concentrado.", guia: "Postura: Mantenha o peito firme no apoio e puxe usando a força das costas." },
                { id: "p_b4", nome: "4. Rosca Direta com Halteres (Bíceps)", series: "3x 12 reps", descanso: "60s", obs: "Controle a volta.", guia: "Postura: Cotovelos colados ao corpo, sem balançar o quadril." },
                { id: "p_b5", nome: "5. Abdominal Infra Solo ou Paralela", series: "4x 15 reps", descanso: "45s", obs: "Foco no abdômen inferior.", guia: "Postura: Eleve o quadril levemente ao subir as pernas para ativar o abdômen sem forçar a lombar." }
            ]
        },
        {
            dia: "Quarta-Feira • Treino C",
            foco: "🍑 Glúteo Isolado e Posteriores",
            exercicios: [
                { id: "p_c1", nome: "1. Elevação Pélvica (Máquina ou Barra)", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Segure 1 segundo no topo contraindo o glúteo.", guia: "Postura: Queixo colado no peito, empurre o chão com os calcanhares." },
                { id: "p_c2", nome: "2. Cadeira Flexora", series: "4x (10 a 12 reps)", descanso: "60s", obs: "Movimento contínuo e suave.", guia: "Postura: Mantenha o tronco bem preso ao banco para isolar a posterior de coxa." },
                { id: "p_c3", nome: "3. Glúteo na Polia (Perna Estendida)", series: "3x 12 reps", descanso: "60s", obs: "Sem chutar usando a lombar.", guia: "Postura: Tronco inclinado, aperte o glúteo no ponto mais alto." },
                { id: "p_c4", nome: "4. Cadeira Abdutora", series: "4x 15 reps", descanso: "45s", obs: "Incline o tronco levemente para frente.", guia: "Postura: Força na parte lateral dos glúteos, empurrando os joelhos para fora." },
                { id: "p_c5", nome: "5. Stiff com Halteres", series: "3x 10 reps", descanso: "75s", obs: "Coluna bem reta.", guia: "Postura: Empurre o quadril para trás como se fosse fechar uma porta com o bumbum." }
            ]
        },
        {
            dia: "Quinta-Feira • Treino D",
            foco: "⏳ Ombros, Tríceps e Abdômen",
            exercicios: [
                { id: "p_d1", nome: "1. Desenvolvimento com Halteres (Sentada)", series: "4x 10 reps", descanso: "75s", obs: "Empurre na vertical.", guia: "Postura: Encosto firme, desça os halteres até a linha dos ouvidos e empurre." },
                { id: "p_d2", nome: "2. Elevação Lateral com Halteres", series: "4x (12 a 15 reps)", descanso: "60s", obs: "Suba até a linha do ombro.", guia: "Postura: Leve flexão nos cotovelos, eleve os braços pelas laterais como se estivesse despejando água de um copo." },
                { id: "p_d3", nome: "3. Tríceps na Polia (Corda)", series: "4x 12 reps", descanso: "60s", obs: "Abra a corda no final.", guia: "Postura: Cotovelos fixos ao lado das costelas, estenda o braço totalmente para baixo." },
                { id: "p_d4", nome: "4. Abdominal Supra com Carga (Anilha)", series: "4x 15 reps", descanso: "45s", obs: "Foco no topo do abdômen.", guia: "Postura: Anilha sobre o peito, solte o ar ao subir e contraia o abdômen." }
            ]
        },
        {
            dia: "Sexta-Feira • Treino E",
            foco: "🏃‍♀️ Cardio Metabólico + Estímulo de Glúteo",
            exercicios: [
                { id: "p_e1", nome: "1. Esteira com Inclinação", series: "40 minutos", descanso: "Contínuo", obs: "Caminhada rápida sem correr para proteger articulações.", guia: "Dica: Mantenha o ritmo acelerado e postura ereta." },
                { id: "p_e2", nome: "2. Cadeira Abdutora", series: "4x 20 reps", descanso: "45s", obs: "Foco na queima muscular.", guia: "Postura: Mantenha cadência constante." },
                { id: "p_e3", nome: "3. Elevação Pélvica no Solo", series: "3x 20 reps", descanso: "45s", obs: "Peso do corpo, contraia o glúteo no topo.", guia: "Postura: Suba rápido e desça devagar." },
                { id: "p_e4", nome: "4. Búlgaro", series: "4x 12 reps cada perna", descanso: "60s", obs: "Foco na coxa e glúteo.", guia: "Postura: Pé de trás num banco baixo, tronco ereto ao descer." },
                { id: "p_e5", nome: "5. Abdominal Prancha Isométrica", series: "3x Máximo de tempo", descanso: "60s", obs: "Corpo reto como uma tábua.", guia: "Postura: Cotovelos apoiados no chão sob os ombros, abdômen e glúteos travados." }
            ]
        }
    ];

    const treinosGanho = [
        {
            dia: "Segunda-Feira • Treino A",
            foco: "🦵 Quadríceps e Panturrilhas (Hipertrofia)",
            exercicios: [
                { id: "g_a1", nome: "1. Agachamento Livre", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Desça de forma controlada e mantenha o abdômen firme.", guia: "Postura: Pés um pouco além da largura dos ombros, barra bem apoiada no trapézio. Desça abrindo os joelhos." },
                { id: "g_a2", nome: "2. Leg Press Horizontal", series: "4x (10 a 12 reps)", descanso: "90s", obs: "Não estenda completamente os joelhos no final.", guia: "Postura: Empurre com os calcanhares mantendo a tensão constante na coxa." },
                { id: "g_a3", nome: "3. Cadeira Extensora Unilateral", series: "3x 12 reps cada perna", descanso: "60s", obs: "Controle a volta do movimento.", guia: "Postura: Faça o movimento de forma limpa, sem usar o balanço do corpo." },
                { id: "g_a4", nome: "4. Step-up no Banco", series: "3x 10 reps cada perna", descanso: "60s", obs: "Suba impulsionando principalmente pela perna da frente.", guia: "Postura: Suba com calma e controle a descida sem despencar o pé." },
                { id: "g_a5", nome: "5. Panturrilha em Pé na Máquina", series: "4x (12 a 15 reps)", descanso: "45s", obs: "Boa amplitude, desça bem o calcanhar.", guia: "Postura: Segure 1 segundo no ponto mais alto da subida." }
            ]
        },
        {
            dia: "Terça-Feira • Treino B",
            foco: "💪 Costas, Bíceps e Abdômen (Hipertrofia)",
            exercicios: [
                { id: "g_b1", nome: "1. Puxada Alta com Pegada Neutra", series: "4x (8 a 10 reps)", descanso: "75s", obs: "Evite balançar o corpo durante a puxada.", guia: "Postura: Puxe as manoplas até a parte superior do peito abrindo a caixa torácica." },
                { id: "g_b2", nome: "2. Remada Unilateral com Halter", series: "4x 10 reps cada lado", descanso: "75s", obs: "Puxe o cotovelo em direção ao quadril.", guia: "Postura: Joelho e mão opostos no banco, mantendo as costas paralelas ao chão." },
                { id: "g_b3", nome: "3. Remada Máquina com Pegada Aberta", series: "3x 12 reps", descanso: "60s", obs: "Foco nas escápulas.", guia: "Postura: Abra os cotovelos para atingir o meio das costas." },
                { id: "g_b4", nome: "4. Rosca Scott na Máquina", series: "3x (10 a 12 reps)", descanso: "60s", obs: "Isolamento total do bíceps.", guia: "Postura: Braços bem apoiados, sem tirar a axila do acolchoado." },
                { id: "g_b5", nome: "5. Abdominal na Máquina", series: "4x (12 a 15 reps)", descanso: "45s", obs: "Carga progressiva.", guia: "Postura: Enrole o tronco aproximando as costelas do quadril." }
            ]
        },
        {
            dia: "Quarta-Feira • Treino C",
            foco: "🍑 Glúteos e Posteriores (Hipertrofia)",
            exercicios: [
                { id: "g_c1", nome: "1. Agachamento Sumô com Halter", series: "4x 10 reps", descanso: "90s", obs: "Pés apontados para fora.", guia: "Postura: Joelhos seguindo a ponta dos pés, tronco o mais ereto possível." },
                { id: "g_c2", nome: "2. Mesa Flexora", series: "4x (10 a 12 reps)", descanso: "60s", obs: "Controle principalmente a descida.", guia: "Postura: Quadril colado no banco, dobre os joelhos puxando os calcanhares em direção ao bumbum." },
                { id: "g_c3", nome: "3. Extensão de Quadril na Máquina", series: "3x 12 reps cada perna", descanso: "60s", obs: "Contraia o glúteo no final.", guia: "Postura: Movimento focado no quadril, mantendo a lombar neutra." },
                { id: "g_c4", nome: "4. Pull-through na Polia", series: "3x 12 reps", descanso: "75s", obs: "Empurre o quadril para frente.", guia: "Postura: Corda entre as pernas, tronco inclina mantendo as costas retas." },
                { id: "g_c5", nome: "5. Cadeira Abdutora", series: "4x (15 a 20 reps)", descanso: "45s", obs: "Movimento lento sem deixar o peso bater.", guia: "Postura: Mantenha a pressão externa constante nos joelhos." }
            ]
        },
        {
            dia: "Quinta-Feira • Treino D",
            foco: "⏳ Ombros, Peito e Tríceps",
            exercicios: [
                { id: "g_d1", nome: "1. Supino Inclinado com Halteres", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Foco na parte superior do peito.", guia: "Postura: Banco a 30º-45º, escápulas fechadas atrás." },
                { id: "g_d2", nome: "2. Crucifixo na Máquina", series: "3x 12 reps", descanso: "60s", obs: "Controle a abertura.", guia: "Postura: Cotovelos levemente dobrados, abra sentindo alongar o peitoral." },
                { id: "g_d3", nome: "3. Desenvolvimento na Máquina", series: "3x 10 reps", descanso: "75s", obs: "Empurre até o topo.", guia: "Postura: Cotovelos levemente à frente do corpo durante a descida." },
                { id: "g_d4", nome: "4. Elevação Lateral na Máquina", series: "4x (12 a 15 reps)", descanso: "60s", obs: "Tensão constante nos ombros.", guia: "Postura: Eleve os braços até a altura dos ombros sem dar impulsos." },
                { id: "g_d5", nome: "5. Tríceps Francês com Halter", series: "3x (10 a 12 reps)", descanso: "60s", obs: "Flexão total do cotovelo.", guia: "Postura: Cotovelos apontando para o teto, desça o halter atrás da cabeça." },
                { id: "g_d6", nome: "6. Abdominal na Polia", series: "3x 15 reps", descanso: "45s", obs: "Carga moderada.", guia: "Postura: Ajoelhado, puxe a corda curvando o tronco em direção às coxas." }
            ]
        },
        {
            dia: "Sexta-Feira • Treino E",
            foco: "🍑 Glúteos + Posteriores (Foco de Carga)",
            exercicios: [
                { id: "g_e1", nome: "1. Hip Thrust na Máquina", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Pausa de 1-2s no topo.", guia: "Postura: Trave o quadril lá em cima e aperte forte o glúteo antes de baixar." },
                { id: "g_e2", nome: "2. Stiff no Smith", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Empurre o quadril para trás.", guia: "Postura: Joelhos com microflexão, desça a barra rentável às coxas." },
                { id: "g_e3", nome: "3. Afundo Reverso com Halteres", series: "3x 10 reps cada perna", descanso: "75s", obs: "Passo longo para trás.", guia: "Postura: Dê o passo para trás e apoie o joelho suavemente perto do chão." },
                { id: "g_e4", nome: "4. Glúteo no Banco 45º", series: "3x (12 a 15 reps)", descanso: "60s", obs: "Concentre no quadril.", guia: "Postura: Curve levemente a parte alta das costas para focar nos glúteos." },
                { id: "g_e5", nome: "5. Cadeira Abdutora", series: "4x (15 a 20 reps)", descanso: "45s", obs: "Exaustão final.", guia: "Postura: Mantenha o movimento sob controle na ida e na volta." },
                { id: "g_e6", nome: "6. Panturrilha no Leg Press", series: "4x 15 reps", descanso: "45s", obs: "Extensão total da ponta do pé.", guia: "Postura: Apenas a ponta dos pés na plataforma, empurre afastando os calcanhares." }
            ]
        }
    ];

    const btnIniciar = document.getElementById('btn-iniciar');
    const formAluno = document.getElementById('form-aluno');
    const formMetas = document.getElementById('form-metas');
    const btnAcessarFicha = document.getElementById('btn-acessar-ficha');
    const btnVoltar = document.getElementById('btn-voltar');

    // NAVEGAÇÃO
    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => {
            document.getElementById('tela-inicio').classList.add('oculto');
            document.getElementById('tela-perfil').classList.remove('oculto');
        });
    }

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

    if (btnAcessarFicha) {
        btnAcessarFicha.addEventListener('click', () => {
            const textoObj = dadosAluno.objetivo === 'perda' ? 'Perda de Gordura' : 'Ganho de Massa';

            document.getElementById('boas-vindas-user').innerText = `Ficha de Treino • ${dadosAluno.nome}`;
            document.getElementById('detalhes-user').innerText = `${dadosAluno.idade} anos | ${dadosAluno.pesoAtual}kg ➔ ${dadosAluno.pesoMeta}kg em ${dadosAluno.meses} mês(es) | ${textoObj}`;

            renderizarFichas(dadosAluno.objetivo);

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

    // MONTAGEM DINÂMICA DAS FICHAS
    function renderizarFichas(objetivo) {
        const container = document.getElementById('fichas-container');
        container.innerHTML = '';

        const listaTreinos = objetivo === 'perda' ? treinosPerda : treinosGanho;

        listaTreinos.forEach((card, index) => {
            const totalExer = card.exercicios.length;
            let concluidos = 0;

            let htmlExercicios = '';
            card.exercicios.forEach(ex => {
                const checado = progressoExer[ex.id] ? 'checked' : '';
                if (progressoExer[ex.id]) concluidos++;

                htmlExercicios += `
                    <li class="item-exercicio">
                        <div class="exercicio-linha">
                            <input type="checkbox" class="chk-exercicio" data-id="${ex.id}" data-card="${index}" ${checado}>
                            <div class="info-exercicio">
                                <strong>${ex.nome}</strong> — ${ex.series} | <i>${ex.descanso} descanso</i>
                                <small>${ex.obs}</small>
                            </div>
                        </div>
                        <button class="btn-guia" onclick="toggleGuia('${ex.id}')">💡 Guia de Execução & Postura</button>
                        <div id="guia-${ex.id}" class="box-execucao oculto">
                            <strong>Como executar:</strong> ${ex.guia}
                        </div>
                    </li>
                `;
            });

            const porc = Math.round((concluidos / totalExer) * 100);

            const cardHtml = `
                <div class="card-treino">
                    <div class="header-card">
                        <div>
                            <h2>${card.dia}</h2>
                            <h3>${card.foco}</h3>
                        </div>
                        <span class="progresso-texto" id="porc-${index}">${porc}%</span>
                    </div>
                    <div class="barra-progresso-bg">
                        <div class="barra-progresso-fill" id="barra-${index}" style="width: ${porc}%;"></div>
                    </div>
                    <div class="mensagem-concluido ${porc === 100 ? '' : 'oculto'}" id="msg-${index}">🎉 Treino Concluído! Excelente trabalho!</div>
                    <ul>${htmlExercicios}</ul>
                </div>
            `;
            container.innerHTML += cardHtml;
        });

        // EVENTO CHECKBOXES E ATUALIZAÇÃO DO PROGRESSO
        document.querySelectorAll('.chk-exercicio').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const cardIdx = e.target.getAttribute('data-card');

                progressoExer[id] = e.target.checked;
                localStorage.setItem('progressoExer', JSON.stringify(progressoExer));

                atualizarProgressoCard(cardIdx, listaTreinos[cardIdx]);
            });
        });
    }

    function atualizarProgressoCard(cardIdx, cardData) {
        const totalExer = cardData.exercicios.length;
        let concluidos = 0;

        cardData.exercicios.forEach(ex => {
            if (progressoExer[ex.id]) concluidos++;
        });

        const porc = Math.round((concluidos / totalExer) * 100);

        document.getElementById(`porc-${cardIdx}`).innerText = `${porc}%`;
        document.getElementById(`barra-${cardIdx}`).style.width = `${porc}%`;

        const msgBox = document.getElementById(`msg-${cardIdx}`);
        if (porc === 100) {
            msgBox.classList.remove('oculto');
        } else {
            msgBox.classList.add('oculto');
        }
    }
});

// ABRIR/FECHAR O GUIA DE EXECUÇÃO DOS EXERCÍCIOS
function toggleGuia(id) {
    const box = document.getElementById(`guia-${id}`);
    box.classList.toggle('oculto');
}