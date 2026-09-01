document.addEventListener('DOMContentLoaded', () => {
    // Leitura segura do localStorage
    let dadosAluno = JSON.parse(localStorage.getItem('dadosAluno')) || {};
    let progressoExer = JSON.parse(localStorage.getItem('progressoExer')) || {};
document.addEventListener('DOMContentLoaded', () => {
    // 1. VERIFICA SE JÁ EXISTE SESSÃO ATIVA
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    // Variáveis globais para os dados do usuário atual
    let dadosAluno = {};
    let progressoExer = {};

    const telaLogin = document.getElementById('tela-login');
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Pega o e-mail digitado no campo de login
        const emailInput = document.getElementById('email-login')?.value || '';
        
        if (emailInput) {
            // Salva o e-mail no localStorage para manter a sessão
            localStorage.setItem('usuarioLogado', JSON.stringify({ email: emailInput }));
            
            // Carrega os dados específicos desse e-mail
            carregarDadosDoUsuario(emailInput);
            
            // Esconde a tela de login e mostra a tela principal/treinos
            document.getElementById('tela-login')?.classList.add('oculto');
            document.getElementById('tela-inicio')?.classList.remove('oculto');
        }
    });
}

    // 2. FUNÇÃO PARA CARREGAR OS DADOS EXCLUSIVOS DO USUÁRIO QUE FEZ LOGIN
    function carregarDadosDoUsuario(email) {
        // Usa o e-mail como chave única para cada usuário
        const chaveAluno = `dadosAluno_${email}`;
        const chaveProgresso = `progressoExer_${email}`;

        dadosAluno = JSON.parse(localStorage.getItem(chaveAluno)) || {};
        progressoExer = JSON.parse(localStorage.getItem(chaveProgresso)) || {};
    }

    // 3. SE JÁ ESTÁ LOGADO, CARREGA OS DADOS DAFICHA DAQUELE E-MAIL ESPECÍFICO
    if (usuarioLogado && usuarioLogado.email) {
        carregarDadosDoUsuario(usuarioLogado.email);

        ocultarTodasTelas();
        if (dadosAluno.nome) {
            // Se já preencheu o perfil (perda de gordura/massa, etc.), vai direto para os treinos dele
            document.getElementById('tela-treinos')?.classList.remove('oculto');
        } else {
            // Se é o primeiro acesso desse e-mail, vai para a tela de preenchimento de perfil/metas
            document.getElementById('tela-inicio')?.classList.remove('oculto');
        }
    } else {
        // Se ninguém está logado, exibe a tela de login
        ocultarTodasTelas();
        telaLogin?.classList.remove('oculto');
    }

   // 4. AO LOGAR OU CADASTRAR UM NOVO E-MAIL (Escutando o botão direto)
const btnLogin = document.querySelector('#form-login button') || document.querySelector('#form-login input[type="submit"]');

if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault(); // Trava a atualização da página imediatamente

        // Busca o campo de e-mail
        const inputEmail = document.getElementById('email-login') || document.querySelector('#form-login input[type="email"]');
        const emailInput = inputEmail ? inputEmail.value.toLowerCase().trim() : '';

        if (!emailInput) {
            alert('Por favor, informe seu e-mail.');
            return;
        }

        // Salva a sessão do usuário
        usuarioLogado = { email: emailInput, logado: true };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        // Carrega os dados salvos desse e-mail
        carregarDadosDoUsuario(emailInput);

        // Troca as telas na hora
        ocultarTodasTelas();

        if (dadosAluno && dadosAluno.nome) {
            document.getElementById('tela-treinos')?.classList.remove('oculto');
        } else {
            document.getElementById('tela-inicio')?.classList.remove('oculto');
        }
    });
}
            ocultarTodasTelas();

            // Se o usuário desse e-mail já configurou sua ficha antes, vai pro treino dele.
            // Se for um e-mail novo, vai para o formulário de cadastro de metas/pesos.
            if (dadosAluno.nome) {
                document.getElementById('tela-treinos')?.classList.remove('oculto');
            } else {
                document.getElementById('tela-inicio')?.classList.remove('oculto');
            }
        });

