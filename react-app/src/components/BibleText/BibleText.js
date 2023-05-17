import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooksThunk } from "../../store/bible";
import './BibleText.css'

export default function BibleText() {

    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.bible)

    const [selectedBook, setSelectedBook] = useState('Genesis');
    const [booksMenuOpen, setBooksMenuOpen] = useState(false);

    const books = Object.values(booksObj)

    useEffect(() => {

        const getBooks = async () => {

            await dispatch(getAllBooksThunk())
        }
        if (!books || !books.length) getBooks();

    }, [dispatch]);


    if (books.length === 0) return <h1>Loading...</h1>;

    return (
        <div>
            <div className="book-top">
                <div className="book-menu">
                    <h2
                        onClick={() => setBooksMenuOpen(!booksMenuOpen)}
                        className="selected-book-title">{booksObj[selectedBook].name}</h2>

                    {booksMenuOpen && <div className="select-book">
                        {books.map(book => <p
                            className="book-selection"
                            value={book.name}
                            key={book.id}>{book.name}</p>)}
                    </div>}
                </div>
            </div>

        </div>
    );
}
