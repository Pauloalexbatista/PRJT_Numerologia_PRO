import { redirect } from "next/navigation";
import { getAllMeanings } from "@/app/actions";
import { checkAuth, updateMeaning, logoutAdmin } from "@/app/admin-actions";
import { DashboardClient } from "./client"; // We'll put the interactive part here

export default async function AdminDashboard() {
    const isAuth = await checkAuth();
    if (!isAuth) {
        redirect("/admin");
    }

    const meanings = await getAllMeanings();

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-cinzel text-primary">Painel de Controlo - Numerologia</h1>
                    <form action={async () => {
                        "use server";
                        await logoutAdmin();
                        redirect("/admin");
                    }}>
                        <button className="bg-red-900/50 hover:bg-red-800 text-red-200 px-4 py-2 rounded">
                            Sair
                        </button>
                    </form>
                </div>

                <DashboardClient initialMeanings={meanings} />
            </div>
        </div>
    );
}
