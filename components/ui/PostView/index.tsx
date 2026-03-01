'use client'
import styles from './style.module.css'

import API from "@/api/api";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostInfos from "./PostInfos";
import Image from "next/image"

import { ArrowLeft } from "lucide-react";

type PostViewProps = {
    postId: number;
};

export default function PostView({ postId }: PostViewProps) {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const openInfosHandler = (state: boolean) => {
        if (!(open === state)) setOpen(state);
    };

    const backTo = () => {
        if (window.history.length <= 1) {
            router.push('/');
            return;
        }

        const referrer = document.referrer;
        if (referrer) {
            const previousPath = new URL(referrer).pathname;
            if (previousPath.startsWith('/post')) {
                router.push('/');
                return;
            }
        }

        router.back();
    };

    const post = API.getPostById(postId);

    return (
        <div className="grow flex flex-col justify-between pt-xxl relative">
            <button className={`z-3 size-fit flex py-xxs pl-s pr-l bg-dark text-white hover:text-white/70 rounded-r-s cursor-pointer duration-300 ${styles.slideRight}`}
                onClick={() => { backTo() }}>
                <ArrowLeft className="icon-xl" />
            </button>

            <div className="z-1 absolute top-0 left-0 h-full w-full">
                {/* Filter */}
                <div className={`z-2 absolute top-0 left-0 h-full w-full bg-black/70 duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => openInfosHandler(false)}
                ></div>

                {/* Image */}
                <div className="z-1 relative h-full w-full">
                    <Image
                        fill
                        src={post.imageUrl}
                        alt={`Post N° ${postId}`}
                        className="object-cover"
                    />
                </div>
            </div>

            <PostInfos postId={postId} open={open} openHandlerFunction={openInfosHandler} />
        </div>
    )
}

