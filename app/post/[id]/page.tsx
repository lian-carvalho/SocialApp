import { Metadata } from "next";

import API from "@/api/api";

import PostView from "@/components/ui/PostView";
import NotFoundDisplay from "@/components/section/NotFoundDisplay";

export const metadata: Metadata = {
    title: "Post - SocialApp",
    description: "Veja esse post! | A portfolio project developed by Lian Dev"
};

type PageProps = {
    params: {
        id: string
    }
}

export default async function Post({ params }: PageProps) {

    const { id } = await params;
    const idNum = Number(id);

    const postExists = !!API.getPostById(idNum);

    return (
        <div className="screen-container">
            {postExists && (
                <PostView postId={idNum} />
            )}
            {!postExists && (
                <NotFoundDisplay
                    title="Post não encontrado ou inexistente, por favor retorne a página inicial." />
            )}
        </div>
    )
}