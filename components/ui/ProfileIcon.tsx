import React from "react";
import Image from "next/image";

type ProfileIconProps = {
    imageUrl?: string;
    imageAlt?: string;
    imageSize?: number;
    style?: "default" | "normal" | "active" | "disabled";
    borderWidth?: number;
}

const profileClasser = (styleType: ProfileIconProps['style']) => {
    const base = 'inline-flex rounded-full overflow-hidden';

    switch (styleType) {
        case 'default':
            return base;
        case 'normal':
            return `${base} bg-dark`;
        case 'active':
            return `${base} bg-gradient-to-b from-purple to-orange`;
        case 'disabled':
            return `${base} bg-gray1`;
    };
    return '';

};

export default function ProfileIcon(
    { imageUrl = '', imageAlt = '', imageSize = 20, style = 'default', borderWidth = 2 }
        : ProfileIconProps) {

    borderWidth = style === 'default' ? 0 : borderWidth;

    const boxSize = imageSize + borderWidth * 2;

    return (
        <div
            className={profileClasser(style)}
            style={{
                width: boxSize,
                height: boxSize,
                padding: style !== 'default' ? borderWidth : 0,
            }}>
            <Image
                src={imageUrl}
                width={imageSize}
                height={imageSize}
                alt={imageAlt}
                className="rounded-full object-cover w-auto"
            />

        </div>
    )
}