import styles from './style.module.css'

import API from "@/api/api";

import { useState } from "react";
import ProfileIcon from "../ProfileIcon"
import { Button } from "../Button";
import Link from "next/link"
import { ShoppingBag } from "lucide-react";

type PostInfosProps = {
    postId: number;
    open: boolean;
    openHandlerFunction: (state: boolean) => void;
}

export default function PostInfos({ postId, open, openHandlerFunction }: PostInfosProps) {

    const post = API.getPostById(postId);
    const account = API.getAccountById(post.accountId);
    const product = post.hasProduct ? API.getProductById(post.productId) : false;

    return (
        <div className={`z-3 flex flex-col ${product || post.longDescription ? 'pt-s' : 'pt-m'} px-l pb-m gap-xs bg-dark/90 rounded-t-m ${styles.slideTop}`}>
            {(product || post.longDescription) && (
                <button className="self-center w-[100px] h-[10px] bg-gray1 hover:bg-gray/50 rounded-full cursor-pointer duration-300"
                    onClick={() => { openHandlerFunction(!open) }}
                ></button>
            )}
            {/* Core Container */}
            <div className={`flex ${open ? 'flex-col' : ''} gap-s`}>
                {/* Main Section */}
                <div className="flex-1 min-w-0 flex flex-col gap-s">
                    {/* Header */}
                    <div className="flex items-center gap-xxs min-w-0">
                        <Link href={`/profile/${account.id}`} className="flex shrink-0">
                            <ProfileIcon imageUrl={account.profileImageUrl} imageSize={50} style="active" />
                        </Link>
                        <div className="flex-1 flex flex-col min-w-0">
                            <h5 className="text-white font-bold truncate">{account.name}</h5>
                            <div className="min-w-0 flex-1 flex gap-xs">
                                <small className="block flex-1 text-gray truncate">{account.isFrom}</small>
                                <small className="text-gray shrink-0">{post.postedAt}</small>
                            </div>
                        </div>
                    </div>
                    <InfoShow condition={!!post.shortDescription}>
                        <h6 className="text-white">{post.shortDescription}</h6>
                    </InfoShow>
                </div>
                <div className={`flex flex-col gap-s ${(!post.longDescription && !product) || (!product && !open) ? 'hidden' : ''}`}>
                    <InfoShow condition={!!post.longDescription} show={open}>
                        <h6 className="text-white">{post.longDescription}</h6>
                    </InfoShow>
                    <div className="flex flex-wrap gap-m items-stretch h-full">
                        <InfoShow condition={!!product} show={open}>
                            <p className="text-gray">Preço</p>
                            <h2 className="text-white font-bold truncate">{product.price}</h2>
                        </InfoShow>
                        {product && (
                            <Button className="flex-1 self-stretch rounded-xxs">
                                <ShoppingBag className="icon-l" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

type InfoShowProps = {
    children: React.ReactNode;
    condition: boolean;
    show?: boolean;
}

function InfoShow({ children, condition, show = true }: InfoShowProps) {
    if (!condition || !show) return null;
    return (
        <div className="flex-3 flex flex-col min-w-[160px] p-xs gap-xxxs border-[1.5px] border-white rounded-xs">
            {children}
        </div>
    )
}