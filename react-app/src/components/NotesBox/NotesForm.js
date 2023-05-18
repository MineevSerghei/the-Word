import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createNoteThunk } from "../../store/session";


export default function NotesForm({ verseNum, chapter, book, setField }) {

    const verse = useSelector(state => state.bible[book.name].chaptersObj[chapter.number].versesObj[verseNum || 1])

    const [note, setNote] = useState('');
    const dispatch = useDispatch();

    const saveNote = async e => {

        if (note.length <= 0) {
            console.log('error')
            return
        }
        if (note.length > 700) {
            console.log('error')
            return
        }

        const new_note = await dispatch(createNoteThunk(verse.id, note))
        setField('allNotes')

    }

    return (
        <>
            <h2>Create Note</h2>

            <div>
                <button onClick={() => setField('allNotes')} >Close</button>
                <button onClick={saveNote}>Save Note</button>
                <p>{book.name} {chapter.number}:{verse.number}</p>
                <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                ></textarea>
            </div>
        </>
    )
}
