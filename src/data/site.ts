// Todos os dados do escritório ficam aqui. Corrija neste arquivo e o site inteiro se atualiza.

export const SITE = {
  url: 'https://carneirocabral.adv.br',
  nome: 'Carneiro Cabral',
  nomeCompleto: 'Carneiro Cabral Advogados Associados',
  email: 'contato@carneirocabral.adv.br',
  // Número de inscrição da sociedade na OAB. Obrigatório na publicidade (Código de Ética, art. 44).
  // Enquanto estiver vazio, o rodapé não mostra a linha.
  oab: '',
  cnpj: '', // aparece no rodapé e na política de privacidade quando preenchido
  facebook: '', // ex.: 'https://www.facebook.com/carneirocabral.adv'
  instagram: '',
};

// Números informados pelo escritório (10/11/2026). Apresentados de forma neutra, sem falar em êxito ou vitórias,
// porque a divulgação de resultados é vedada pela OAB (Provimento 205/2021).
export const NUMEROS = [
  { valor: 25000, prefixo: '+', rotulo: 'processos acompanhados' },
  { valor: 2000, prefixo: '+', rotulo: 'clientes atendidos' },
  { valor: 11, prefixo: '', rotulo: 'advogados na equipe' },
  { valor: 3, prefixo: '', rotulo: 'capitais do Centro-Oeste' },
];

// EQUIPE — preencher com dados e fotos REAIS. O carrossel só aparece quando houver pessoas aqui.
// foto: arquivo em src/assets/equipe/ (ex.: 'nome-sobrenome.jpg'), padronizado com scripts/padronizar-equipe.mjs.
export type Pessoa = { nome: string; cargo: string; oab: string; foto: string; cidade?: string };
// Na versão publicada só aparece quem tiver NOME preenchido. Na prévia (PREVIA_EQUIPE=1) aparecem todos.
export const EQUIPE: Pessoa[] = [
  { nome: 'Matheus Carneiro', cargo: 'Advogado', oab: '', foto: 'advogado-1.jpg' },
  { nome: 'David Maykon Cabral', cargo: 'Advogado', oab: '', foto: 'advogado-2.jpg' },
  { nome: 'Daniela Martins', cargo: 'Advogada', oab: '', foto: 'advogado-3.jpg' },
  { nome: 'Victória Avellar', cargo: 'Advogada', oab: '', foto: 'advogado-4.jpg' },
  { nome: 'Pedro Krust', cargo: 'Advogado', oab: '', foto: 'advogado-5.jpg' },
  { nome: 'Ivan Bitencourt', cargo: 'Advogado', oab: '', foto: 'advogado-6.jpg' },
];

// Créditos das fotografias (licenças abertas exigem atribuição). Aparecem na página /creditos/.
export const CREDITOS = [
  { foto: 'Estátua da Justiça na Maison du Renard, Bruxelas (recorte)', autor: 'iMahesh', licenca: 'CC BY-SA 4.0', link: 'https://commons.wikimedia.org/wiki/File:Maison_du_Renard_(Brussels)_-_Detail_of_the_statue_of_Lady_Justice_(Justicia).jpg' },
  { foto: 'Ponte JK ao entardecer, Brasília', autor: 'Arley Cruzper', licenca: 'CC BY-SA 4.0', link: 'https://commons.wikimedia.org/wiki/File:Ponte_JK_em_Bras%C3%ADlia_no_entardecer.jpg' },
  { foto: 'Praça Cívica, Goiânia', autor: 'Boaventuravinicius', licenca: 'CC BY-SA 3.0', link: 'https://commons.wikimedia.org/wiki/File:Pra%C3%A7a_C%C3%ADvica_em_Outubro_de_2026.jpg' },
  { foto: 'Vista aérea do centro de Cuiabá', autor: 'Fabio Gomes', licenca: 'CC BY-SA 4.0', link: 'https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_de_Cuiab%C3%A1_-_%C3%A1rea_central.jpg' },
  { foto: 'Saguão de check-in de aeroporto', autor: 'Arne Müseler', licenca: 'CC BY-SA 3.0 DE', link: 'https://commons.wikimedia.org/wiki/File:Sao_paulo_airport_GRU_terminal_2_check-in_D.jpg' },
  { foto: 'Colheita de soja em Rondonópolis (MT)', autor: 'Roosevelt Pinheiro/Agência Brasil', licenca: 'CC BY 3.0 BR', link: 'https://commons.wikimedia.org/wiki/File:Ronodon%C3%B3polis_colheita_soja_(Roosevelt_Pinheiro)_28mar09.jpg' },
];

