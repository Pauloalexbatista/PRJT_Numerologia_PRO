// Documentação técnica das variáveis numerológicas
export interface CalculationVariable {
    id: string;
    name: string;
    description: string;
    formula: string;
    example: string;
    category: 'core' | 'analysis' | 'forecast' | 'cycles';
}

export const calculationVariables: CalculationVariable[] = [
    // CORE NUMBERS
    {
        id: 'destiny',
        name: 'Destino (Caminho de Vida)',
        description: 'O número mais importante do mapa. Representa o propósito de vida e as lições principais a aprender.',
        formula: 'Soma de TODOS os dígitos da data de nascimento, depois reduzir até número simples (1-9) ou mestre (11, 22, 33, etc.)',
        example: 'Data: 23/07/1974 → 2+3+0+7+1+9+7+4 = 33 → Destino = 33 (número mestre, não reduz)',
        category: 'core'
    },
    {
        id: 'soul',
        name: 'Alma (Motivação)',
        description: 'Representa os desejos internos, o que motiva a pessoa profundamente.',
        formula: 'Soma dos valores das VOGAIS do nome completo, depois reduzir',
        example: 'Nome: PAULO → Vogais: A, U, O → 1+3+6 = 10 → 1+0 = 1',
        category: 'core'
    },
    {
        id: 'personality',
        name: 'Personalidade (Impressão)',
        description: 'Como os outros veem a pessoa, a máscara social.',
        formula: 'Soma dos valores das CONSOANTES do nome completo, depois reduzir',
        example: 'Nome: PAULO → Consoantes: P, L → 7+3 = 10 → 1+0 = 1',
        category: 'core'
    },
    {
        id: 'expression',
        name: 'Expressão',
        description: 'Talentos naturais e habilidades inatas.',
        formula: 'Soma dos valores de TODAS as letras do nome completo, depois reduzir',
        example: 'Nome: PAULO → P+A+U+L+O → 7+1+3+3+6 = 20 → 2+0 = 2',
        category: 'core'
    },
    {
        id: 'mission',
        name: 'Missão / Aprendizagem / Karma',
        description: 'A missão de vida, combinação do destino com a expressão.',
        formula: 'Destino + Expressão, depois reduzir',
        example: 'Destino: 6, Expressão: 2 → 6+2 = 8',
        category: 'core'
    },
    {
        id: 'powerNumber',
        name: 'Número do Poder',
        description: 'A energia disponível para agir, assumir responsabilidade, exercer liderança e manifestar conscientemente.',
        formula: 'Expressão + Vida (Destino), depois reduzir',
        example: 'Expressão: 2, Destino: 6 → 2+6 = 8',
        category: 'core'
    },
    {
        id: 'stressNumber',
        name: 'Número de Stress',
        description: 'O conflito entre personalidade e missão da alma. Onde existe maior desgaste e stress energético.',
        formula: '|Expressão - Vida|, depois reduzir',
        example: 'Expressão: 2, Destino: 6 → |2-6| = 4',
        category: 'core'
    },
    {
        id: 'finalNumber',
        name: 'Número Final',
        description: 'Integração de personalidade e alma. O alinhamento entre Alma e Personalidade para encarnar o papel kármico.',
        formula: 'Expressão + Vida + Vogais + Consoantes, depois reduzir',
        example: 'Expressão: 2, Destino: 6, Vogais: 1, Consoantes: 1 → 2+6+1+1 = 10 → 1',
        category: 'core'
    },

    // FORECAST
    {
        id: 'personalYear',
        name: 'Ano Pessoal',
        description: 'A energia e as tendências para o ano atual.',
        formula: 'Dia + Mês de nascimento + Ano ATUAL (todos os dígitos somados)',
        example: 'Nascimento: 23/07, Ano atual: 2026 → 2+3+0+7+2+0+2+6 = 22 (mestre)',
        category: 'forecast'
    },
    {
        id: 'personalMonth',
        name: 'Mês Pessoal',
        description: 'A energia e as tendências para o mês atual.',
        formula: 'Ano Pessoal + Mês vigente, depois reduzir',
        example: 'Ano Pessoal: 22, Mês atual: Janeiro (1) → 22+1 = 23 → 2+3 = 5',
        category: 'forecast'
    },
    {
        id: 'personalDay',
        name: 'Dia Pessoal',
        description: 'A energia e as tendências para o dia atual.',
        formula: 'Mês Pessoal + Dia vigente, depois reduzir',
        example: 'Mês Pessoal: 5, Dia atual: 5 → 5+5 = 10 → 1+0 = 1',
        category: 'forecast'
    },

    // CYCLES
    {
        id: 'cycle1',
        name: 'Ciclo 1 - Formativo',
        description: 'Primeiro ciclo de vida, formação da personalidade.',
        formula: 'Regente: Mês de nascimento reduzido. Duração: até idade (37 - Destino)',
        example: 'Mês: 07 → 7. Destino: 6. Fim: 37-6 = 31 anos',
        category: 'cycles'
    },
    {
        id: 'cycle2',
        name: 'Ciclo 2 - Produtivo',
        description: 'Segundo ciclo, fase produtiva e de realização.',
        formula: 'Regente: Dia de nascimento reduzido. Duração: 27 anos após Ciclo 1',
        example: 'Dia: 23 → 2+3 = 5. Início: 31 anos. Fim: 31+27 = 58 anos',
        category: 'cycles'
    },
    {
        id: 'cycle3',
        name: 'Ciclo 3 - Colheita',
        description: 'Terceiro ciclo, sabedoria e colheita das experiências.',
        formula: 'Regente: Ano de nascimento reduzido. Início: após Ciclo 2',
        example: 'Ano: 1974 → 1+9+7+4 = 21 → 2+1 = 3. Início: 58 anos',
        category: 'cycles'
    },
    {
        id: 'karmicObjective',
        name: 'Objetivo Kármico',
        description: 'O objetivo final no término dos ciclos de vida. A meta espiritual a alcançar.',
        formula: 'Número regente do Ciclo 3 (Colheita)',
        example: 'Ciclo 3 regente: 3 → Objetivo Kármico = 3',
        category: 'cycles'
    },

    // ANALYSIS
    {
        id: 'karmicLessons',
        name: 'Lições Cármicas / Ausências Kármicas',
        description: 'Números ausentes no nome, representam lições a aprender. Energias que estão a ser negligenciadas.',
        formula: 'Identificar quais números de 1 a 9 NÃO aparecem no nome',
        example: 'Nome: PAULO → Tem: 1,3,6,7 → Faltam: 2,4,5,8,9 (lições cármicas)',
        category: 'analysis'
    },
    {
        id: 'karmicHeritages',
        name: 'Heranças Kármicas',
        description: 'Mesmo que Lições Cármicas / Ausências Kármicas. Números ausentes que representam heranças a trabalhar.',
        formula: 'Identificar quais números de 1 a 9 NÃO aparecem no nome',
        example: 'Nome: PAULO → Heranças: 2,4,5,8,9',
        category: 'analysis'
    },
    {
        id: 'hiddenTendencies',
        name: 'Tendências Ocultas',
        description: 'Números que aparecem 3+ vezes no nome. A sombra que se repete e que temos de trabalhar.',
        formula: 'Contar frequência de cada número. Se ≥ 3 ocorrências = tendência oculta',
        example: 'Nome: ANNA → A=1 (2x), N=5 (2x) → Nenhuma tendência oculta',
        category: 'analysis'
    },
    {
        id: 'temperament',
        name: 'Temperamento',
        description: 'Distribuição entre os 4 planos: Físico, Mental, Emocional, Intuitivo.',
        formula: 'Físico: 4,5 | Mental: 1,8 | Emocional: 2,3,6 | Intuitivo: 7,9. Calcular percentagens.',
        example: 'PAULO → P(7), A(1), U(3), L(3), O(6) → Mental:1, Emocional:3, Intuitivo:1 → 20%/60%/0%/20%',
        category: 'analysis'
    },
    {
        id: 'challenges',
        name: 'Desafios Kármicos',
        description: 'Obstáculos e lições a superar em diferentes fases da vida.',
        formula: 'Desafio 1: |Dia - Mês|, Desafio 2: |Dia - Ano|, Principal: |D1 - D2|, Extra: |Ano - Mês|',
        example: 'Data: 23/07/1974 → D1:|5-7|=2, D2:|5-3|=2, Principal:|2-2|=0, Extra:|3-7|=4',
        category: 'analysis'
    }
];

// Tabela Pitagórica para referência
export const pythagoreanTable = {
    1: ['A', 'J', 'S'],
    2: ['B', 'K', 'T'],
    3: ['C', 'L', 'U'],
    4: ['D', 'M', 'V'],
    5: ['E', 'N', 'W'],
    6: ['F', 'O', 'X'],
    7: ['G', 'P', 'Y'],
    8: ['H', 'Q', 'Z'],
    9: ['I', 'R']
};
