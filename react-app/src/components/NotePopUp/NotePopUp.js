import { useSelector } from "react-redux"

import "./NotePopUp.css"
import { useState } from "react"

export default function NotePopUp({ verse, chapter, book, x, y, setPopUpOpen, setField, setTab, setSelectedVerse }) {

    const user = useSelector(state => state.session.user)

    const [copied, setCopied] = useState(false)

    const openNoteField = (e) => {
        setTab('notes')
        setField('createNote')
        setSelectedVerse(verse.number)
        setPopUpOpen(0)
    }

    const copy = e => {

        const text = `${book.name} ${chapter.number}:${verse.number}\n${verse.text}\nKJV`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(setCopied, 700, false)
    }


    return (
        <div style={{ left: `${x - 100}px`, top: `${y - 180}px` }} className="pop-up-container">
            <button onClick={() => setPopUpOpen(0)}>Close</button>
            <p>{book.name} {chapter.number}:{verse.number}</p>

            <div className="popup-buttons">

                <button disabled={!user} onClick={openNoteField}>Note</button>
                <button onClick={copy}> {copied ? "Copied ✅" : "Copy"}</button>
                <button disabled>Send</button>
                <button disabled>Bookmark</button>
            </div>

        </div >
    )
}
