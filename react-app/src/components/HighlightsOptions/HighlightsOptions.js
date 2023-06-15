import "./HighlightsOptions.css"
import { useState } from "react"
import { createHighlightThunk, removeHighlightThunk } from "../../store/session"
import { useDispatch } from "react-redux"

const colors = ['#3a98b9', '#ffd183', '#a52a2a', '#36AC0B', '#CB58DA']

export default function HighlightsOptions({ setPopupIsShown, highlightsRef, setHighlightsShown, user, verse }) {

    const dispatch = useDispatch();

    const highlightVerse = async color => {

        const info = {
            'color': color,
            'verseId': verse.id
        }

        await dispatch(createHighlightThunk(info));
        setHighlightsShown(false);
        setPopupIsShown(0);
    }

    const removeHighlight = async () => {
        await dispatch(removeHighlightThunk(verse.id));
    }

    if (!user) return null;

    return (
        <div ref={highlightsRef} style={{ bottom: `${40}px`, right: '5px' }}
            className={`pop-up-container-highlights`}>
            {colors.map((color) => {
                return <i
                    onClick={() => highlightVerse(color)}
                    className="fa-solid fa-highlighter highlighter-icon" style={{ color: color }}></i>
            })}
            <svg
                onClick={() => removeHighlight()}
                xmlns="http://www.w3.org/2000/svg"
                className="highlighter-icon-svg"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 576 512">
                <path
                    fill={'gray'}
                    d="M 315,315 473.4,100 444.1,70.6 229,229 Z m -187,5 v 0 -71.7 c 0,-15.3 7.2,-29.6
                    19.5,-38.6 L 420.6,8.4 C 428,2.9 437,0 446.2,0 c 11.4,0 22.4,4.5 30.5,12.6 l 54.8,54.8
                    c 8.1,8.1 12.6,19 12.6,30.5 0,9.2 -2.9,18.2 -8.4,25.6 l -201.3,273 C 325.4,408.8 311,416
                    295.8,416 H 224 l -25.4,25.4 c -12.5,12.5 -32.8,12.5 -45.3,0 l -50.7,-50.7 c -12.5,-12.5
                    -12.5,-32.8 0,-45.3 z M 7,466.3 l 63,-63 70.6,70.6 -31,31 c -4.5,4.5 -10.6,7 -17,7 H 24 c
                    -13.3,0 -24,-10.7 -24,-24 v -4.7 c 0,-6.4 2.5,-12.5 7,-17 z" />
                <path
                    fill={'red'}
                    d="M 99.796608,52.258847 131.39367,23.864404 518.74589,438.12126 495.49521,459.01528 108.143,44.758424 Z" />
            </svg>
        </div >
    )
}
