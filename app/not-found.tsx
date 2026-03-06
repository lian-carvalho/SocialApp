import { Metadata } from "next";

import NotFoundDisplay from "@/components/section/NotFoundDisplay"

export const metadata: Metadata = {
    title: "Não encontrado(404)",
    description: "Página não encontada ou inexistente, por favor retorne a página inicial."
};

export default function NotFound() {
    return (<div className="screen-container">
        <NotFoundDisplay />
    </div>)
}