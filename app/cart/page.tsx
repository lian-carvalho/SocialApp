import { Metadata } from "next";

import API from "@/api/api";

import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
    title: "Carrinho - SocialApp",
    description: "Carrinho de compras | A portfolio project developed by Lian Dev"
};

export default function Cart() {
    const inCartProducts = API.getInCartProducts();
    const otherProducts = API.getProducts().filter((product) => !product.inCart);
    return (
        <div className="screen-container p-xl gap-s">
            <h3 className="text-white font-bold">
                Carrinho
            </h3>
            <span className="shrink-0 h-[2px] w-full bg-purple-1/50 rounded-full"></span>
            {!!inCartProducts && (
                <div className="flex flex-col gap-s">
                    {inCartProducts.map((product, index) =>
                        <ProductCard
                            key={index}
                            name={product.name}
                            description={product.description}
                            imgUrl={product.imageUrl}
                            link={product.link}
                            price={product.price}
                            inCartState={product.inCart}
                        />
                    )}
                </div>
            )}

            {!inCartProducts.length && (
                <div className="flex-1 flex justify-center items-center p-l">
                    <h5 className="text-gray text-center">Não há produtos no carrinho.</h5>
                </div>
            )}

            <span className="shrink-0 h-[2px] w-full bg-gray1/50 rounded-full"></span>

            {!!otherProducts && (
                <div className="flex flex-col gap-s">
                    {otherProducts.map((product, index) =>
                        <ProductCard
                            key={index}
                            name={product.name}
                            description={product.description}
                            imgUrl={product.imageUrl}
                            price={product.price}
                            link={product.link}
                            inCartState={product.inCart}
                        />
                    )}
                </div>
            )}

            {!otherProducts.length && (
                <div className="flex-1 flex justify-center items-center p-l">
                    <h5 className="text-gray text-center">Não há mais produtos.</h5>
                </div>
            )}
        </div>
    )
}