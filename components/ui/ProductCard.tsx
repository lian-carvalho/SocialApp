'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "./Button"
import { ShoppingCart } from "lucide-react"

type ProductCardProps = {
    name: string;
    description: string;
    imgUrl: string;
    price: string;
    link: string | undefined;
    inCartState: boolean;
};

export default function ProductCard({ name, description, imgUrl, price, link, inCartState }: ProductCardProps) {

    const [inCart, setInCart] = useState(inCartState);

    return (
        <div className="flex flex-wrap justify-center py-s px-m gap-xs bg-gray/10">
            <div className="min-w-[75px] max-w-[100px] aspect-square flex-1 relative overflow-hidden bg-gray rounded-xxxs">
                <Image
                    src={imgUrl}
                    alt={`Foto de ${name}`}
                    fill
                />
            </div>

            <div className="min-w-[130px] flex-2 flex flex-col">
                <h5 className="text-white font-bold min-w-0 truncate">{name}</h5>
                <p className="text-gray1 line-clamp-3">{description}</p>
            </div>

            <h5 className="min-w-full text-purple">
                <b className="text-white font bold">Preço: </b>
                {price}
            </h5>

            <div className="min-w-full flex flex-wrap gap-xs items-center">
                {link && (
                    <Button linkType='external' linkUrl={link} className="min-w-max flex-20 rounded-xs">Saiba mais</Button>
                )}
                <Button
                    variant={inCart ? 'primary' : 'secondary'}
                    className={`border-[1.5px] flex-1 py-xs px-xs ${inCart ? 'border-purple hover:border-purple1' : ''}`}
                    onClick={() => { setInCart(!inCart) }}>
                    <ShoppingCart className="icon-xl" fill={inCart ? '#fff' : 'none'} />
                </Button>
            </div>
        </div>
    )
}