export type Telefone = { exibicao: string; e164: string; whatsapp: string };

export const TELEFONES: Record<'brasilia' | 'cuiaba', Telefone> = {
  brasilia: { exibicao: '(61) 94756-0317', e164: '+5561947560317', whatsapp: '5561947560317' },
  cuiaba: { exibicao: '(65) 93618-1181', e164: '+5565936181181', whatsapp: '5565936181181' },
};

export type Cidade = {
  slug: string;
  nome: string;
  uf: string;
  estado: string;
  telefone: Telefone;
  lat: number;
  lon: number;
  endereco: string; // preencher quando houver endereço para divulgar
  texto: string[];
  tribunais: string[];
  foto: string;
  legenda: string;
};

export const CIDADES: Cidade[] = [
  {
    slug: 'goiania',
    nome: 'Goiânia',
    uf: 'GO',
    estado: 'Goiás',
    telefone: TELEFONES.brasilia,
    lat: -16.6869,
    lon: -49.2648,
    endereco: '',
    texto: [
      'Em Goiânia, atendemos pessoas, empresas e produtores de todo o estado de Goiás, da capital ao sudoeste agrícola, com reuniões presenciais agendadas e acompanhamento a distância quando for mais prático para o cliente.',
      'Acompanhamos processos na Justiça estadual, na Justiça Federal e na Justiça do Trabalho em Goiás, além do trabalho consultivo, que resolve muitos problemas antes que cheguem ao Judiciário.',
    ],
    tribunais: ['Tribunal de Justiça de Goiás (TJGO)', 'Justiça Federal em Goiás (TRF1)', 'Tribunal Regional do Trabalho da 18ª Região'],
    foto: 'goiania-praca-civica',
    legenda: 'Praça Cívica, Goiânia',
  },
  {
    slug: 'cuiaba',
    nome: 'Cuiabá',
    uf: 'MT',
    estado: 'Mato Grosso',
    telefone: TELEFONES.cuiaba,
    lat: -15.601,
    lon: -56.0974,
    endereco: '',
    texto: [
      'Em Cuiabá, atendemos clientes de todo o Mato Grosso. Num estado em que a próxima comarca pode estar a centenas de quilômetros, o processo eletrônico e a videochamada encurtam a distância sem diminuir o cuidado.',
      'Acompanhamos processos na Justiça estadual, inclusive nos Juizados Especiais, na Justiça Federal e na Justiça do Trabalho em Mato Grosso, com atenção especial às questões do campo e do agronegócio.',
    ],
    tribunais: ['Tribunal de Justiça de Mato Grosso (TJMT)', 'Justiça Federal em Mato Grosso (TRF1)', 'Tribunal Regional do Trabalho da 23ª Região'],
    foto: 'cuiaba-centro',
    legenda: 'Centro de Cuiabá',
  },
  {
    slug: 'brasilia',
    nome: 'Brasília',
    uf: 'DF',
    estado: 'Distrito Federal',
    telefone: TELEFONES.brasilia,
    lat: -15.7939,
    lon: -47.8828,
    endereco: '',
    texto: [
      'Em Brasília, atendemos pessoas e empresas do Distrito Federal e do Entorno, com reuniões presenciais agendadas e acompanhamento a distância quando for mais prático para o cliente.',
      'Acompanhamos processos na Justiça do Distrito Federal, na Justiça Federal e na Justiça do Trabalho, além do trabalho consultivo, que resolve muitos problemas antes que cheguem ao Judiciário.',
    ],
    tribunais: ['Tribunal de Justiça do DF e Territórios (TJDFT)', 'Justiça Federal no Distrito Federal (TRF1)', 'Tribunal Regional do Trabalho da 10ª Região'],
    foto: 'brasilia-ponte-jk',
    legenda: 'Ponte JK, Brasília',
  },
];

