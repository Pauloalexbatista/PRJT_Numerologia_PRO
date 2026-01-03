"use server";

import { db } from "@/lib/db";

// Types
export interface Meaning {
    id: number;
    number: number;
    category: string;
    title: string;
    description: string;
    tarot_card: string;
    positive: string;
    negative: string;
    image_url: string | null;
    element?: string;
    planet?: string;
    color?: string;
    gemstone?: string;
}

export async function getMeaning(number: number): Promise<Meaning | undefined> {
    const stmt = db.prepare('SELECT * FROM meanings WHERE number = ?');
    return stmt.get(number) as Meaning | undefined;
}

export async function getAllMeanings(): Promise<Meaning[]> {
    const stmt = db.prepare('SELECT * FROM meanings');
    return stmt.all() as Meaning[];
}
