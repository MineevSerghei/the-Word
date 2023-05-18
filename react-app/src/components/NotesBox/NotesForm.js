import { useState } from "react"

export default function NotesForm({ verse, chapter, book, setField }) {

    const [note, setNote] = useState('');

    const saveNote = e => {
        
    }

    return (
        <>
            <h2>Create Note</h2>

            <div>
                <button onClick={() => setField('allNotes')} >Close</button>
                <button onClick={saveNote}>Save Note</button>
                <p>{book.name} {chapter.number}:{verse && verse.number || 1}</p>
                <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                ></textarea>
            </div>
        </>
    )
}
