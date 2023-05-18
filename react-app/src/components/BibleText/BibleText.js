import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooksThunk } from "../../store/bible";
import NotesBox from "../NotesBox";
import NotePopUp from "../NotePopUp";
import PlansBox from "../PlansBox";
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
    const [tab, setTab] = useState('')

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
        setSelectedBook('')
    }

    const openPopUp = (e, verseNumber) => {

        setX(e.pageX);
        setY(e.pageY);
        setPopUpOpen(verseNumber);
    }

    const selectBook = (book) => {

        if (selectedBook !== book.name)
            setSelectedBook(book.name)
        else
            setSelectedBook('')
    }

    const setNext = e => {
        setField('allNotes');
        setPopUpOpen(0);
        if (booksObj[displayedBook].chaptersObj[displayedChapter + 1]) {
            setDisplayedChapter(displayedChapter + 1)
        } else {
            const bookName = books.find(book => book.ordinalNumber === booksObj[displayedBook].ordinalNumber + 1).name
            setDisplayedBook(bookName)
            setDisplayedChapter(1)
        }


        // setDisplayedBook(book)
    }

    const setPrevious = e => {
        setField('allNotes');
        setPopUpOpen(0);
        if (booksObj[displayedBook].chaptersObj[displayedChapter - 1]) {
            setDisplayedChapter(displayedChapter - 1)
        } else {
            const previousBook = books.find(book => book.ordinalNumber === booksObj[displayedBook].ordinalNumber - 1)
            setDisplayedBook(previousBook.name)
            setDisplayedChapter(Object.values(previousBook.chaptersObj).length)
        }

    }

    if (books.length === 0) return (
        <div className="spinner-container">
            <h1 id="spinner"><i className="fa-solid fa-spinner fa-spin-pulse"></i></h1>
            <p>Loading</p>
        </div>);
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
                                return <div key={book.id}>
                                    <p
                                        className="book-selection"
                                        value={book.name}
                                        onClick={() => selectBook(book)}
                                    >{book.name}</p>

                                    {selectedBook === book.name &&
                                        <div className="chapter-box">
                                            {Object.values(book.chaptersObj).map(chapter => <span
                                                onClick={() => setDisplayed(chapter.number, book.name)}
                                                key={chapter.id}
                                                className="chapter-number">{chapter.number}</span>)}
                                        </div>
                                    }</div>
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

                            })}

                        <button
                            disabled={booksObj[displayedBook].ordinalNumber === 1 && displayedChapter === 1}
                            onClick={setPrevious}>Prev</button>
                        <button
                            disabled={booksObj[displayedBook].ordinalNumber === 66 && displayedChapter === 22}
                            onClick={setNext}>Next</button>
                    </>}
                    {popUpOpen !== 0 && <NotePopUp
                        field={field}
                        setField={setField}
                        verse={booksObj[displayedBook].chaptersObj[displayedChapter].versesObj[popUpOpen]}
                        chapter={booksObj[displayedBook].chaptersObj[displayedChapter]}
                        book={booksObj[displayedBook]}
                        setTab={setTab}
                        setSelectedVerse={setSelectedVerse}
                        x={x} y={y} setPopUpOpen={setPopUpOpen} />}
                </div>
            </div>

            <div className="right-section">
                <div className="right-top">
                    <div onClick={() => { setTab('notes') }} className="right-nav-bttn">Notes</div>
                    <div onClick={() => { setTab('plans') }} className="right-nav-bttn">Plans</div>
                    <div onClick={() => { setTab('') }} className="right-nav-bttn">Close</div>
                </div>


                {tab === 'notes' && <NotesBox
                    field={field}
                    setField={setField}
                    verseNum={selectedVerse}
                    book={booksObj[displayedBook]}
                    setSelectedVerse={setSelectedVerse}
                    chapter={booksObj[displayedBook].chaptersObj[displayedChapter]} />}


                {tab === 'plans' && <PlansBox />}

            </div>

        </div>
    );
}
