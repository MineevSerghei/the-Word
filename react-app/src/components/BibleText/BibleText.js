import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooksThunk } from "../../store/bible";
import NotesBox from "../NotesBox";
import NotePopUp from "../NotePopUp";
import './BibleText.css'

export default function BibleText() {

    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.bible)

    const [selectedBook, setSelectedBook] = useState('');
    const [booksMenuOpen, setBooksMenuOpen] = useState(false);
    const [displayedChapter, setDisplayedChapter] = useState(1);
    const [popUpOpen, setPopUpOpen] = useState(0);
    const [selectedVerse, setSelectedVerse] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [displayedBook, setDisplayedBook] = useState('Genesis');
    const [field, setField] = useState('allNotes')

    const books = Object.values(booksObj)

    useEffect(() => {

        const getBooks = async () => {

            await dispatch(getAllBooksThunk())
        }
        if (!books || !books.length) getBooks();

    }, [dispatch]);

    const setDisplayed = (chapter, book) => {
        setDisplayedChapter(chapter)
        setDisplayedBook(book)
        setBooksMenuOpen(false)
    }

    const openPopUp = (e, verseNumber) => {

        // console.log("EEE X --- >", e.clientX)
        // console.log("EEE Y --- >", e.clientY)
        console.log(e)
        setX(e.pageX);
        setY(e.pageY);
        setPopUpOpen(verseNumber);
    }

    if (books.length === 0) return <h1>Loading...</h1>;

    return (
        <div className="read-page">
            <div className="left-section">
                <div className="book-top">
                    <div className="book-menu">
                        <h2
                            onClick={() => setBooksMenuOpen(!booksMenuOpen)}
                            className="selected-book-title">{displayedBook}</h2>

                        {booksMenuOpen && <div className="select-book">
                            {books.map(book => {
                                return <>
                                    <p
                                        className="book-selection"
                                        value={book.name}
                                        onClick={() => setSelectedBook(book.name)}
                                        key={book.id}>{book.name}</p>

                                    {selectedBook === book.name &&
                                        <div className="chapter-box">
                                            {Object.values(book.chaptersObj).map(chapter => <span
                                                onClick={() => setDisplayed(chapter.number, book.name)}
                                                key={chapter.id}
                                                className="chapter-number">{chapter.number}</span>)}
                                        </div>
                                    }</>
                            })}
                        </div>}
                    </div>
                </div>

                <div className="Bible-text-area">
                    {displayedBook && displayedChapter && <>
                        {Object.values(booksObj[displayedBook]
                            .chaptersObj[displayedChapter].versesObj)
                            .map(verse => {
                                return <p
                                    className={popUpOpen === verse.number ? 'underlined' : ''}
                                    onClick={(e) => openPopUp(e, verse.number)}
                                    key={verse.id}>
                                    {verse.number === 1 ?
                                        <span className="chapter-number-in-text">{displayedChapter}</span> :
                                        verse.number} {verse.text}</p>

                            })}</>}
                    {popUpOpen !== 0 && <NotePopUp
                        field={field}
                        setField={setField}
                        verse={booksObj[displayedBook].chaptersObj[displayedChapter].versesObj[popUpOpen]}
                        chapter={booksObj[displayedBook].chaptersObj[displayedChapter]}
                        book={booksObj[displayedBook]}
                        setSelectedVerse={setSelectedVerse}
                        x={x} y={y} setPopUpOpen={setPopUpOpen} />}
                </div>
            </div>

            <div className="right-section">
                <NotesBox
                    field={field}
                    setField={setField}
                    verseNum={selectedVerse}
                    book={booksObj[displayedBook]}
                    chapter={booksObj[displayedBook].chaptersObj[displayedChapter]} />
            </div>

        </div>
    );
}
