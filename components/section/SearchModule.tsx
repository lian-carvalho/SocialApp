'use client'
import API from "@/api/api"

import { useState } from "react"
import ProfileIcon from "@/components/ui/ProfileIcon"
import Link from "next/link"
import { Search } from "lucide-react"

export default function SearchModule() {

    const [filteredAccounts, setFilteredAccounts] = useState(API.getAccounts());

    const handleSearch = (search: string) => {
        const clearSearch = search.trim().toLowerCase();

        if (!clearSearch) {
            setFilteredAccounts(API.getAccounts());
            return;
        };

        setFilteredAccounts(API.getAccountsWith(clearSearch));
    };

    return (
        <>
            <div className="flex pt-xl px-m pb-m bg-dark">
                <div className="flex-1 flex items-center p-s gap-xs border-[1.5px] border-white rounded-full">
                    <Search className="text-white icon-xl" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="flex-1 text-h4 text-white1 outline-none"
                        onChange={e => handleSearch(e.target.value)}
                    />
                </div>
            </div>
            {filteredAccounts.length && (
                <div className="flex flex-col p-l gap-xs">
                    {filteredAccounts.map((account, index) =>
                        <AccountSearchDisplay
                            key={index}
                            accountId={account.id}
                            name={account.name}
                            username={account.username}
                            description={account.description}
                            imgUrl={account.profileImageUrl}
                            hasPosts={!!account.postsQtd}
                        />
                    )}
                </div>
            )}
            {!filteredAccounts.length && (
                <div className="flex-1 flex justify-center items-center p-xl">
                    <h5 className="text-gray text-center">Não há contas a serem mostradas.</h5>
                </div>
            )}
        </>
    )
}

type AccountSearchDisplayProps = {
    accountId: number;
    name: string;
    username: string;
    description: string;
    imgUrl: string;
    hasPosts: boolean;
};

function AccountSearchDisplay({ accountId, name, username, description, imgUrl, hasPosts }: AccountSearchDisplayProps) {

    const state = hasPosts ? 'active' : 'disabled';
    description = !!description ? description : '...';
    username = `@${username}`;

    return (
        <Link href={`/profile/${accountId}`}
            className="flex items-center py-s px-xs gap-xs bg-gray/10">
            <ProfileIcon imageUrl={imgUrl} imageSize={50} style={state} />
            <div className="flex flex-col min-w-0 pr-xs">
                <h4 className="text-white font-bold truncate">{name}</h4>
                <small className="text-white font-bold truncate">{username}</small>
                <small className="text-gray1 truncate">{description}</small>
            </div>
        </Link>
    )
}