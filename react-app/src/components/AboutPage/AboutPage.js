// import { a } from 'react-router-dom'
import './AboutPage.css'
import { a } from 'react-router-dom/cjs/react-router-dom.min'
// import { useEffect } from 'react';
// import { getAllBooksThunk } from "../../store/bible";
// import { useDispatch, useSelector } from 'react-redux';

export default function AboutPage() {

    // const books = useSelector(state => state.bible)

    // const dispatch = useDispatch();

    // useEffect(() => {

    //     const getBooks = async () => {

    //         // await dispatch(getAllBooksThunk())
    //     }
    //     if (!books || !Object.values(books).length) getBooks();

    // }, [dispatch]);


    return (
        <div className='about-page'>
            <div className='about-image-div-container'>
                <div className='about-image-div'>
                    Photo by
                    <a className='inspired-link' target='_blank' href="https://unsplash.com/es/@wisconsinpictures?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">wisconsinpictures</a>

                    {/* <h1 className='read-bible-online'>Read the Bible Online</h1> */}
                    {/* <a className='nav-left-as read-now-bttn' target='_blank' href="/read">Read Now</a> */}
                </div>

            </div>
            <div className='the-word-description'>
                <h2>The Word</h2>
                <p>The Word is a Bible app. It allows you to read and annotate your Bible, as well as create and follow reading plans to consistently stay in God's Word.</p>
                <p>The application was inspired by:</p>
                <ul className='inspired-list'>
                    <li><a className='inspired-link' target='_blank' href='https://www.esv.org/'>esv.org</a></li>
                    <li><a className='inspired-link' target='_blank' href='https://www.biblegateway.com/'>biblegateway.com</a></li>
                    <li>and, obviously, the Bible</li>
                </ul>

                <p>Special thanks to: </p>
                <a className='inspired-link' target='_blank' href='https://github.com/scrollmapper/bible_databases'>scrollmapper <i className="fa-brands fa-github"></i></a>
                <p>for the Bible text in usable text format.</p>

                <div className='the-dev'>
                    <h4>Developed by:</h4>
                    <a className='inspired-link' target='_blank' href='https://mineevserghei.github.io/'>Serghei Mineev</a>
                    <a className='inspired-link inspired-icon' target='_blank' href='https://www.linkedin.com/in/serghei-mineev/'><i className="fa-brands fa-linkedin"></i></a>
                    <a className='inspired-link inspired-icon' target='_blank' href='https://github.com/MineevSerghei'><i className="fa-brands fa-github"></i></a>
                </div>
            </div>

        </div>
    )
}
