const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'numerology.db');
const db = new Database(dbPath);

const schema = `
DROP TABLE IF EXISTS meanings;
CREATE TABLE meanings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number INTEGER NOT NULL,
  category TEXT NOT NULL, 
  title TEXT,
  description TEXT,
  tarot_card TEXT,
  positive TEXT,
  negative TEXT,
  image_url TEXT,
  element TEXT,
  planet TEXT,
  color TEXT,
  gemstone TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
`;

const seedData = [
  {
    number: 1,
    category: 'general',
    title: 'O Pioneiro',
    description: 'O Número 1 vibra com a energia da criação, da liderança e da originalidade. É a força motriz que inicia novos ciclos e desbrava caminhos onde antes nada existia. Representa o "Eu Sou", a afirmação da identidade e a coragem de ser único.',
    tarot_card: 'I - O Mago',
    positive: 'Autoafirmação, iniciativa, independência, força de vontade, coragem para liderar e inovar.',
    negative: 'Egoísmo, autoritarismo, impaciência, agressividade, tendência a querer dominar os outros.',
    element: 'Fogo', planet: 'Sol', color: 'Vermelho', gemstone: 'Rubi'
  },
  {
    number: 2,
    category: 'general',
    title: 'O Diplomata',
    description: 'O Número 2 é a essência da cooperação, da sensibilidade e da harmonia. Busca o equilíbrio entre os opostos e a união. É o pacificador que entende as nuances emocionais e constrói pontes entre as pessoas.',
    tarot_card: 'II - A Papisa',
    positive: 'Intuição, diplomacia, gentileza, paciência, capacidade de trabalhar em equipa e acolher.',
    negative: 'Dependência emocional, timidez excessiva, passividade, indecisão, medo de conflitos.',
    element: 'Água', planet: 'Lua', color: 'Laranja', gemstone: 'Pedra da Lua'
  },
  {
    number: 3,
    category: 'general',
    title: 'O Comunicador',
    description: 'O Número 3 é a alegria da autoexpressão, da criatividade e do otimismo social. É a energia irradiante que inspira os outros através da palavra, da arte e do entusiasmo. Representa a criança interior e a celebração da vida.',
    tarot_card: 'III - A Imperatriz',
    positive: 'Criatividade, comunicação, sociabilidade, charme, otimismo, talento artístico.',
    negative: 'Superficialidade, dispersão, exagero, fofoca, desperdício de energia.',
    element: 'Ar', planet: 'Júpiter', color: 'Amarelo', gemstone: 'Topázio'
  },
  {
    number: 4,
    category: 'general',
    title: 'O Construtor',
    description: 'O Número 4 simboliza a ordem, a estrutura e a estabilidade. É a fundação sólida sobre a qual se constroem os grandes impérios. Valoriza o trabalho árduo, a disciplina e a organização como meios de concretização.',
    tarot_card: 'IV - O Imperador',
    positive: 'Disciplina, organização, lealdade, honestidade, resistência, capacidade de concretização.',
    negative: 'Rigidez mental, teimosia, lentidão, excesso de críticas, resistência à mudança.',
    element: 'Terra', planet: 'Urano', color: 'Verde', gemstone: 'Esmeralda'
  },
  {
    number: 5,
    category: 'general',
    title: 'O Viajante',
    description: 'O Número 5 é a liberdade em movimento. Busca a experiência, a aventura e a mudança constante. É a energia que quebra rotinas e explora os limites dos sentidos e do intelecto. Representa a adaptação e o progresso.',
    tarot_card: 'V - O Papa',
    positive: 'Versatilidade, ousadia, magnetismo, curiosidade, adaptabilidade, amor pela liberdade.',
    negative: 'Irresponsabilidade, inconstância, impulsividade, vícios, falta de compromisso.',
    element: 'Ar', planet: 'Mercúrio', color: 'Azul', gemstone: 'Turquesa'
  },
  {
    number: 6,
    category: 'general',
    title: 'O Guardião',
    description: 'O Número 6 vibra com o amor, a família e a responsabilidade social. É o arquétipo do cuidador que busca a harmonia no lar e na comunidade. Valoriza a beleza, a verdade e justiça, muitas vezes sacrificando-se pelo bem-estar alheio.',
    tarot_card: 'VI - Os Enamorados',
    positive: 'Amor, responsabilidade, proteção, cura, sentido estético, justiça.',
    negative: 'Ciúmes, possessividade, intromissão, teimosia, idealismo imprático.',
    element: 'Terra', planet: 'Vénus', color: 'Índigo', gemstone: 'Safira'
  },
  {
    number: 7,
    category: 'general',
    title: 'O Sábio',
    description: 'O Número 7 é o buscador da verdade. Mergulha nos mistérios da vida através da introspeção, da análise e da espiritualidade. Prefere a solidão para contemplar e estudar, procurando respostas além do mundo material.',
    tarot_card: 'VII - O Carro',
    positive: 'Sabedoria, intuição, análise profunda, perfeccionismo, espiritualidade, reserva.',
    negative: 'Isolamento, melancolia, crítica excessiva, frieza, dificuldade em confiar.',
    element: 'Água', planet: 'Neptuno', color: 'Violeta', gemstone: 'Ametista'
  },
  {
    number: 8,
    category: 'general',
    title: 'O Executivo',
    description: 'O Número 8 é a vibração do poder material, da autoridade e do sucesso. Compreende as leis do dinheiro e da justiça. É capaz de gerir grandes empreendimentos com eficiência e visão de longo prazo, equilibrando o espiritual e o material.',
    tarot_card: 'VIII - A Justiça',
    positive: 'Eficiência, autoridade, sucesso material, justiça, ambição construtiva.',
    negative: 'Materialismo, ganância, abuso de poder, frieza emocional, intolerância.',
    element: 'Terra', planet: 'Saturno', color: 'Rosa', gemstone: 'Quartzo Rosa'
  },
  {
    number: 9,
    category: 'general',
    title: 'O Humanitário',
    description: 'O Número 9 representa a conclusão e a sabedoria universal. É o amor incondicional que abrange toda a humanidade. Altruísta e compassivo, o 9 doa-se para elevar o mundo, sacrificando o ego em prol de um bem maior.',
    tarot_card: 'IX - O Eremita',
    positive: 'Compaixão, generosidade, sabedoria, idealismo, criatividade inspirada.',
    negative: 'Dramatismo, escapismo, solidão, ressentimento, fanatismo.',
    element: 'Fogo', planet: 'Marte', color: 'Dourado', gemstone: 'Ouro'
  },

  // Master Numbers - Expanded 
  {
    number: 11,
    category: 'master',
    title: 'O Visionário',
    description: 'O 11 é o primeiro Mestre, trazendo a iluminação e a intuição em alta voltagem. É a ponte entre o consciente e o inconsciente. Aqueles com esta vibração são canais de inspiração, capazes de ver além da realidade e inspirar outros com a sua luz visionária.',
    tarot_card: 'XI - A Força',
    positive: 'Iluminação, intuição aguçada, liderança espiritual, idealismo prático.',
    negative: 'Nervosismo extremo, fanatismo, falta de chão, desorientação.',
    element: 'Ar', planet: 'Urano', color: 'Prata', gemstone: 'Granada'
  },
  {
    number: 22,
    category: 'master',
    title: 'O Mestre Construtor',
    description: 'O 22 combina a visão do 11 com a praticidade do 4. É capaz de transformar sonhos grandiosos em realidade tangível. É o arquiteto do futuro, cujas realizações beneficiam a coletividade em larga escala. Poder de materialização supremo.',
    tarot_card: 'O Louco (0)',
    positive: 'Genialidade prática, poder de realização, liderança global, construção de legados.',
    negative: 'Destruição em massa, ganância desenfreada, complexo de divindade.',
    element: 'Terra', planet: 'Plutão', color: 'Coral', gemstone: 'Quartzo Fumê'
  },
  {
    number: 33,
    category: 'master',
    title: 'O Mestre do Amor',
    description: 'O 33 é a vibração do Avatar, o amor incondicional em sua forma mais pura (Duplo 6). Representa o sacrifício pessoal pelo bem-estar espiritual da humanidade. É uma energia de cura profunda, ensinando através do exemplo de compaixão e serviço.',
    tarot_card: 'O Mundo (XXI)',
    positive: 'Amor universal, cura espiritual, compaixão extrema, benção, ensino superior.',
    negative: 'Martírio desnecessário, desequilíbrio emocional total, carregar as dores do mundo.',
    element: 'Fogo', planet: 'Neptuno', color: 'Dourado Translúcido', gemstone: 'Diamante'
  },
  {
    number: 44,
    category: 'master',
    title: 'O Mestre da Disciplina',
    description: 'O 44 é o Mestre da matéria e da mente (Duplo 4). Representa o controle absoluto sobre as energias mentais e físicas para curar e construir estruturas sociais avançadas. É o alquimista que transmuta a realidade através da disciplina férrea.',
    tarot_card: 'O Imperador (IV) - Elevado',
    positive: 'Poder mental, alquimia, cura estrutural, gestão de poder, disciplina suprema.',
    negative: 'Abuso de poder mental, rigidez destrutiva, materialismo espiritual.',
    element: 'Terra', planet: 'Saturno', color: 'Verde Esmeralda', gemstone: 'Esmeralda'
  },
  {
    number: 55,
    category: 'master',
    title: 'O Mestre da Mudança',
    description: 'O 55 traz a vibração da liberdade espiritual e da mudança evolutiva rápida (Duplo 5). É o pioneiro de novas consciências, quebrando velhos paradigmas com a força de um furacão para abrir espaço ao novo.',
    tarot_card: 'O Hierofante (V) - Elevado',
    positive: 'Evolução rápida, liberdade espiritual, quebra de paradigmas, inovação visionária.',
    negative: 'Caos destrutivo, instabilidade perigosa, rebeldia sem causa.',
    element: 'Ar', planet: 'Mercúrio Superior', color: 'Azul Elétrico', gemstone: 'Água Marinha'
  },
  {
    number: 66,
    category: 'master',
    title: 'O Mestre da Expressão',
    description: 'O 66 eleva o amor e a comunicação a um nível cósmico (Duplo 6). Traz a criatividade divina para a Terra, expressando a beleza e a verdade de formas que curam a alma coletiva.',
    tarot_card: 'Os Enamorados (VI) - Elevado',
    positive: 'Expressão artística divina, cura pela beleza, harmonia cósmica, amor transcendente.',
    negative: 'Ilusão, escapismo estético, dificuldade em lidar com a realidade crua.',
    element: 'Água', planet: 'Vénus Superior', color: 'Índigo Profundo', gemstone: 'Lápis Lazúli'
  },
  {
    number: 77,
    category: 'master',
    title: 'O Mestre Místico',
    description: 'O 77 é a vibração do especialista espiritual e do discernimento oculto (Duplo 7). Penetra nos véus da ilusão para encontrar a verdade absoluta, libertando a mente das amarras da ignorância.',
    tarot_card: 'O Carro (VII) - Elevado',
    positive: 'Sabedoria oculta, libertação espiritual, discernimento impecável, misticismo prático.',
    negative: 'Isolamento extremo do mundo, orgulho espiritual, desconexão humana.',
    element: 'Fogo', planet: 'Kethu', color: 'Violeta Cristalino', gemstone: 'Alexandrita'
  },
  {
    number: 88,
    category: 'master',
    title: 'O Mestre da Sabedoria',
    description: 'O 88 representa a compreensão infinita das leis do karma e do universo (Duplo 8). É a eficiência espiritual, capaz de gerir energias cármicas complexas para o benefício de todos. O Mestre do "Como é em cima, é em baixo".',
    tarot_card: 'A Justiça (VIII) - Elevado',
    positive: 'Domínio do Karma, sabedoria infinita, justiça divina, realização em todos os planos.',
    negative: 'Frieza absoluta, julgamento implacável, peso cármico esmagador.',
    element: 'Terra', planet: 'Saturno Superior', color: 'Rosa Choque', gemstone: 'Rubelita'
  },
  {
    number: 99,
    category: 'master',
    title: 'O Mestre Universal',
    description: 'O 99 é a vibração final de compaixão e serviço (Duplo 9). Representa a entrega total ao espírito e a liderança através do amor incondicional que transcende o ego completamente.',
    tarot_card: 'O Eremita (IX) - Elevado',
    positive: 'Consciência Crística, doação total, liderança espiritual pura, fim dos ciclos.',
    negative: 'Martírio, anulação total da identidade, incapacidade de viver no mundo prático.',
    element: 'Éter', planet: 'Universo', color: 'Branco Arco-íris', gemstone: 'Opala'
  },
];

function init() {
  console.log('Initializing database...');
  db.exec(schema);

  const insert = db.prepare(`
    INSERT OR REPLACE INTO meanings (number, category, title, description, tarot_card, positive, negative, element, planet, color, gemstone)
    VALUES (@number, @category, @title, @description, @tarot_card, @positive, @negative, @element, @planet, @color, @gemstone)
  `);

  const check = db.prepare('SELECT count(*) as count FROM meanings');
  const existing = check.get();

  if (existing.count === 0) {
    console.log('Seeding data...');
    const transaction = db.transaction((data) => {
      for (const item of data) {
        insert.run(item);
      }
    });
    transaction(seedData);
    console.log('Seeding complete.');
  } else {
    console.log('Data already exists, skipping seed.');
  }
}

init();
