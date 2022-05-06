import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackContentStepProps {
//propriedade "feedbackType" recebe a tipagem "FeedbackType"
    feedbackType: FeedbackType
//está propriedade "() => void" não tem tipagem e não retorna nada.
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}


export function FeedbackContentStep({
//desestruturando o props e passando a interface do tipo;
    feedbackType, 
    onFeedbackRestartRequested, 
    onFeedbackSent
}: FeedbackContentStepProps) {

    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSedingFeedback] = useState(false)

//"feedbackTypeInfo" recebe de "feedbackTypes" apenas uma das opção vinda de "feedbackType".
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()

        setIsSedingFeedback(true)

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,       
        });

        console.log({
            screenshot, 
            comment
        })

        setIsSedingFeedback(false)
        onFeedbackSent()
    }

    return (
//fragmento "<>...</>"- substitui uma div e não é visivel no html final.
        <> 
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>

                <span className="text-xl leading-6 flex items-center gap-6">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                    {feedbackTypeInfo.tittle}
                </span>
                <CloseButton />

            </header>    

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    onChange={event => setComment(event.target.value)} //cada vez que o valor do text area mudar ele vai setar na variavel "comment"
                    className="min-w-[384px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                >

                </textarea>
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        disabled={comment.length == 0 || isSendingFeedback} //desabilitado enquanto não ter comentário ou enquanto já estiver enviando.
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >   
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>
            </form>

        </>         

    )
}


function userState(): [any, any] {
    throw new Error("Function not implemented.");
}
// parou no tempo 1:01 aula 2