import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";

// Objeto criando para facilitar a manuntenção dos cards de feedback do código.
// usando o export para ter acesso em outros componentes
export const feedbackTypes = {
    BUG: {
        tittle: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        },
    },
    IDEA: {
        tittle: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Image de uma lampada'
        },
    },
    OTHER: {
        tittle: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma balão de pensamento'
        }
    },
};

// criando a tipagem que aguarda somente a ket de feedbackTypes.
// usando o export para ter acesso em outros componentes
export type FeedbackType = keyof typeof feedbackTypes


export function WigdetForm(){

                                                    //<setando a tipagem>
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            
            { feedbackSent ? (
                <FeedbackSucessStep 
                    onFeedbackRestartRequest = {handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (                       
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />            
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}                    
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="">Rocketseat</a>
            </footer>
        </div>
    )
}