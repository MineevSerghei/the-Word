import { Link } from 'react-router-dom'
import './LandingPage.css'
import { useEffect } from 'react';
import { getAllBooksThunk } from "../../store/bible";
import { useDispatch, useSelector } from 'react-redux';

export default function LandingPage() {

    const books = useSelector(state => state.bible)

    const dispatch = useDispatch();

    useEffect(() => {

        const getBooks = async () => {

            await dispatch(getAllBooksThunk())
        }
        if (!books || !Object.values(books).length) getBooks();

    }, [dispatch]);


    return (
        <div className='landing-page'>
            <Link to="/read">Read Now</Link>
        </div>
    )
}
