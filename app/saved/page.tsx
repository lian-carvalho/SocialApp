import API from "@/api/api"
import PostDisplay from "@/components/ui/PostDisplay";

export default function Saved() {
    const savedPosts = API.getSavedPosts();
    return (
        <div className="screen-container">
            <div className="flex flex-col pt-xl px-xl gap-s">
                <h3 className="text-white font-bold">
                    Salvos
                </h3>
                <span className="h-[2px] w-full bg-gradient-to-r from-purple to-orange opacity-80 rounded-full"></span>
            </div>
            {savedPosts.length && (
                <div className="flex flex-col p-l gap-l">
                    {savedPosts.map((post, index) =>
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
            {!savedPosts.length && (
                <div className="flex-1 flex justify-center items-center p-l">
                    <h5 className="text-gray text-center">Não há posts salvos.</h5>
                </div>
            )}
        </div>
    )
}