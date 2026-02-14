import API from "@/api/api";

import type { Metadata } from "next";
import ProfileIcon from "@/components/ui/ProfileIcon";
import PostDisplay from "@/components/ui/PostDisplay";
import { Button } from "@/components/ui/Button";
import NotFoundDisplay from "@/components/section/NotFoundDisplay";

type PageProps = {
    params: {
        id: string
    }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { id } = await params; // ✅ AQUI
  const idNum = Number(id);
  const account = API.getAccountById(idNum);

  if (!account?.name) {
    return {
      title: "Perfil não encontrado",
    };
  }

  return {
    title: `Perfil - ${account.name}`,
  };
}

export default async function Profile({ params }: PageProps) {

    const { id } = await params;
    const idNum = Number(id);
    const account = API.getAccountById(idNum);
    const accountPosts = API.getPostsByAccountId(idNum);

    const state = accountPosts.length ? 'active' : 'disabled';

    return (
        <div className="screen-container">
            {account.username && (
                <>
                    <div className="shrink-0 flex flex-col pt-s px-l pb-l gap-m bg-dark rounded-b-xl">
                        <div className="flex justify-center items-center flex-wrap gap-x-l gap-y-s">
                            <ProfileIcon imageSize={120} imageUrl={account.profileImageUrl} style={state} borderWidth={3} />
                            <div className="flex-1 min-w-[150px] flex justify-center items-center flex-wrap gap-x-xl gap-y-m">
                                {/* Num posts */}
                                <div className="grow flex flex-col items-center gap-xxxs">
                                    <h3 className="text-white font-bold text-center">{accountPosts.length}</h3>
                                    <h6 className="text-gray text-center">Posts</h6>
                                </div>
                                {/* Num seguidores */}
                                <div className="grow flex flex-col items-center gap-xxxs">
                                    <h3 className="text-white font-bold text-center">{account.followersQtd}</h3>
                                    <h6 className="text-gray text-center">Seguidores</h6>
                                </div>
                                {account.link && (
                                    <Button
                                        linkType='external'
                                        linkUrl={account.link}
                                        className="min-w-full"
                                    >
                                        Seguir
                                    </Button>
                                )}
                                {!account.link && (
                                    <Button
                                        variant="secondary"
                                        className="min-w-full"
                                        disabled
                                    >
                                        Seguir
                                    </Button>
                                )}
                            </div>
                        </div>
                        {account.description && (
                            <h6 className="text-gray">{account.description}</h6>
                        )}
                    </div>
                    {accountPosts.length && (
                        <div className="flex flex-col pt-xl px-l pb-l gap-l">
                            {accountPosts.map((post, index) =>
                                <PostDisplay
                                    key={index}
                                    id={post.id}
                                    accountId={post.accountId}
                                    imageUrl={post.imageUrl}
                                    description={post.shortDescription}
                                    saved={post.saved}
                                />
                            )}
                        </div>
                    )}
                    {!accountPosts.length && (
                        <div className="flex-1 flex justify-center items-center p-xl">
                            <h5 className="text-gray text-center">Não há posts.</h5>
                        </div>
                    )}
                </>
            )}

            {!account.username && (
                <NotFoundDisplay title="Usuário inexistente ou não encontrado, por favor retorne a página inicial." />
            )}
        </div>
    )
}