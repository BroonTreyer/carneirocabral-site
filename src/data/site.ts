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
      'Em Goiânia, atendemos pessoas e empresas de todo o estado de Goiás, com reuniões presenciais agendadas e acompanhamento a distância quando for mais prático para o cliente.',
      'Atuamos em processos que tramitam na Justiça estadual e na Justiça Federal em Goiás, além de demandas administrativas e consultivas.',
    ],
    tribunais: ['Tribunal de Justiça de Goiás (TJGO)', 'Justiça Federal em Goiás (TRF1)', 'Tribunal Regional do Trabalho da 18ª Região'],
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
      'Em Cuiabá, atendemos clientes de todo o Mato Grosso, da capital ao interior, com reuniões presenciais agendadas e atendimento por videochamada para quem está longe.',
      'Acompanhamos processos na Justiça estadual e na Justiça Federal em Mato Grosso, incluindo os Juizados Especiais.',
    ],
    tribunais: ['Tribunal de Justiça de Mato Grosso (TJMT)', 'Justiça Federal em Mato Grosso (TRF1)', 'Tribunal Regional do Trabalho da 23ª Região'],
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
      'Em Brasília, atendemos clientes do Distrito Federal e do Entorno, e acompanhamos de perto os processos que chegam aos tribunais superiores.',
      'A presença na capital federal facilita o contato direto com tribunais, órgãos públicos e repartições da administração federal.',
    ],
    tribunais: ['Tribunal de Justiça do DF e Territórios (TJDFT)', 'Tribunal Regional Federal da 1ª Região (TRF1)', 'Superior Tribunal de Justiça (STJ) e Supremo Tribunal Federal (STF)'],
  },
];

// ÁREAS DE ATUAÇÃO — confirmar com o escritório antes de publicar.
export type Area = {
  slug: string;
  icone: 'contrato' | 'consumidor' | 'empresa' | 'trabalho' | 'agro' | 'familia';
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
    ],
  },
];

export const PILARES = [
  { titulo: 'Clareza', texto: 'Explicamos cada etapa em linguagem simples, com prazos, riscos e custos colocados por escrito antes de qualquer decisão.' },
  { titulo: 'Sigilo', texto: 'Tudo o que você nos conta é protegido pelo sigilo profissional e tratado conforme a Lei Geral de Proteção de Dados.' },
  { titulo: 'Proximidade', texto: 'Você fala diretamente com quem cuida do seu caso, presencialmente ou a distância, sem intermediários.' },
];

export const ETAPAS = [
  {
    titulo: 'Primeiro contato',
    texto: 'Você nos procura por WhatsApp, telefone ou e-mail e conta, em poucas palavras, o que está acontecendo.',
  },
  {
    titulo: 'Análise do caso',
    texto: 'Marcamos uma conversa, presencial ou por vídeo, e examinamos os documentos para entender a situação por inteiro.',
  },
  {
    titulo: 'Proposta e estratégia',
    texto: 'Explicamos os caminhos possíveis, os riscos de cada um e apresentamos a proposta de honorários por escrito.',
  },
  {
    titulo: 'Acompanhamento',
    texto: 'Durante todo o trabalho, você recebe notícias de cada andamento importante, sem precisar perguntar.',
  },
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
