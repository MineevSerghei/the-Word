import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooksThunk } from "../../store/bible";


export default function BibleText() {

    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.bible)

    const books = Object.values(booksObj)

    useEffect(() => {

        const getBooks = async () => {
            await dispatch(getAllBooksThunk())
        }

        getBooks();

    }, [dispatch]);


    if (books.length === 0) return <h1>Loading...</h1>;

    return (
        <div>
            <h1>BibleText</h1>
            {books.map(book => <p key={book.id}>{book.name}</p>)}
        </div>
    );
}
