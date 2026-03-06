import { Metadata } from "next";

import API from "@/api/api";

import Link from "next/link"
import ProfileIcon from "@/components/ui/ProfileIcon"
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Notificações - SocialApp",
    description: "Suas notificações | A portfolio project developed by Lian Dev"
};

export default function Notifications() {
    const appNotifications = API.getNotifications();

    return (
        <div className="screen-container p-xl gap-s">
            <h3 className="text-white font-bold">
                Notificações
            </h3>
            <span className="h-[2px] w-full bg-gray1/50 rounded-full"></span>
            {appNotifications && (
                <div className="flex flex-col gap-xs">
                    {appNotifications.map((notification, index) =>
                        <Notification
                            key={index}
                            mensage={notification.title}
                            accountId={notification.accountId}
                            childrenNum={index}
                        />
                    )}
                </div>
            )}
            {!appNotifications && (
                <div className="flex-1 flex justify-center items-center p-xl">
                    <h5 className="text-gray text-center">Não há novas notificações.</h5>
                </div>
            )}
        </div>
    )
}

type NotificationProps = {
    mensage: string;
    accountId: number;
    childrenNum: number;
};

function Notification({ mensage, accountId, childrenNum }: NotificationProps) {

    const image = API.getAccountById(accountId).profileImageUrl;

    return (
        <div className="flex py-xs px-xs gap-xs items-center bg-gray/10">
            <Link href={`/profile/${accountId}`} className="flex">
                <ProfileIcon imageUrl={image} imageSize={35} />
            </Link>
            <p className="text-white grow">{mensage}</p>
            <ChevronRight className="icon-l text-purple-1 hover:text-purple-1/50 cursor-pointer duration-300" />
        </div>
    )
}