import "./HighlightsOptions.css"
import { useState } from "react"
import { createBookmarkThunk, removeBookmarkThunk } from "../../store/session"
import { useDispatch } from "react-redux"

const colors = ['#3a98b9', '#ffd183', '#a52a2a', '#36AC0B', '#CB58DA']

export default function HighlightsOptions({ highlightsRef, setHighlightsShown, user, verse }) {

    const dispatch = useDispatch();

    const highlightVerse = async color => {

        const info = {
            'color': color,
            'verseId': verse.id
        }

        // await dispatch(createBookmarkThunk(info));
        setHighlightsShown(false);
    }

    if (!user) return null;

    return (
        <>
            <div ref={highlightsRef} style={{ bottom: `${40}px`, right: '5px' }}
                className={`pop-up-container-highlights`}>
                {colors.map((color) => {
                    return <i
                        onClick={() => highlightVerse()}
                        className="fa-solid fa-highlighter highlighter-icon" style={{ color: color }}></i>
                })}
            </div >
        </>
    )
}
