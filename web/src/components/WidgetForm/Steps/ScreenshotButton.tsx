import html2canvas from "html2canvas";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../../Loading";


interface ScreenshotButtonProps {
    screenshot: string | null
    onScreenshotTook: (screenshot: string | null) => void
}



export function ScreenshotButton({
    screenshot,
    onScreenshotTook, 
}: ScreenshotButtonProps) {

    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshote() {
        setIsTakingScreenshot(true)

        const canvas = await html2canvas(document.querySelector('html')!) //"!" afirma que nunca será nulo;
        const base64image = canvas.toDataURL('image/png'); //transforma a imagem em base 64, transformando ela em texto. (representação em texto da imagem)

        onScreenshotTook(base64image)

        setIsTakingScreenshot(false)
    }

    if(screenshot) {
        return(
            <button
                type="button"
                onClick={() => onScreenshotTook(null)}
                className="p-1 w-10 h-10 rounded-md border-transparent flex items-end justify-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={handleTakeScreenshote}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >   
            {/* criando um loading para o print */}
            { isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6"/>}

        </button>
    )
}