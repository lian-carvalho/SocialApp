import { Button } from "@/components/ui/Button";
import { Undo2 } from "lucide-react";

type NotFoundDisplayProps = {
    title?: string;
    action?: string;
    buttonPlaceholder?: string;
}

export default function NotFoundDisplay(
    {   title = 'Página não encontrada ou inexistente, por favor retorne a página inicial.',
        action = '/',
        buttonPlaceholder = 'Retornar a página inicial'
    } : NotFoundDisplayProps) {
        
    return (
        <div className="flex-1 flex flex-col justify-center items-center p-xl gap-l">
            <h2 className="text-white font-bold text-center">{title}</h2>
            <Button linkType='internal' linkUrl={action} variant="secondary" className="rounded-xxs"><Undo2 />{buttonPlaceholder}</Button>
        </div>
    )
}