// 5. QUANDO O USUÁRIO SALVAR O PERFIL (Peso, Objetivo de Gordura/Massa, etc.)
// Certifique-se de salvar na chave individual do e-mail dele:
const formPerfil = document.getElementById('form-perfil');
if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coleta os dados digitados na tela
            dadosAluno.nome = document.getElementById('nome-aluno')?.value || 'Atleta';
            dadosAluno.pesoAtual = document.getElementById('peso-atual')?.value || '--';
            dadosAluno.pesoMeta = document.getElementById('peso-meta')?.value || '--';
            dadosAluno.objetivo = document.getElementById('objetivo-aluno')?.value || 'Geral';

            // Salva no localStorage com o e-mail do usuário logado
            if (usuarioLogado && usuarioLogado.email) {
                localStorage.setItem(`dadosAluno_${usuarioLogado.email}`, JSON.stringify(dadosAluno));
            }

            ocultarTodasTelas();
            document.getElementById('tela-treinos')?.classList.remove('oculto');
        });
    }

    const treinosPerda = [
        {
            dia: "Segunda-Feira • Treino A",
            foco: "🦵 Quadríceps e Panturrilhas",
            tempoEst: "⏱️ ~50 min",
            caloriasEst: "🔥 ~380 kcal",
            exercicios: [
                { id: "p_a1", nome: "1. Leg Press 45º", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Carga progressiva. Desça o máximo sem tirar o quadril do banco.", guia: "Pés na largura dos ombros. Empurre pelo calcanhar e mantenha o joelho firme sem travar no topo." },
                { id: "p_a2", nome: "2. Agachamento Hack Machine ou Smith", series: "4x 10 reps", descanso: "90s", obs: "Controle bem a descida (3 segundos descendo).", guia: "Coluna bem apoiada. Desça suavemente mantendo a tensão na coxa." },
                { id: "p_a3", nome: "3. Cadeira Extensora", series: "4x 12 reps", descanso: "60s", obs: "Segure 2 segundos no topo em cada repetição.", guia: "Joelho alinhado ao eixo do aparelho. Esmague a coxa no topo." },
                { id: "p_a4", nome: "4. Passada (Afundo) Caminhando", series: "3x 20 passos totais", descanso: "60s", obs: "Passos firmes e controlados.", guia: "Tronco levemente inclinado para frente, joelho da frente dobrando a 90º." },
                { id: "p_a5", nome: "5. Gêmeos Sentada (Panturrilha)", series: "4x 15 reps", descanso: "45s", obs: "Pausa rápida no topo.", guia: "Desça o máximo o calcanhar para locks e suba até contrair a panturrilha." }
            ]
        },
        {
            dia: "Terça-Feira • Treino B",
            foco: "🎒 Costas, Bíceps e Abdômen",
            tempoEst: "⏱️ ~45 min",
            caloriasEst: "🔥 ~320 kcal",
            exercicios: [
                { id: "p_b1", nome: "1. Puxada Alta Pronada (Barra aberta)", series: "4x 10 reps", descanso: "75s", obs: "Puxe direcionando os cotovelos para baixo.", guia: "Peito estufado, puxe a barra até a altura do peito sem balançar o corpo." },
                { id: "p_b2", nome: "2. Remada Baixa Sentada com Triângulo", series: "4x 10 reps", descanso: "75s", obs: "Esmague as costas atrás ao puxar.", guia: "Tronco reto, puxe em direção ao umbigo fechando as costas." },
                { id: "p_b3", nome: "3. Puxada Articulada (ou Cavalinho)", series: "3x 12 reps", descanso: "60s", obs: "Movimento concentrado.", guia: "Peito firme no apoio, puxe usando a força das costas." },
                { id: "p_b4", nome: "4. Rosca Direta com Halteres (Bíceps)", series: "3x 12 reps", descanso: "60s", obs: "Controle a volta.", guia: "Cotovelos colados ao corpo, sem balançar o quadril." },
                { id: "p_b5", nome: "5. Abdominal Infra Solo ou Paralela", series: "4x 15 reps", descanso: "45s", obs: "Foco no abdômen inferior.", guia: "Eleve o quadril levemente ao subir as pernas para ativar o abdômen." }
            ]
        },
        {
            dia: "Quarta-Feira • Treino C",
            foco: "🍑 Glúteo Isolado e Posteriores",
            tempoEst: "⏱️ ~50 min",
            caloriasEst: "🔥 ~350 kcal",
            exercicios: [
                { id: "p_c1", nome: "1. Elevação Pélvica (Máquina ou Barra)", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Segure 1 segundo no topo contraindo o glúteo.", guia: "Queixo no peito, empurre o chão com os calcanhares." },
                { id: "p_c2", nome: "2. Cadeira Flexora", series: "4x (10 a 12 reps)", descanso: "60s", obs: "Movimento contínuo e suave.", guia: "Tronco bem preso ao banco para isolar a parte de trás da coxa." },
                { id: "p_c3", nome: "3. Glúteo na Polia (Perna Estendida)", series: "3x 12 reps", descanso: "60s", obs: "Sem chutar usando a lombar.", guia: "Tronco inclinado, aperte o glúteo no ponto mais alto." },
                { id: "p_c4", nome: "4. Cadeira Abdutora", series: "4x 15 reps", descanso: "45s", obs: "Incline o tronco levemente para frente.", guia: "Força na parte lateral dos glúteos, empurrando os joelhos para fora." },
                { id: "p_c5", nome: "5. Stiff com Halteres", series: "3x 10 reps", descanso: "75s", obs: "Coluna bem reta.", guia: "Empurre o quadril para trás mantendo as costas bem alinhadas." }
            ]
        },
        {
            dia: "Quinta-Feira • Treino D",
            foco: "⏳ Ombros, Tríceps e Abdômen",
            tempoEst: "⏱️ ~45 min",
            caloriasEst: "🔥 ~300 kcal",
            exercicios: [
                { id: "p_d1", nome: "1. Desenvolvimento com Halteres (Sentada)", series: "4x 10 reps", descanso: "75s", obs: "Empurre na vertical.", guia: "Encosto firme, desça os halteres até a linha dos ouvidos e empurre." },
                { id: "p_d2", nome: "2. Elevação Lateral com Halteres", series: "4x (12 a 15 reps)", descanso: "60s", obs: "Suba até a linha do ombro.", guia: "Cotovelos levemente dobrados, suba os braços até a linha dos ombros." },
                { id: "p_d3", nome: "3. Tríceps na Polia (Corda)", series: "4x 12 reps", descanso: "60s", obs: "Abra a corda no final.", guia: "Cotovelos fixos ao lado do corpo, estenda o braço totalmente para baixo." },
                { id: "p_d4", nome: "4. Abdominal Supra com Carga (Anilha)", series: "4x 15 reps", descanso: "45s", obs: "Foco no topo do abdômen.", guia: "Anilha sobre o peito, solte o ar ao subir e aperte o abdômen." }
            ]
        },
        {
            dia: "Sexta-Feira • Treino E",
            foco: "🏃‍♀️ Cardio Metabólico + Estímulo de Glúteo",
            tempoEst: "⏱️ ~60 min",
            caloriasEst: "🔥 ~450 kcal",
            exercicios: [
                { id: "p_e1", nome: "1. Esteira com Inclinação", series: "40 minutos", descanso: "Contínuo", obs: "Caminhada rápida sem correr para proteger articulações.", guia: "Mantenha o ritmo acelerado e postura ereta." },
                { id: "p_e2", nome: "2. Cadeira Abdutora", series: "4x 20 reps", descanso: "45s", obs: "Foco na queima muscular.", guia: "Mantenha velocidade constante na execução." },
                { id: "p_e3", nome: "3. Elevação Pélvica no Solo", series: "3x 20 reps", descanso: "45s", obs: "Suba e contraia o glúteo no topo.", guia: "Suba rápido e desça em 2 segundos." },
                { id: "p_e4", nome: "4. Búlgaro", series: "4x 12 reps cada perna", descanso: "60s", obs: "Foco na coxa e glúteo.", guia: "Pé de trás no banco, tronco levemente inclinado ao descer." },
                { id: "p_e5", nome: "5. Abdominal Prancha Isométrica", series: "3x Máximo de tempo", descanso: "60s", obs: "Corpo reto.", guia: "Cotovelos no chão, barriga e bumbum bem travados." }
            ]
        }
    ];

    const treinosGanho = [
        {
            dia: "Segunda-Feira • Treino A",
            foco: "🦵 Quadríceps e Panturrilhas (Hipertrofia)",
            tempoEst: "⏱️ ~55 min",
            caloriasEst: "🔥 ~350 kcal",
            exercicios: [
                { id: "g_a1", nome: "1. Agachamento Livre", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Desça de forma controlada.", guia: "Pés na largura dos ombros, barra no trapézio. Desça abrindo os joelhos." },
                { id: "g_a2", nome: "2. Leg Press Horizontal", series: "4x (10 a 12 reps)", descanso: "90s", obs: "Não trave os joelhos no final.", guia: "Empurre com o calcanhar mantendo a coxa sob tensão." },
                { id: "g_a3", nome: "3. Cadeira Extensora Unilateral", series: "3x 12 reps cada perna", descanso: "60s", obs: "Controle a volta.", guia: "Movimento limpo sem balançar o corpo." },
                { id: "g_a4", nome: "4. Step-up no Banco", series: "3x 10 reps cada perna", descanso: "60s", obs: "Suba pela perna da frente.", guia: "Suba com calma e controle a descida sem despencar." },
                { id: "g_a5", nome: "5. Panturrilha em Pé na Máquina", series: "4x (12 a 15 reps)", descanso: "45s", obs: "Boa amplitude.", guia: "Segure 1 segundo no topo antes de descer." }
            ]
        },
        {
            dia: "Terça-Feira • Treino B",
            foco: "💪 Costas, Bíceps e Abdômen (Hipertrofia)",
            tempoEst: "⏱️ ~50 min",
            caloriasEst: "🔥 ~310 kcal",
            exercicios: [
                { id: "g_b1", nome: "1. Puxada Alta com Pegada Neutra", series: "4x (8 a 10 reps)", descanso: "75s", obs: "Sem balançar o corpo.", guia: "Puxe até o peito abrindo a caixa torácica." },
                { id: "g_b2", nome: "2. Remada Unilateral com Halter", series: "4x 10 reps cada lado", descanso: "75s", obs: "Puxe o cotovelo para o quadril.", guia: "Costas retas, puxe o peso em direção à cintura." },
                { id: "g_b3", nome: "3. Remada Máquina com Pegada Aberta", series: "3x 12 reps", descanso: "60s", obs: "Foco nas costas.", guia: "Abra os cotovelos para ativar o meio das costas." },
                { id: "g_b4", nome: "4. Rosca Scott na Máquina", series: "3x (10 a 12 reps)", descanso: "60s", obs: "Isolamento do bíceps.", guia: "Braços bem apoiados, desça sem soltar o peso de vez." },
                { id: "g_b5", nome: "5. Abdominal na Máquina", series: "4x (12 a 15 reps)", descanso: "45s", obs: "Carga moderada.", guia: "Puxe usando a força do abdômen, não dos braços." }
            ]
        },
        {
            dia: "Quarta-Feira • Treino C",
            foco: "🍑 Glúteos e Posteriores (Hipertrofia)",
            tempoEst: "⏱️ ~50 min",
            caloriasEst: "🔥 ~340 kcal",
            exercicios: [
                { id: "g_c1", nome: "1. Agachamento Sumô com Halter", series: "4x 10 reps", descanso: "90s", obs: "Pés apontados para fora.", guia: "Joelhos acompanham as pontas dos pés." },
                { id: "g_c2", nome: "2. Mesa Flexora", series: "4x (10 a 12 reps)", descanso: "60s", obs: "Controle a descida.", guia: "Quadril preso ao banco, dobre os joelhos com força." },
                { id: "g_c3", nome: "3. Extensão de Quadril na Máquina", series: "3x 12 reps cada perna", descanso: "60s", obs: "Contraia o glúteo.", guia: "Movimento limpo sem forçar a lombar." },
                { id: "g_c4", nome: "4. Pull-through na Polia", series: "3x 12 reps", descanso: "75s", obs: "Empurre o quadril.", guia: "Tronco inclina mantendo as costas bem retas." },
                { id: "g_c5", nome: "5. Cadeira Abdutora", series: "4x (15 a 20 reps)", descanso: "45s", obs: "Movimento controlled.", guia: "Pressão constante para fora." }
            ]
        },
        {
            dia: "Quinta-Feira • Treino D",
            foco: "⏳ Ombros, Peito e Tríceps",
            tempoEst: "⏱️ ~50 min",
            caloriasEst: "🔥 ~320 kcal",
            exercicios: [
                { id: "g_d1", nome: "1. Supino Inclinado com Halteres", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Foco no peito superior.", guia: "Banco a 30º, desça até a linha do peito." },
                { id: "g_d2", nome: "2. Crucifixo na Máquina", series: "3x 12 reps", descanso: "60s", obs: "Controle a abertura.", guia: "Abra sentindo alongar o peitoral e feche apertando." },
                { id: "g_d3", nome: "3. Desenvolvimento na Máquina", series: "3x 10 reps", descanso: "75s", obs: "Empurre até o topo.", guia: "Cotovelos levemente à frente do corpo." },
                { id: "g_d4", nome: "4. Elevação Lateral na Máquina", series: "4x (12 a 15 reps)", descanso: "60s", obs: "Tensión constante.", guia: "Suba até a altura dos ombros." },
                { id: "g_d5", nome: "5. Tríceps Francês com Halter", series: "3x (10 a 12 reps)", descanso: "60s", obs: "Flexão do cotovelo.", guia: "Cotovelos apontando para cima, desça atrás da cabeça." },
                { id: "g_d6", nome: "6. Abdominal na Polia", series: "3x 15 reps", descanso: "45s", obs: "Carga moderada.", guia: "Ajoelhado, curve o tronco em direção às coxas." }
            ]
        },
        {
            dia: "Sexta-Feira • Treino E",
            foco: "🍑 Glúteos + Posteriores (Foco em Carga)",
            tempoEst: "⏱️ ~55 min",
            caloriasEst: "🔥 ~360 kcal",
            exercicios: [
                { id: "g_e1", nome: "1. Hip Thrust na Máquina", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Pausa de 1-2s no topo.", guia: "Aperte forte o glúteo no ponto mais alto." },
                { id: "g_e2", nome: "2. Stiff no Smith", series: "4x (8 a 10 reps)", descanso: "90s", obs: "Empurre o quadril para trás.", guia: "Desça a barra rente às pernas mantendo a coluna reta." },
                { id: "g_e3", nome: "3. Afundo Reverso com Halteres", series: "3x 10 reps cada perna", descanso: "75s", obs: "Passo longo para trás.", guia: "Controle a descida sem bater o joelho no chão." },
                { id: "g_e4", nome: "4. Glúteo no Banco 45º", series: "3x (12 a 15 reps)", descanso: "60s", obs: "Concentre no quadril.", guia: "Suba apertando o bumbum sem forçar a lombar." },
                { id: "g_e5", nome: "5. Cadeira Abdutora", series: "4x (15 a 20 reps)", descanso: "45s", obs: "Exaustão final.", guia: "Movimento cadenciado e sem trancos." },
                { id: "g_e6", nome: "6. Panturrilha no Leg Press", series: "4x 15 reps", descanso: "45s", obs: "Extensão total da ponta do pé.", guia: "Empurre com a ponta dos pés na plataforma." }
            ]
        }
    ];

    const dicasNutricao = [
        { titulo: "💧 1. Hidratação Constante", desc: "Beba no mínimo 35ml de água por quilo de peso corporal ao longo do dia. Exemplo: 60kg x 35ml = ~2.1 Litros por dia." },
        { titulo: "🥩 2. Proteínas em Todas as Refeições", desc: "Ovos, frango, carne, peixe ou whey ajudam na recuperação muscular e mantêm a saciedade por mais tempo." },
        { titulo: "🍚 3. Carboidratos Inteligentes", desc: "Consuma arroz, batata, aveia ou mandioca antes do treino para ter energia máxima durante as séries." },
        { titulo: "💤 4. Sono Reparador", desc: "Treino gera o estímulo, o descanso gera o resultado. Tente dormir entre 7 a 8 horas por noite." }
    ];

    // ELEMENTOS DOM
    const btnIniciar = document.getElementById('btn-iniciar');
    const formAluno = document.getElementById('form-aluno');
    const formMetas = document.getElementById('form-metas');
    const btnAcessarFicha = document.getElementById('btn-acessar-ficha');
    const btnVoltar = document.getElementById('btn-voltar');

    // NAVEGAÇÃO ENTRE TELAS
    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => {
            document.getElementById('tela-inicio')?.classList.add('oculto');
            document.getElementById('tela-perfil')?.classList.remove('oculto');
        });
    }

    if (formAluno) {
        formAluno.addEventListener('submit', (e) => {
            e.preventDefault();
            dadosAluno.nome = document.getElementById('nome').value;
            dadosAluno.idade = document.getElementById('idade').value;
            dadosAluno.pesoAtual = parseFloat(document.getElementById('peso').value);
            
            const objetivoInput = document.querySelector('input[name="objetivo"]:checked');
            if (objetivoInput) {
                dadosAluno.objetivo = objetivoInput.value;
            }

            const labelPesoDesejado = document.getElementById('label-peso-desejado');
            if (labelPesoDesejado) {
                labelPesoDesejado.innerText = dadosAluno.objetivo === 'perda' 
                    ? 'Peso Desejado para Emagrecer (kg):' 
                    : 'Peso Desejado para Ganhar (kg):';
            }

            localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));

            document.getElementById('tela-perfil')?.classList.add('oculto');
            document.getElementById('tela-metas')?.classList.remove('oculto');
        });
    }

    if (formMetas) {
        formMetas.addEventListener('submit', (e) => {
            e.preventDefault();
            dadosAluno.pesoMeta = parseFloat(document.getElementById('peso-meta').value);
            dadosAluno.meses = parseInt(document.getElementById('prazo-meses').value, 10);

            if (dadosAluno.pesoMeta > dadosAluno.pesoAtual) {
                dadosAluno.objetivo = 'ganho';
            } else if (dadosAluno.pesoMeta < dadosAluno.pesoAtual) {
                dadosAluno.objetivo = 'perda';
            }

            localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));

            const resumoBox = document.getElementById('resumo-calculo-texto');
            const resultadoContainer = document.getElementById('resultado-meta');

            let diferencaPeso = Math.abs(dadosAluno.pesoAtual - dadosAluno.pesoMeta);
            let metaMensal = (diferencaPeso / (dadosAluno.meses || 1)).toFixed(1);
            let textoAcao = dadosAluno.objetivo === 'ganho' ? 'ganhar' : 'eliminar';

            if (resumoBox) {
                resumoBox.innerHTML = `
                    <div class="card-resultado-meta">
                        <h3>🎯 Seu Planejamento Personalizado</h3>
                        <p>Meta total: <strong>${textoAcao} ${diferencaPeso.toFixed(1)} kg</strong> em <strong>${dadosAluno.meses} mês(es)</strong></p>
                        <p>📅 Ritmo recomendado: ~<strong>${metaMensal} kg/mês</strong></p>
                        <span class="badge-ritmo" style="background-color: #2ea44f; color: #fff;">🟢 Meta Alcançável e Segura</span>
                    </div>
                `;
            }

            if (resultadoContainer) {
                resultadoContainer.classList.remove('oculto');
            }
        });
    }

    if (btnAcessarFicha) {
        btnAcessarFicha.addEventListener('click', () => {
            exibirFichaTreino();
        });
    }

    function exibirFichaTreino() {
        const textoObj = dadosAluno.objetivo === 'perda' ? 'Perda de Gordura' : 'Ganho de Massa';

        const boasVindas = document.getElementById('boas-vindas-user');
        const detalhes = document.getElementById('detalhes-user');

        if (boasVindas) boasVindas.innerText = `Ficha de ${dadosAluno.nome || 'Aluno'}`;
        if (detalhes) detalhes.innerText = `${dadosAluno.pesoAtual || 0}kg ➔ Meta ${dadosAluno.pesoMeta || 0}kg (${textoObj})`;

        renderizarFichas(dadosAluno.objetivo || 'ganho');
        renderizarDicas();

        document.getElementById('tela-metas')?.classList.add('oculto');
        document.getElementById('tela-perfil')?.classList.add('oculto');
        document.getElementById('tela-inicio')?.classList.add('oculto');
        document.getElementById('tela-treinos')?.classList.remove('oculto');
    }

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            document.getElementById('tela-treinos')?.classList.add('oculto');
            document.getElementById('tela-inicio')?.classList.remove('oculto');
        });
    }

    // NAVEGAÇÃO DE ABAS
    document.querySelectorAll('.aba-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('ativa'));
            document.querySelectorAll('.conteudo-aba').forEach(c => c.classList.add('oculto'));

            e.target.classList.add('ativa');
            const idAba = e.target.getAttribute('data-aba');
            const abaTarget = document.getElementById(idAba);
            if (abaTarget) abaTarget.classList.remove('oculto');
        });
    });

    // RENDERIZAÇÃO DAS FICHAS LIMPAS
    function renderizarFichas(objetivo) {
        const container = document.getElementById('fichas-container');
        if (!container) return;
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
                                <strong>${ex.nome}</strong> — ${ex.series} | <i style="color: #ff4d4d;">${ex.descanso} descanso</i>
                                <small style="display: block; color: #aaa;">${ex.obs}</small>
                            </div>
                        </div>

                        <button class="btn-guia" data-id="${ex.id}">💡 Como Executar</button>

                        <div id="guia-${ex.id}" class="box-execucao oculto">
                            <strong>Dica de Postura:</strong> ${ex.guia}
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

                    <div class="metricas-treino">
                        <span>${card.tempoEst}</span>
                        <span>${card.caloriasEst}</span>
                    </div>

                    <div class="barra-progresso-bg">
                        <div class="barra-progresso-fill" id="barra-${index}" style="width: ${porc}%;"></div>
                    </div>
                    <div class="mensagem-concluido ${porc === 100 ? '' : 'oculto'}" id="msg-${index}">🎉 Treino Concluído! Parabéns pela consistência!</div>
                    <ul style="list-style: none; padding: 0;">${htmlExercicios}</ul>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
        // Cole aqui, logo abaixo do });
    document.querySelectorAll('.chk-exercicio').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const idExer = e.target.getAttribute('data-id');
            progressoExer[idExer] = e.target.checked;

            // Salva o progresso dinamicamente usando o e-mail do usuário ativo
            if (usuarioLogado && usuarioLogado.email) {
                localStorage.setItem(`progressoExer_${usuarioLogado.email}`, JSON.stringify(progressoExer));
            }
        });
    });

        // Event listener para checkboxes de progresso
        document.querySelectorAll('.chk-exercicio').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const cardIdx = e.target.getAttribute('data-card');

                progressoExer[id] = e.target.checked;
                localStorage.setItem('progressoExer', JSON.stringify(progressoExer));

                atualizarProgressoCard(cardIdx, listaTreinos[cardIdx]);
            });
        });

        // Event listener para expansão do guia de execução
        document.querySelectorAll('.btn-guia').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                toggleGuia(id);
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

        const porcElem = document.getElementById(`porc-${cardIdx}`);
        const barraElem = document.getElementById(`barra-${cardIdx}`);
        const msgBox = document.getElementById(`msg-${cardIdx}`);

        if (porcElem) porcElem.innerText = `${porc}%`;
        if (barraElem) barraElem.style.width = `${porc}%`;

        if (msgBox) {
            if (porc === 100) {
                msgBox.classList.remove('oculto');
            } else {
                msgBox.classList.add('oculto');
            }
        }
    }

    function renderizarDicas() {
        const box = document.getElementById('dicas-conteudo');
        if (!box) return;
        box.innerHTML = '';
        dicasNutricao.forEach(dica => {
            box.innerHTML += `
                <div class="dica-card">
                    <h4>${dica.titulo}</h4>
                    <p>${dica.desc}</p>
                </div>
            `;
        });
    }