// ÁREAS DE ATUAÇÃO — confirmar com o escritório antes de publicar.
export type Area = {
  slug: string;
  icone: 'contrato' | 'consumidor' | 'empresa' | 'trabalho' | 'agro' | 'familia' | 'previdencia';
  titulo: string;
  texto: string; // resumo para o card
  descricao: string; // meta description da página
  intro: string[];
  servicos: string[];
  perguntas: { p: string; r: string }[];
};

export const AREAS: Area[] = [
  {
    slug: 'direito-civil-e-contratos',
    icone: 'contrato',
    titulo: 'Direito Civil e Contratos',
    texto: 'Elaboração e revisão de contratos, cobranças, indenizações, responsabilidade civil e conflitos entre particulares.',
    descricao: 'Advocacia em Direito Civil e Contratos em Goiânia, Cuiabá e Brasília: elaboração e revisão de contratos, cobranças, indenizações e responsabilidade civil.',
    intro: [
      'Boa parte dos conflitos começa em um contrato mal redigido, em um acordo feito só de palavra ou em um prejuízo que ninguém quer assumir. O Direito Civil cuida dessas relações entre pessoas e empresas no dia a dia.',
      'Atuamos tanto na prevenção, redigindo e revisando contratos antes da assinatura, quanto na solução de conflitos já instalados, buscando primeiro o acordo e, quando necessário, a via judicial.',
      'Contrato bom é aquele que ninguém precisa abrir na gaveta depois de assinado. Quando o conflito já existe, a pergunta passa a ser outra: quanto custa resolver, quanto tempo leva e o que se ganha com isso. Respondemos as três antes de qualquer passo.',
    ],
    servicos: [
      'Elaboração e revisão de contratos de compra e venda, locação, prestação de serviços e parcerias',
      'Notificações extrajudiciais e tentativas de acordo antes do processo',
      'Ações de cobrança, execução de títulos e monitórias',
      'Ações de indenização por danos materiais e morais',
      'Rescisão de contratos e discussão de multas e cláusulas abusivas',
      'Questões de posse e propriedade de imóveis urbanos',
    ],
    perguntas: [
      { p: 'Vale a pena revisar um contrato antes de assinar?', r: 'Sim. A revisão prévia costuma custar menos do que resolver depois um problema causado por uma cláusula mal escrita, e permite negociar ajustes enquanto ainda há margem para isso.' },
      { p: 'Qual é o prazo para cobrar uma dívida na Justiça?', r: 'Depende do tipo de dívida e do documento que a comprova. Em regra, os prazos variam de três a cinco anos, por isso é importante buscar orientação o quanto antes.' },
      { p: 'Contrato de boca tem validade?', r: 'Em muitos casos, sim. O problema é provar o que foi combinado. Mensagens, comprovantes de pagamento e testemunhas ajudam, e uma análise do conjunto indica se vale a pena cobrar na Justiça.' },
    ],
  },
  {
    slug: 'direito-do-consumidor',
    icone: 'consumidor',
    titulo: 'Direito do Consumidor',
    texto: 'Problemas com bancos, planos de saúde, companhias aéreas, operadoras e lojas: cobranças indevidas, negativações e falhas na prestação de serviço.',
    descricao: 'Advogados em Direito do Consumidor em Goiânia, Cuiabá e Brasília: voos cancelados, cobranças indevidas, negativação, planos de saúde e bancos.',
    intro: [
      'Voo cancelado, cobrança que você não reconhece, nome negativado sem motivo, plano de saúde que negou um procedimento: situações assim são comuns e o Código de Defesa do Consumidor oferece instrumentos claros para resolvê-las.',
      'Analisamos o caso, reunimos as provas e indicamos o caminho mais adequado, seja a reclamação administrativa, o acordo com a empresa ou a ação judicial, inclusive nos Juizados Especiais.',
      'Muita gente desiste porque acha que brigar com uma grande empresa não compensa. Na prática, o Código de Defesa do Consumidor inverte esse jogo em vários pontos: em muitos casos, cabe à empresa provar que agiu corretamente, e não ao consumidor provar que foi prejudicado.',
    ],
    servicos: [
      'Atrasos, cancelamentos e extravio de bagagem em viagens aéreas',
      'Cobranças indevidas e inclusão indevida em cadastros de inadimplentes',
      'Negativas de cobertura e reajustes abusivos de planos de saúde',
      'Problemas com bancos, cartões, empréstimos e descontos não autorizados',
      'Produtos com defeito e serviços não prestados como contratado',
      'Revisão de contratos de financiamento e consórcio',
    ],
    perguntas: [
      { p: 'Que provas devo guardar?', r: 'Guarde tudo: comprovantes de compra, bilhetes, protocolos de atendimento, e-mails, mensagens e prints de tela. Quanto mais completo o registro, mais sólido fica o caso.' },
      { p: 'Preciso ir até a empresa antes de procurar um advogado?', r: 'Não é obrigatório, mas registrar a reclamação e anotar o número de protocolo ajuda a demonstrar que você tentou resolver o problema diretamente.' },
      { p: 'Quanto tempo depois do problema ainda posso reclamar?', r: 'Depende do caso. Defeitos de produto e de serviço têm prazos de 30 a 90 dias para reclamação, e o pedido de indenização pode ser feito, em regra, em até cinco anos. Quanto antes, mais fácil reunir as provas.' },
    ],
  },
  {
    slug: 'direito-empresarial',
    icone: 'empresa',
    titulo: 'Direito Empresarial',
    texto: 'Constituição e alteração de sociedades, acordos entre sócios, contratos comerciais e prevenção de litígios na rotina da empresa.',
    descricao: 'Assessoria jurídica empresarial em Goiânia, Cuiabá e Brasília: sociedades, acordos de sócios, contratos comerciais e prevenção de litígios.',
    intro: [
      'Empresas tomam decisões jurídicas todos os dias, muitas vezes sem perceber: ao contratar um fornecedor, admitir um sócio, assinar um contrato com cliente ou cobrar um pagamento atrasado.',
      'Oferecemos assessoria contínua ou pontual para que essas decisões sejam tomadas com segurança, reduzindo riscos e evitando que pequenos problemas se transformem em processos.',
      'O empresário do Centro-Oeste raramente tem tempo para pensar em contrato social, cláusula de saída ou garantia de recebimento. É justamente por isso que esses pontos viram problema. Nosso papel é cuidar dessa parte com a mesma objetividade com que você cuida do caixa.',
    ],
    servicos: [
      'Constituição, alteração e encerramento de sociedades',
      'Acordos de sócios, entrada e saída de sócios',
      'Contratos comerciais com clientes, fornecedores e parceiros',
      'Recuperação de créditos e cobrança de inadimplentes',
      'Assessoria jurídica preventiva para a rotina da empresa',
      'Atuação em conflitos societários e disputas comerciais',
    ],
    perguntas: [
      { p: 'Minha empresa precisa de um acordo de sócios?', r: 'Se há mais de um sócio, o acordo é altamente recomendável. Ele define regras para decisões, saída de sócios, divisão de resultados e situações de conflito, evitando disputas futuras.' },
      { p: 'Vocês oferecem assessoria mensal?', r: 'Sim. Além do atendimento por demanda, é possível contratar uma assessoria contínua, com escopo e honorários definidos por escrito conforme as necessidades da empresa.' },
      { p: 'O que fazer quando um cliente da empresa não paga?', r: 'Primeiro, reunir notas, contratos, pedidos e conversas. Com esse material, avaliamos a via mais rápida: notificação, protesto do título, acordo ou ação de cobrança ou execução.' },
    ],
  },
  {
    slug: 'direito-do-trabalho',
    icone: 'trabalho',
    titulo: 'Direito do Trabalho',
    texto: 'Orientação a empregados e empregadores, cálculo de verbas, acordos e atuação em reclamações trabalhistas.',
    descricao: 'Advogados trabalhistas em Goiânia, Cuiabá e Brasília: orientação a empregados e empresas, verbas rescisórias, acordos e reclamações trabalhistas.',
    intro: [
      'A relação de trabalho envolve direitos e deveres dos dois lados. Uma rescisão feita sem cuidado, horas extras não registradas ou um afastamento mal conduzido podem gerar conflitos longos e caros.',
      'Orientamos empregados que querem entender e reivindicar seus direitos e empresas que precisam cumprir a legislação e se defender em reclamações trabalhistas.',
      'Na Justiça do Trabalho, a prova costuma estar nos detalhes: o cartão de ponto, a mensagem enviada fora do horário, o recibo que ninguém guardou. Por isso o trabalho começa com uma conferência minuciosa de documentos, tanto para o empregado quanto para a empresa.',
    ],
    servicos: [
      'Conferência de verbas rescisórias e cálculos trabalhistas',
      'Horas extras, adicionais, equiparação salarial e desvio de função',
      'Reconhecimento de vínculo de emprego',
      'Acidentes de trabalho, doenças ocupacionais e estabilidade',
      'Defesa de empresas em reclamações trabalhistas',
      'Acordos trabalhistas e homologação na Justiça do Trabalho',
    ],
    perguntas: [
      { p: 'Qual é o prazo para entrar com uma ação trabalhista?', r: 'O prazo é de até dois anos depois do fim do contrato de trabalho, e a ação pode cobrar direitos referentes aos últimos cinco anos.' },
      { p: 'A empresa pode ser orientada para evitar processos?', r: 'Sim. Uma revisão das rotinas de contratação, jornada e desligamento reduz bastante o risco de reclamações trabalhistas.' },
      { p: 'Pedi demissão. Ainda tenho direitos a receber?', r: 'Sim. Quem pede demissão recebe saldo de salário, férias vencidas e proporcionais com um terço e décimo terceiro proporcional. Não há direito à multa do FGTS nem ao seguro-desemprego, mas vale conferir se os valores foram pagos corretamente.' },
    ],
  },
  {
    slug: 'direito-agrario-e-agronegocio',
    icone: 'agro',
    titulo: 'Direito Agrário e Agronegócio',
    texto: 'Contratos rurais, arrendamento e parceria, regularização de imóveis rurais e questões ligadas à produção no campo.',
    descricao: 'Advocacia em Direito Agrário e Agronegócio em Goiás, Mato Grosso e Distrito Federal: contratos rurais, arrendamento, parceria e imóveis rurais.',
    intro: [
      'Goiás e Mato Grosso estão entre os maiores produtores do país, e a atividade no campo depende de contratos, crédito, posse da terra e regularidade documental.',
      'Atendemos produtores, famílias e empresas do agronegócio em questões que vão da redação de um contrato de arrendamento à regularização de imóveis rurais e à solução de conflitos ligados à produção.',
      'No campo, um contrato mal escrito pode travar uma safra inteira, e uma sucessão mal planejada pode dividir uma propriedade que levou gerações para ser formada. Tratamos essas questões com o cuidado de quem sabe o que está em jogo em cada hectare.',
    ],
    servicos: [
      'Contratos de arrendamento e parceria rural',
      'Contratos de compra e venda de safra e de insumos',
      'Regularização documental de imóveis rurais',
      'Questões de posse, divisa e servidão em áreas rurais',
      'Renegociação de dívidas e crédito rural',
      'Sucessão e planejamento patrimonial no meio rural',
    ],
    perguntas: [
      { p: 'Arrendamento e parceria rural são a mesma coisa?', r: 'Não. No arrendamento, o proprietário recebe um valor fixo pelo uso da terra. Na parceria, os riscos e os resultados da produção são divididos entre as partes, conforme o contrato.' },
      { p: 'Vocês atendem propriedades no interior?', r: 'Sim. Atendemos clientes de todo o interior de Goiás e de Mato Grosso, com reuniões presenciais agendadas ou por videochamada.' },
      { p: 'Como planejar a sucessão da propriedade rural?', r: 'O planejamento pode envolver testamento, doação com reserva de usufruto, acordos entre herdeiros e, em alguns casos, a constituição de uma empresa familiar. A melhor combinação depende do tamanho do patrimônio, da família e da atividade.' },
    ],
  },
  {
    slug: 'familia-e-sucessoes',
    icone: 'familia',
    titulo: 'Família e Sucessões',
    texto: 'Divórcio, guarda, pensão alimentícia, inventário, partilha de bens e planejamento sucessório.',
    descricao: 'Advogados de Família e Sucessões em Goiânia, Cuiabá e Brasília: divórcio, guarda, pensão alimentícia, inventário e planejamento sucessório.',
    intro: [
      'Questões de família pedem conhecimento técnico e, ao mesmo tempo, sensibilidade. Divórcio, guarda dos filhos e inventário mexem com a vida das pessoas em momentos delicados.',
      'Sempre que possível, priorizamos soluções consensuais, que costumam ser mais rápidas e menos desgastantes para todos, sem abrir mão da defesa firme dos interesses do cliente quando o acordo não é possível.',
      'Nesses casos, a técnica jurídica é só metade do trabalho. A outra metade é conduzir conversas difíceis com calma e discrição, proteger os filhos do conflito entre os adultos e encontrar soluções que permitam a cada um seguir em frente.',
    ],
    servicos: [
      'Divórcio consensual e litigioso, inclusive em cartório',
      'Guarda, convivência e regulamentação de visitas',
      'Fixação, revisão e cobrança de pensão alimentícia',
      'Reconhecimento e dissolução de união estável',
      'Inventário judicial e extrajudicial e partilha de bens',
      'Testamentos e planejamento sucessório',
    ],
    perguntas: [
      { p: 'É possível fazer o divórcio em cartório?', r: 'Sim, quando há acordo entre o casal sobre todos os pontos. Mesmo havendo filhos menores, a via extrajudicial pode ser possível se as questões relativas a eles já tiverem sido resolvidas na Justiça.' },
      { p: 'Existe prazo para abrir o inventário?', r: 'A lei prevê a abertura em até dois meses após o falecimento. O atraso pode gerar multa sobre o imposto de transmissão, conforme a legislação de cada estado.' },
      { p: 'Como é calculada a pensão alimentícia?', r: 'Não existe percentual fixo na lei. O valor considera a necessidade de quem recebe e a possibilidade de quem paga, analisadas caso a caso. É possível pedir revisão quando a situação de uma das partes muda.' },
    ],
  },
  {
    slug: 'direito-previdenciario',
    icone: 'previdencia',
    titulo: 'Direito Previdenciário',
    texto: 'Aposentadorias, auxílio por incapacidade, pensão por morte, BPC/LOAS e revisões. Do pedido ao INSS à ação na Justiça.',
    descricao: 'Direito Previdenciário em Goiânia, Cuiabá e Brasília: aposentadoria, auxílio por incapacidade, pensão por morte, BPC/LOAS e benefícios negados pelo INSS.',
    intro: [
      'Um benefício negado pelo INSS costuma chegar num momento difícil: depois de um afastamento por doença, da perda de alguém da família ou de uma vida inteira de trabalho que agora precisa ser reconhecida.',
      'Analisamos o histórico de contribuições, os laudos e as decisões do INSS para encontrar o melhor caminho, seja um novo pedido bem instruído, o recurso administrativo ou a ação judicial.',
      'Na Previdência, detalhes fazem diferença: um vínculo que não aparece no cadastro, um período rural sem registro, um laudo que não descreveu bem a limitação. É nesse trabalho minucioso que muitos benefícios são reconhecidos.',
    ],
    servicos: [
      'Aposentadorias por idade, por tempo de contribuição, especial e da pessoa com deficiência',
      'Auxílio por incapacidade temporária e aposentadoria por incapacidade permanente',
      'Pensão por morte e auxílio-reclusão',
      'Benefício assistencial ao idoso e à pessoa com deficiência (BPC/LOAS)',
      'Reconhecimento de tempo rural, especial e de vínculos que não constam no cadastro',
      'Revisão de benefícios e recursos contra decisões do INSS',
    ],
    perguntas: [
      { p: 'O INSS negou meu benefício. O que posso fazer?', r: 'É possível apresentar recurso administrativo, em regra no prazo de 30 dias a partir da ciência da decisão, ou entrar com ação na Justiça. A escolha depende do motivo da negativa e das provas disponíveis.' },
      { p: 'Preciso pedir ao INSS antes de entrar na Justiça?', r: 'Em regra, sim. Para a maioria dos benefícios, a Justiça exige que o pedido tenha sido feito antes ao INSS. Por isso, um pedido bem instruído desde o início faz tanta diferença.' },
      { p: 'Quem tem direito ao BPC/LOAS?', r: 'Idosos a partir de 65 anos e pessoas com deficiência em situação de baixa renda familiar. O critério de renda é de até um quarto do salário mínimo por pessoa da família, e pode ser analisado com mais flexibilidade em alguns casos.' },
    ],
  },
];

