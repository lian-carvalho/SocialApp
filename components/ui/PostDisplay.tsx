import API from "@/api/api";

import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";

import ProfileIcon from "./ProfileIcon";

type PostDisplayProps = {
    id: number;
    accountId: number;
    imageUrl: string;
    description: string;
    saved: boolean;
}

export default function PostDisplay({ id, accountId, imageUrl, description, saved }: PostDisplayProps) {
    const postAccount = API.getAccountById(accountId);
    return (
        <div className="flex flex-col p-xxxs gap-xs">
            <div className="flex items-center pb-xxs gap-xs">
                <Link href={`/profile/${accountId}`}>
                    <ProfileIcon imageUrl={postAccount.profileImageUrl} imageSize={42} style="active" borderWidth={2}/>
                </Link>
                <div className="flex flex-col grow min-w-0">
                    <h5 className="text-white font-bold truncate">{postAccount.name}</h5>
                    <h6 className="text-white1 truncate">{postAccount.isFrom}</h6>
                </div>
                <Link href={`/profile/${accountId}`} className="flex flex-col gap-xxxs">
                    <span className="w-[6px] h-[6px] bg-white1 rounded-full"></span>
                    <span className="w-[6px] h-[6px] bg-white1 rounded-full"></span>
                    <span className="w-[6px] h-[6px] bg-white1 rounded-full"></span>
                </Link>
            </div>
            <Link href={`/post/${id}`} className="aspect-square relative rounded-xs overflow-hidden">
                <Image
                    fill
                    src={imageUrl}
                    alt={`${description} de ${postAccount.name}`}
                    className="object-cover"
                />
            </Link>
            <h6 className="text-gray">{description}</h6>
            <Bookmark fill={saved ? '#fff' : 'none'} className="text-white icon-m self-end" />
        </div>
    );
}