// GUIA EXPANSÍVEL
function toggleGuia(id) {
    const box = document.getElementById(`guia-${id}`);
    if (box) {
        box.classList.toggle('oculto');
    }
}

// CRONÔMETRO GLOBAL
let tempoRestante = 0;
let intervalTimer = null;

function iniciarTimer(segundos) {
    clearInterval(intervalTimer);
    tempoRestante = segundos;
    atualizarDisplayTimer();

    intervalTimer = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTimer();

        if (tempoRestante <= 0) {
            clearInterval(intervalTimer);
            alert("⏰ Tempo de descanso finalizado!");
        }
    }, 1000);
}

function resetarTimer() {
    clearInterval(intervalTimer);
    tempoRestante = 0;
    atualizarDisplayTimer();
}

function atualizarDisplayTimer() {
    const min = String(Math.floor(tempoRestante / 60)).padStart(2, '0');
    const seg = String(tempoRestante % 60).padStart(2, '0');
    const display = document.getElementById('timer-display');
    if (display) {
        display.innerText = `${min}:${seg}`;
    }
}
// REGISTRO DO SERVICE WORKER (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registrado com sucesso:', reg.scope))
      .catch((err) => console.error('Falha ao registrar Service Worker:', err));
  });
}
// FUNÇÃO PARA ESCONDER TODAS AS TELAS
function ocultarTodasTelas() {
    document.getElementById('tela-login')?.classList.add('oculto');
    document.getElementById('tela-inicio')?.classList.add('oculto');
    document.getElementById('tela-perfil')?.classList.add('oculto');
    document.getElementById('tela-metas')?.classList.add('oculto');
    document.getElementById('tela-treinos')?.classList.add('oculto');
} 
});
