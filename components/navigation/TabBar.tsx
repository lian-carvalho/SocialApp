'use client'

import API from '@/api/api'

import { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Bell, SquarePlus, ShoppingCart, ArrowLeft } from "lucide-react";

export default function TabBar() {

    const router = useRouter();
    const pathname = usePathname();

    const { id } = useParams();

    const shop = {
        cartWithItens: true,
        quantity: 5,
        quantityShow() {
            if (this.quantity < 10) return this.quantity.toString();
            return '9+';
        }
    };

    // Use States
    const [newNotifications, setNewNotifications] = useState(true);

    const [tabBarOpen, setTabBarOpen] = useState(true);
    const username = (() => {
        if (!pathname.startsWith('/profile/')) return '';

        const idNum = Number(id);
        const account = API.getAccountById(idNum);

        if (account.name) return String(account.name);

        return '';
    })();

    // UseEffects
    useEffect((() => {
        tabBarOpenHandler();
        notificationsHandler();
    }), [pathname]);

    // Handlers
    const tabBarOpenHandler = () => {
        if (pathname.startsWith('/post/') || pathname.startsWith('/search')) {
            setTabBarOpen(false);
            return;
        };
        if (tabBarOpen !== true) setTabBarOpen(true);
    };

    const notificationsHandler = () => {
        if (!newNotifications) return;
        if (pathname === '/notifications') setNewNotifications(false);
    };

    // Funções
    const backTo = (path: string) => {

        if (pathname !== path && !pathname.startsWith(path)) {
            router.push(path);
            return;
        }

        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }

    };

    const fillByPath = (path: string) => {
        if (pathname === path || pathname.startsWith(path)) return '#fff';
        return 'none';
    };

    // Classer
    const tabBarClasser = (open: boolean) => {
        const base = 'flex justify-between items-center px-m gap-l z-10 text-white bg-dark overflow-hidden transition-all duration-600 ease-in-out';

        if (!open) return `${base} h-0 -translate-y-full opacity-0 pointer-events-none`;

        return `${base} h-auto pb-m pt-xl translate-y-0 opacity-100`;
    }

    return (
        <nav className={tabBarClasser(tabBarOpen)} aria-label="Navegação secundária">
            {username && (
                <div className="cursor-pointer hover:opacity-60 duration-300"
                    title="Voltar"
                >
                    <ArrowLeft className="icon-l" onClick={() => { backTo('/profile') }} />
                </div>
            )}

            {/* Sino de Notificações */}
            {!username && (
                <div className="relative cursor-pointer hover:opacity-60 duration-300"
                    onClick={() => { backTo('/notifications') }}
                    title="Notificações"
                >
                    <Bell
                        className="icon-l"
                        fill={fillByPath('/notifications')} />

                    {newNotifications && (
                        <span className="h-xs w-xs rounded-full bg-purple-1 absolute top-0 right-0"></span>
                    )}
                </div>
            )}

            {/* Nome do usuário */}
            {username && (
                <h3 className="font-bold text-center text-ellipsis line-clamp-1 grow">
                    {username}
                </h3>
            )}

            {/* Container direito */}
            <div className="flex items-center gap-s">
                {/* Botão de nova postagem */}
                <div className=" cursor-pointer hover:opacity-60 duration-300"
                    title="Nova postagem"
                >
                    <SquarePlus className="icon-l" />
                </div>

                {/* Carrinho de compras */}
                {!username && (
                    <div className="relative cursor-pointer hover:opacity-60 duration-300"
                        onClick={() => { backTo('/your_cart') }}
                        title="Meu carrinho"
                    >
                        <ShoppingCart className="icon-l" fill={fillByPath('/your_cart')} />

                        {shop.cartWithItens && (
                            <div className="h-s w-s flex justify-between items-center bg-purple-1 rounded-full absolute top-0 right-0">
                                <small className="text-center grow">{shop.quantityShow()}</small>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </nav>
    );
};