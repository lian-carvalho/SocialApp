import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, } from "react";
import Link from "next/link";

import { twMerge } from "tailwind-merge";

type BaseProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
};

// Botão normal - button
type ButtonOnlyProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
    linkType?: false;
};

// Link interno - Link
type InternalLinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
    linkType: "internal";
    linkUrl: string;
};

// Link externo - a
type ExternalLinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
    linkType: "external";
    linkUrl: string;
};

type ButtonProps =
    | ButtonOnlyProps
    | InternalLinkProps
    | ExternalLinkProps;


// Retorna as classes
const buttonClasser = (
    variant: "primary" | "secondary" = "primary",
    base?: string,
    otherClasses?: string) => {

    base = base || "flex justify-center items-center py-s px-xl gap-xxs text-center font-bold rounded-full cursor-pointer duration-300 disabled:opacity-30 disabled:cursor-default";

    if (!otherClasses) otherClasses = '';

    function variantClass() {
        switch (variant) {
            case "primary":
                return `text-white bg-purple hover:bg-purple1 disabled:hover:bg-purple`;
            case "secondary":
                return `text-purple border border-purple hover:bg-purple/20 disabled:hover:bg-transparent`;
        }
    };

    const finalClass : string = twMerge( base, variantClass(), otherClasses);

    return finalClass;
};

// Componente
export function Button(props: ButtonProps) {
    const { children, variant = "primary", className } = props;

    const classes = buttonClasser(variant, undefined, className);


    // button
    if (!props.linkType) {
        const { linkType, className, ...buttonProps } = props; // linkType não pode ser passado como prop, className é tirado para descarte, o resto pode passar
        return (
            <button className={classes} {...buttonProps}>
                {children}
            </button>
        );
    }

    // Link
    if (props.linkType === "internal") {
        const { linkType, linkUrl, className, ...linkProps } = props; // linkType não pode ser passado como prop, className é tirado para descarte, o resto pode passar
        return (
            <Link href={linkUrl} className={classes} {...linkProps}>
                {children}
            </Link>
        );
    }

    // a
    {
        const { linkType, linkUrl, className, ...anchorProps } = props; // linkType não pode ser passado como prop, className é tirado para descarte, o resto pode passar
        return (
            <a
                href={linkUrl}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
                {...anchorProps}
            >
                {children}
            </a>
        );
    }
}
