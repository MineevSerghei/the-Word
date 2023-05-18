import { useSelector } from "react-redux"

import "./NotePopUp.css"

export default function NotePopUp({ verse, chapter, book, x, y, setPopUpOpen }) {

    const user = useSelector(state => state.session.user)

    

    if (!user) return <h2>Please sign in to use notes</h2>

    return (
        <div style={{ left: `${x - 100}px`, top: `${y - 180}px` }} className="pop-up-container">
            <button onClick={() => setPopUpOpen(0)}>Close</button>
            <p>{book.name} {chapter.number}:{verse.number}</p>
            <div className="popup-buttons">
                <button>Note</button>
                <button disabled>Copy</button>
                <button disabled>Send</button>
                <button disabled>Bookmark</button>
            </div>
        </div>
    )
}
