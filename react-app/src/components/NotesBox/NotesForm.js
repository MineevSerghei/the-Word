import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createNoteThunk } from "../../store/session";
import './NotesBox.css'

export default function NotesForm({ verseNum, chapter, book, setField, setSelectedVerse }) {

    const verse = useSelector(state => state.bible[book.name].chaptersObj[chapter.number].versesObj[verseNum || 1])

    const [note, setNote] = useState('');
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])

    useEffect(() => {

        return () => {
            setSelectedVerse(0)
        }

    }, [])

    const saveNote = async e => {

        const validationErrors = {}

        if (note.length <= 0) {
            validationErrors.note = 'The note cannot be empty'
        }
        if (note.length > 700) {
            validationErrors.note = 'The note cannot be longer than 700 characters'
        }
        if (validationErrors.note) setErrors(validationErrors)
        else {
            await dispatch(createNoteThunk(verse.id, note))
            setField('allNotes')
        }
    }

    if (!verse) return <h1>NO VERSE</h1>

    return (
        <>
            <h2>Create Note</h2>

            <div>
                <button onClick={() => setField('allNotes')} >Close</button>
                <button onClick={saveNote}>Save Note</button>
                <p>{book.name} {chapter.number}:{verse.number}</p>
                {errors.note && <p>{errors.note}</p>}
                <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                ></textarea>
            </div>
        </>
    )
}
