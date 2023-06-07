import "./BookmarksOptions.css"

export default function BookmarksOptions({ setBookmarkOptionsOpen, user }) {

    return (
        <div style={{ bottom: `${100}px` }} className="pop-up-container">
            <i className="fa-solid fa-xmark note-close" onClick={() => setBookmarkOptionsOpen(false)}></i>

            {/* <p className="verse-ref-note">{book.name} {chapter.number}:{verse.number}</p>

            <div className="popup-buttons">

                <button className="popup-button" disabled>Send</button>
                <button className="popup-button" disabled>Bookmark</button>
                <button className="popup-button" disabled={!user} onClick={openNoteField}>Note</button>
                <button className="popup-button" onClick={copy}> {copied ? "Copied ✅" : "Copy"}</button>
            </div> */}

        </div >
    )
}