export const PILARES = [
  { titulo: 'Clareza', texto: 'Você sai de cada conversa sabendo o que vai ser feito, quanto tempo deve levar, quanto custa e quais são os riscos. Tudo por escrito.' },
  { titulo: 'Sigilo', texto: 'O que você nos conta fica entre você e o escritório. O sigilo profissional é dever do advogado, previsto em lei, e vale desde o primeiro contato.' },
  { titulo: 'Proximidade', texto: 'Você sabe quem é o advogado responsável pelo seu caso e tem um canal direto com a equipe que cuida dele.' },
];

export const ETAPAS = [
  { titulo: 'Primeira conversa', texto: 'Você conta o que aconteceu, pelo WhatsApp, por telefone ou pessoalmente. Já nesse contato dizemos se o caso é da nossa área e quais documentos separar.' },
  { titulo: 'Estudo do caso', texto: 'Lemos os documentos, verificamos prazos e decisões recentes dos tribunais e respondemos à pergunta que importa: vale a pena seguir, e por qual caminho?' },
  { titulo: 'Proposta por escrito', texto: 'Você recebe a estratégia, os riscos e os honorários em um documento claro, antes de assinar qualquer coisa. Sem letras miúdas.' },
  { titulo: 'Acompanhamento', texto: 'Cada andamento relevante é comunicado e explicado em linguagem simples, para que você acompanhe o processo sem precisar decifrar termos técnicos.' },
];

export const PERGUNTAS = [
  {
    p: 'Como funciona o primeiro atendimento?',
    r: 'Basta enviar uma mensagem pelo WhatsApp ou um e-mail contando brevemente o seu caso. Respondemos para agendar uma conversa, presencial em uma das nossas cidades ou por videochamada.',
  },
  {
    p: 'Vocês atendem clientes de outras cidades?',
    r: 'Sim. Com o processo eletrônico, acompanhamos casos em outras localidades, e as reuniões podem ser feitas por videochamada.',
  },
  {
    p: 'Quanto custam os honorários?',
    r: 'Os honorários dependem da natureza e da complexidade de cada caso e são apresentados por escrito depois da análise, respeitando a tabela da OAB da respectiva seccional.',
  },
  {
    p: 'Que documentos devo levar ou enviar?',
    r: 'Documento de identidade, comprovante de endereço e tudo o que tiver relação com o caso: contratos, mensagens, comprovantes e notificações. Na dúvida, envie o que tiver e orientamos o restante.',
  },
  {
    p: 'Meus dados ficam protegidos?',
    r: 'Sim. As informações que você nos confia são protegidas pelo sigilo profissional do advogado e tratadas conforme a Lei Geral de Proteção de Dados.',
  },
];
