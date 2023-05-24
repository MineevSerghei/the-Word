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
        <div style={{ left: `${x - 100}px`, top: `${y - 200}px` }} className="pop-up-container">
            <i className="fa-solid fa-xmark note-close" onClick={() => setPopUpOpen(0)}></i>
            <p className="verse-ref-note">{book.name} {chapter.number}:{verse.number}</p>

            <div className="popup-buttons">

                <button className="popup-button" disabled>Send</button>
                <button className="popup-button" disabled>Bookmark</button>
                <button className="popup-button" disabled={!user} onClick={openNoteField}>Note</button>
                <button className="popup-button" onClick={copy}> {copied ? "Copied ✅" : "Copy"}</button>
            </div>

        </div >
    )
}
