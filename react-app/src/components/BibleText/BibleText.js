import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooksThunk } from "../../store/bible";
import './BibleText.css'

export default function BibleText() {

    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.bible)

    const [selectedBook, setSelectedBook] = useState('');
    const [selectedChapter, setSelectedChapter] = useState(1);
    const [booksMenuOpen, setBooksMenuOpen] = useState(false);
    const [displayedChapter, setDisplayedChapter] = useState(1);
    const [displayedBook, setDisplayedBook] = useState('Genesis');

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


    if (books.length === 0) return <h1>Loading...</h1>;

    return (
        <div>
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
                        .map(verse => <p>{verse.number === 1 ? <span className="chapter-number-in-text">{displayedChapter}</span> : verse.number} {verse.text}</p>)}</>}<p></p>
            </div>

        </div>
    );
}
