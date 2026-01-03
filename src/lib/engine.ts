export class NumerologyEngine {
    private static pythagoreanTable: Record<string, number> = {
        a: 1, j: 1, s: 1,
        b: 2, k: 2, t: 2,
        c: 3, l: 3, u: 3,
        d: 4, m: 4, v: 4,
        e: 5, n: 5, w: 5,
        f: 6, o: 6, x: 6,
        g: 7, p: 7, y: 7,
        h: 8, q: 8, z: 8,
        i: 9, r: 9,
    };

    private static vowels = ['a', 'e', 'i', 'o', 'u'];

    /**
     * Normalizes text: removes accents, converts to lowercase, keeps only letters.
     */
    static normalize(text: string): string {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove accents
            .toLowerCase()
            .replace(/[^a-z]/g, ""); // Keep only letters
    }

    /**
     * Reduces a number to a single digit (1-9) or keeps Master Numbers (11-99).
     */
    static reduce(num: number): number {
        if (num === 0) return 0;

        // Check for Master Numbers (11, 22, ..., 99)
        if (num >= 11 && num <= 99 && num % 11 === 0) {
            return num;
        }

        if (num <= 9) return num;

        let sum = 0;
        const digits = num.toString().split('');

        for (const digit of digits) {
            sum += parseInt(digit, 10);
        }

        // Recursively reduce unless it hits a Master Number
        return this.reduce(sum);
    }

    /**
     * Calculates the value of a string based on the Pythagorean table.
     */
    static calculateStringValue(text: string, filter: 'all' | 'vowels' | 'consonants' = 'all'): number {
        const normalized = this.normalize(text);
        let sum = 0;

        for (const char of normalized) {
            const value = this.pythagoreanTable[char] || 0;
            const isVowel = this.vowels.includes(char);

            if (filter === 'all') {
                sum += value;
            } else if (filter === 'vowels' && isVowel) {
                sum += value;
            } else if (filter === 'consonants' && !isVowel) {
                sum += value;
            }
        }

        return this.reduce(sum);
    }

    /**
   * Calculates Destiny (Life Path) from Date of Birth.
   * Method: Sum of all digits in the date.
   * Example: 23/07/1974 -> 2+3+0+7+1+9+7+4 = 33.
   */
    static calculateDestiny(dateString: string): { day: number, month: number, year: number, destiny: number, mission: number, personalYear: number } {
        // dateString format: YYYY-MM-DD
        const [yearStr, monthStr, dayStr] = dateString.split('-');

        if (!yearStr || !monthStr || !dayStr) {
            throw new Error("Invalid date format. Use YYYY-MM-DD");
        }

        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);

        // Day of Birth (Dia Natalício) - No reduction
        const dayNatal = day;

        // Destiny: Sum of ALL digits in the date string
        // 1974-07-23 -> 1+9+7+4+0+7+2+3 = 33
        const fullDateStr = `${dayStr}${monthStr}${yearStr}`;
        let sumOfDigits = 0;
        for (const char of fullDateStr) {
            if (!isNaN(parseInt(char))) {
                sumOfDigits += parseInt(char);
            }
        }

        const destiny = this.reduce(sumOfDigits);

        // Personal Year: Day + Month + Current Year
        // Current Year should be reduced? Usually yes.
        // Example: 23 + 07 + 2024 -> 5 + 7 + 8 = 20 -> 2.
        // Or 2+3+0+7+2+0+2+4 = 20 -> 2.
        // Let's use the sum of digits method for consistency.
        const currentYear = new Date().getFullYear();
        const currentYearStr = currentYear.toString();
        const personalYearStr = `${dayStr}${monthStr}${currentYearStr}`;

        let pySum = 0;
        for (const char of personalYearStr) {
            if (!isNaN(parseInt(char))) {
                pySum += parseInt(char);
            }
        }
        const personalYear = this.reduce(pySum);

        return {
            day: dayNatal,
            month,
            year,
            destiny,
            mission: 0,
            personalYear
        };
    }

    /**
     * Calculates Analysis: Karmic Lessons, Hidden Tendencies, Temperament.
     */
    static calculateAnalysis(name: string) {
        const normalized = this.normalize(name);
        const counts: Record<number, number> = {};

        // Initialize counts 1-9
        for (let i = 1; i <= 9; i++) counts[i] = 0;

        for (const char of normalized) {
            const val = this.pythagoreanTable[char] || 0;
            if (val > 0) counts[val] = (counts[val] || 0) + 1;
        }

        // Karmic Lessons: Numbers with 0 count
        const karmicLessons = Object.entries(counts)
            .filter(([_, count]) => count === 0)
            .map(([num]) => parseInt(num));

        // Hidden Tendencies: Numbers with >= 3 counts
        const hiddenTendencies = Object.entries(counts)
            .filter(([_, count]) => count >= 3)
            .map(([num]) => parseInt(num));

        // Temperament Planes
        const physical = (counts[4] || 0) + (counts[5] || 0);
        const mental = (counts[1] || 0) + (counts[8] || 0);
        const emotional = (counts[2] || 0) + (counts[3] || 0) + (counts[6] || 0);
        const intuitive = (counts[7] || 0) + (counts[9] || 0);

        const total = physical + mental + emotional + intuitive;

        // Calculate Percentages
        const temperament = {
            physical: total ? Math.round((physical / total) * 100) : 0,
            mental: total ? Math.round((mental / total) * 100) : 0,
            emotional: total ? Math.round((emotional / total) * 100) : 0,
            intuitive: total ? Math.round((intuitive / total) * 100) : 0,
            dominant: 'physical'
        };

        // Determine Dominant
        const tempMap = { physical: temperament.physical, mental: temperament.mental, emotional: temperament.emotional, intuitive: temperament.intuitive };
        temperament.dominant = Object.keys(tempMap).reduce((a, b) => tempMap[a as keyof typeof tempMap] > tempMap[b as keyof typeof tempMap] ? a : b);

        return {
            karmicLessons,
            hiddenTendencies,
            temperament
        };
    }

    static calculateCycles(day: number, month: number, year: number, destiny: number) {
        const cycle1End = 37 - destiny;
        const cycle2End = cycle1End + 27;

        return {
            cycle1: { ruler: this.reduce(month), endAge: cycle1End, type: "Formativo" },
            cycle2: { ruler: this.reduce(day), endAge: cycle2End, type: "Produtivo" },
            cycle3: { ruler: this.reduce(year), startAge: cycle2End, type: "Colheita" }
        };
    }

    static calculateChallenges(day: number, month: number, year: number) {
        const rDay = this.reduce(day);
        const rMonth = this.reduce(month);
        const rYear = this.reduce(year);

        const sub1 = Math.abs(rDay - rMonth);
        const sub2 = Math.abs(rDay - rYear);
        const main = Math.abs(sub1 - sub2);
        const extra = Math.abs(rYear - rMonth);

        return {
            challenge1: sub1,
            challenge2: sub2,
            main: main,
            extra: extra
        };
    }

    /**
     * Generates the full Profile including Analysis.
     */
    static calculateProfile(name: string, date: string) {
        const motivation = this.calculateStringValue(name, 'vowels');
        const impression = this.calculateStringValue(name, 'consonants');
        const expression = this.calculateStringValue(name, 'all');

        const { day, month, year, destiny, personalYear } = this.calculateDestiny(date);
        const mission = this.reduce(destiny + expression);

        const analysis = this.calculateAnalysis(name);
        const cycles = this.calculateCycles(day, month, year, destiny);
        const challenges = this.calculateChallenges(day, month, year);

        return {
            name: name,
            date: date,
            core: {
                motivation, // Soul
                impression, // Personality
                expression,
                day,        // Day of Birth
                destiny,    // Life Path
                mission,
            },
            analysis,
            cycles,
            challenges,
            forecast: {
                personalYear
            }
        };
    }
}
