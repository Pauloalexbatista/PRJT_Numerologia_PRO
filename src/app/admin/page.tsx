"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/admin-actions";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await loginAdmin(password);
        if (res.success) {
            router.push("/admin/dashboard");
        } else {
            alert("Acesso Negado");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <form onSubmit={handleLogin} className="space-y-4 p-8 border border-white/20 rounded-lg">
                <h1 className="text-2xl font-bold">Admin Numerologia</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                    placeholder="Senha"
                />
                <button className="w-full bg-white text-black font-bold p-2 rounded hover:bg-neutral-200">
                    Entrar
                </button>
            </form>
        </div>
    );
}
