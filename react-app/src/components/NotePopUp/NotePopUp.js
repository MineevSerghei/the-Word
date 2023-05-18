import { useSelector } from "react-redux"

import "./NotePopUp.css"
import { useState } from "react"

export default function NotePopUp({ verse, chapter, book, x, y, setPopUpOpen, setField, filed, setSelectedVerse }) {

    const user = useSelector(state => state.session.user)

    const [copied, setCopied] = useState(false)

    const openNoteField = (e) => {
        setField('createNote')
        setSelectedVerse(verse.id)
        setPopUpOpen(0)
    }

    const copy = e => {

        const text = `${book.name} ${chapter.number}:${verse.number}\n${verse.text}\nKJV`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(setCopied, 700, false)
    }

    if (!user) return <h2>Please sign in to use notes</h2>

    return (
        <div style={{ left: `${x - 100}px`, top: `${y - 180}px` }} className="pop-up-container">
            <button onClick={() => setPopUpOpen(0)}>Close</button>
            <p>{book.name} {chapter.number}:{verse.number}</p>
            <div className="popup-buttons">
                <button onClick={openNoteField}>Note</button>
                <button onClick={copy}> {copied ? "Copied ✅" : "Copy"}</button>
                <button disabled>Send</button>
                <button disabled>Bookmark</button>
            </div>
        </div >
    )
}
