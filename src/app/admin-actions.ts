"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { Meaning } from "./actions";

export async function loginAdmin(password: string) {
    // Simple hardcoded password for now. In production, use env var.
    if (password === "admin123") {
        (await cookies()).set("admin_session", "true", { httpOnly: true, path: "/" });
        return { success: true };
    }
    return { success: false, error: "Senha incorreta" };
}

export async function logoutAdmin() {
    (await cookies()).delete("admin_session");
}

export async function checkAuth() {
    return (await cookies()).get("admin_session")?.value === "true";
}

export async function updateMeaning(id: number, data: Partial<Meaning>) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const stmt = db.prepare(`
    UPDATE meanings 
    SET title = @title, description = @description, tarot_card = @tarot_card, 
        positive = @positive, negative = @negative,
        element = @element, planet = @planet, color = @color, gemstone = @gemstone
    WHERE id = @id
  `);

    stmt.run({ ...data, id });
    return { success: true };
}
