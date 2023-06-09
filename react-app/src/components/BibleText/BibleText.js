import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooksThunk, getAllBooksAction } from "../../store/bible";
import NotesBox from "../NotesBox";
import NotePopUp from "../NotePopUp";
import PlansBox from "../PlansBox";
import './BibleText.css'
import useShowComponent from "../../context/ShowComponent";
import { addBible, db } from "../../db/db";

export default function BibleText() {

    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.bible);
    const user = useSelector(state => state.session.user);

    const { ref: menuRef, isShown: menuIsShown, setIsShown: setMenuIsShown, buttonRef: menuButtonRef } = useShowComponent(false);
    const { ref: popupRef, isShown: popupIsShown, setIsShown: setPopupIsShown } = useShowComponent(0);
    const [selectedBook, setSelectedBook] = useState('');
    const [displayedChapter, setDisplayedChapter] = useState(1);
    const [selectedVerse, setSelectedVerse] = useState(0);
    const [isLoadingIntoCache, setIsLoadingIntoCache] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [displayedBook, setDisplayedBook] = useState('Genesis');
    const [field, setField] = useState('allNotes')
    const [tab, setTab] = useState('')

    const books = Object.values(booksObj)

    useEffect(() => {

        const getBooks = async () => {

            setIsLoadingIntoCache(true);
            const thunkBooks = await dispatch(getAllBooksThunk());
            await addBible('kjv', thunkBooks);
            setIsLoadingIntoCache(false);
        }

        if (!books || !books.length) {

            const checkCache = async () => {

                const indexDbBooks = await db.bibles.get({ version: 'kjv' });

                if (indexDbBooks) {
                    dispatch(getAllBooksAction(indexDbBooks.bible))

                } else {
                    getBooks();
                }
            }

            checkCache()
        }


    }, [dispatch]);

    useEffect(() => {
        if (menuIsShown) {
            const bookTag = document.getElementById(displayedBook);
            if (bookTag) bookTag.scrollIntoView({ block: 'center' });
        }
    }, [menuIsShown])

    const setDisplayed = (chapter, book) => {
        setDisplayedChapter(chapter)
        setDisplayedBook(book)
        setMenuIsShown(false)
        setSelectedBook('')
    }

    const openMenu = () => {
        setMenuIsShown(!menuIsShown)
    }


    const goToBookmark = async bookmark => {

        const set = () => {
            setDisplayedChapter(bookmark.verse.chapter.number);
            setDisplayedBook(bookmark.verse.chapter.book.name);
        }

        await set();

        const versePTag = await document.getElementById(`${bookmark.verse.id}`);
        if (versePTag) {
            versePTag.scrollIntoView({ block: "center" });
            versePTag.style.color = bookmark.color;
            versePTag.style.textDecoration = `underline`;

            setTimeout(() => {
                versePTag.style = null;
            }, 1000)
        }

    }

    const openPopUp = (e, verseNumber) => {

        setX(e.pageX);
        setY(e.pageY);
        setPopupIsShown(verseNumber);
    }

    const selectBook = (book) => {

        if (selectedBook !== book.name)
            setSelectedBook(book.name)
        else
            setSelectedBook('')
    }

    const setNext = e => {

        if (booksObj[displayedBook].ordinalNumber === 66 && displayedChapter === 22)
            return;


        setField('allNotes');
        setPopupIsShown(0);
        if (booksObj[displayedBook].chaptersObj[displayedChapter + 1]) {
            setDisplayedChapter(displayedChapter + 1)
        } else {
            const bookName = books.find(book => book.ordinalNumber === booksObj[displayedBook].ordinalNumber + 1).name
            setDisplayedBook(bookName)
            setDisplayedChapter(1)
        }
        document.getElementById('Bible-text').scrollTop = 0;

    }

    const setPrevious = e => {

        if (booksObj[displayedBook].ordinalNumber === 1 && displayedChapter === 1)
            return;

        setField('allNotes');
        setPopupIsShown(0);
        if (booksObj[displayedBook].chaptersObj[displayedChapter - 1]) {
            setDisplayedChapter(displayedChapter - 1)
        } else {
            const previousBook = books.find(book => book.ordinalNumber === booksObj[displayedBook].ordinalNumber - 1)
            setDisplayedBook(previousBook.name)
            setDisplayedChapter(Object.values(previousBook.chaptersObj).length)
        }
        document.getElementById('Bible-text').scrollTop = 0;
    }

    if (books.length === 0) {

        return (
            <div className="spinner-container">
                <h1 id="spinner"><i className="fa-solid fa-spinner fa-spin-pulse"></i></h1>
                <p>Loading</p>

                <progress value={null} />
                {isLoadingIntoCache && <><h2>Loading King James Bible.</h2> <h3>You'll only have to wait once.</h3></>}
            </div>);
    }


    return (
        <div className="read-page">
            <div className="left-section">
                <div className="book-top">
                    <div></div>

                    <div className="book-menu">
                        <h2
                            onClick={openMenu}
                            ref={menuButtonRef}
                            className="selected-book-title">{displayedBook} {displayedChapter}</h2>



                        {menuIsShown && <div ref={menuRef} className="select-book">
                            {books.map(book => {
                                return <div key={book.id}>
                                    <p
                                        id={book.name}
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
                    <div>
                        {user && user.bookmarks.map(bookmark =>
                            <svg
                                onClick={() => goToBookmark(bookmark)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="bookmark-icon"
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 290 512">
                                <path
                                    fill={bookmark.color}
                                    d="M 88.601 56.189 L 88.601 472.859 C 88.601 485.557 93.925 495.886 100.468 495.886
                                    C 102.91 495.886 105.304 494.465 107.306 491.716 L 182.37 389.754 L 257.433 491.716
                                    C 259.435 494.465 261.828 495.886 264.271 495.886 C 270.815 495.886 276.137 485.557
                                    276.137 472.859 L 276.137 56.189 C 276.137 31.078 265.637 10.705 252.696 10.705 L
                                    112.044 10.705 C 99.1 10.705 88.601 31.078 88.601 56.189 Z" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="Bible-text-area" id="Bible-text">
                    {displayedBook && displayedChapter && <>
                        {Object.values(booksObj[displayedBook]
                            .chaptersObj[displayedChapter].versesObj)
                            .map(verse => {

                                let className = 'verse';

                                if (popupIsShown === verse.number) className += ' underlined'

                                return <p
                                    id={verse.id}
                                    className={className}
                                    onClick={(e) => openPopUp(e, verse.number)}
                                    key={verse.id}>
                                    <span
                                        style={user && verse.id in user.highlights ?
                                            { backgroundColor: user.highlights[verse.id].color } : null}>
                                        {verse.number === 1 ?
                                            <span className="chapter-number-in-text">{displayedChapter}</span> :
                                            verse.number} {verse.text}</span></p>

                            })}

                        <i className="fa-solid fa-arrow-left back-arrow"
                            disabled={booksObj[displayedBook].ordinalNumber === 1 && displayedChapter === 1 ? 'disabled' : ''}
                            onClick={setPrevious}></i>
                        <i className="fa-solid fa-arrow-left back-arrow fa-flip-horizontal"
                            disabled={booksObj[displayedBook].ordinalNumber === 66 && displayedChapter === 22 ? 'disabled' : ''}
                            onClick={setNext}></i>
                    </>}
                    {popupIsShown !== 0 && <NotePopUp
                        popupRef={popupRef}
                        field={field}
                        setField={setField}
                        verse={booksObj[displayedBook].chaptersObj[displayedChapter].versesObj[popupIsShown]}
                        chapter={booksObj[displayedBook].chaptersObj[displayedChapter]}
                        book={booksObj[displayedBook]}
                        setTab={setTab}
                        setSelectedVerse={setSelectedVerse}
                        x={x} y={y} setPopupIsShown={setPopupIsShown} />}
                </div>
            </div>

            <div className="right-section">
                <div className="right-top">
                    <div onClick={() => { setTab('notes') }} className={`right-nav-bttn${tab === 'notes' ? ' tab-open' : ''}`}>Notes</div>
                    <div onClick={() => { setTab('plans') }} className={`right-nav-bttn${tab === 'plans' ? ' tab-open' : ''}`}>Plans</div>
                    <div onClick={() => { setTab('') }} className="right-nav-bttn"><i className="fa-solid fa-xmark"></i></div>
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
