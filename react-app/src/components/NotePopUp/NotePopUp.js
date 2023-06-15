import { useSelector } from "react-redux"

import "./NotePopUp.css"
import { useState } from "react"
import BookmarksOptions from "../BookmarksOptions/BookmarksOptions"
import useShowComponent from "../../context/ShowComponent"
import HighlightsOptions from "../HighlightsOptions/HighlightsOptions"

export default function NotePopUp({ popupRef, verse, chapter, book, x, y, setPopupIsShown, setField, setTab, setSelectedVerse }) {

    const user = useSelector(state => state.session.user)

    const [copied, setCopied] = useState(false);
    const [bookmarkOptionsOpen, setBookmarkOptionsOpen] = useState(false);
    const { ref: highlightsRef, isShown: highlightsShown, setIsShown: setHighlightsShown, buttonRef } = useShowComponent(false);


    const openNoteField = (e) => {
        setTab('notes')
        setField('createNote')
        setSelectedVerse(verse.number)
        setPopupIsShown(0)
    }

    const copy = e => {

        const text = `${book.name} ${chapter.number}:${verse.number}\n${verse.text}\nKJV`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(setCopied, 700, false)
    }

    const openHighlighters = e => {
        setHighlightsShown(!highlightsShown);
    }



    return (
        <div ref={popupRef} style={{ left: `${x - 100}px`, top: `${y - 200}px` }} className="pop-up-container">
            <i className="fa-solid fa-xmark note-close" onClick={() => setPopupIsShown(0)}></i>
            <p className="verse-ref-note">{book.name} {chapter.number}:{verse.number}</p>

            <div className="popup-buttons">

                <button className="popup-button" onClick={copy}> {copied ? "Copied ✅" : "Copy"}</button>
                <button className={bookmarkOptionsOpen ? 'popup-button filled' : 'popup-button'} disabled={!user} onClick={() => setBookmarkOptionsOpen(!bookmarkOptionsOpen)}>Bookmark</button>
                <button className="popup-button" disabled={!user} onClick={openNoteField}>Note</button>
                <button ref={buttonRef} className={highlightsShown ? 'popup-button filled' : 'popup-button'} disabled={!user} onClick={openHighlighters}>Highlight</button>
            </div>

            {bookmarkOptionsOpen && <BookmarksOptions
                setBookmarkOptionsOpen={setBookmarkOptionsOpen}
                user={user}
                verse={verse}
            />}

            {highlightsShown && <HighlightsOptions
                setPopupIsShown={setPopupIsShown}
                setHighlightsShown={setHighlightsShown}
                user={user}
                verse={verse}
                highlightsRef={highlightsRef}
            />}

        </div >
    )
}
