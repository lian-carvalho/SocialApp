import { Metadata } from "next"

import SearchModule from "@/components/section/SearchModule"

export const metadata: Metadata = {
    title: "Pesquisar - SocialApp",
    description: "Buscar por | A portfolio project developed by Lian Dev"
};

export default function Search() {
    return (
        <div className="screen-container">
            <SearchModule />
        </div>
    )
}