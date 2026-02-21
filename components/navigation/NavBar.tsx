'use client'

import API from "@/api/api";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"

import { House, Search, Bookmark, User } from "lucide-react";

export default function NavBar() {

    const loggedId = API.getLoggedAccountId();

    const pathname = usePathname();
    const [navBarOpen, setNavBarOpen] = useState(false);

    useEffect(() => {

        if (pathname.startsWith('/post/')) {
            setNavBarOpen(false);
            return;
        };
        if (pathname.startsWith('/profile/') && pathname !== `/profile/${loggedId}`) {
            setNavBarOpen(false);
            return;
        }
        if (navBarOpen !== true) setNavBarOpen(true);

    }, [pathname]);

    // Classer
    const navBarClasser = (open: boolean) => {
        const base = 'flex justify-between items-center px-l z-9 bg-dark rounded-t-m overflow-hidden transition-all duration-600 ease-in-out';

        if (!open) return `${base} h-0 translate-y-full opacity-0 pointer-events-none`;

        return `${base} h-auto py-m translate-y-0 opacity-100`;
    };

    return (
        <nav className={navBarClasser(navBarOpen)} aria-label="Navegação principal">
            {/* Home */}
            <NavOption navPath="/" actualPath={pathname} navTitle="Início">
                <House className="icon-l" />
            </NavOption>

            {/* Pesquisar */}
            <NavOption navPath="/search" actualPath={pathname} navTitle="Pesquisar">
                <Search className="icon-l" />
            </NavOption>

            {/* Salvos */}
            <NavOption navPath="/saved" actualPath={pathname} navTitle="Salvos">
                <Bookmark className="icon-l" />
            </NavOption>

            {/* Meu perfil */}
            <NavOption navPath={`/profile/${loggedId}`} actualPath={pathname} navTitle="Meu perfil">
                <User className="icon-l" />
            </NavOption>
        </nav>
    )
}

type NavOptionProps = {
    children: React.ReactNode;
    navPath: string;
    actualPath: string;
    navTitle: string;
}

function NavOption({ children, navPath, actualPath, navTitle }: NavOptionProps) {

    const classer = (optionPath: string, actualPath: string) => {
        const base = 'flex p-xxs text-white duration-300 rounded-full focus:outline-hidden border-2 border-transparent';

        if (optionPath !== actualPath) return `${base} hover:bg-gray/10 focus:border-purple`;

        return `${base} bg-purple focus:bg-purple/70`;

    };

    return (
        <Link href={navPath} className={classer(navPath, actualPath)} title={navTitle}>
            {children}
        </Link>
    )
}