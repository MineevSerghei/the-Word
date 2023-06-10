import "./BookmarksOptions.css"
import BookmarkDetails from "./BookmarkDetails"
import { useState } from "react"

export default function BookmarksOptions({ setBookmarkOptionsOpen, user }) {

    const [detailsOpen, setDetailsOpen] = useState(0);

    const bookmarkVerse = () => {

    }

    const showDetails = number => {
        setDetailsOpen(number);
    }


    return (
        <div style={{ bottom: `${80}px`, right: '5px' }} className="pop-up-container-bookmarks">
            {user.bookmarks.map(bookmark =>
                <svg
                    onClick={() => bookmarkVerse(bookmark)}
                    onMouseOver={e => showDetails(bookmark.number)}
                    onMouseOut={e => setDetailsOpen(0)}
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

            {detailsOpen > 0 && <BookmarkDetails bookmark={user.bookmarks.find(m => m.number == detailsOpen)} />}

            {user.bookmarks.map(bookmark =>
                <svg
                    onClick={() => bookmarkVerse(bookmark)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="bookmark-icon"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 340 512">
                    <path
                        fill={bookmark.color}
                        d="M 130.203 53.094 L 130.203 469.764 C 130.203 482.462 135.527
                    492.791 142.07 492.791 C 144.512 492.791 146.906 491.37 148.908
                    488.621 L 223.972 386.659 L 299.035 488.621 C 301.037 491.37 303.43
                    492.791 305.873 492.791 C 312.417 492.791 317.739 482.462 317.739 469.764
                    L 317.739 53.094 C 317.739 27.983 307.239 7.61 294.298 7.61 L 153.646 7.61
                    C 140.702 7.61 130.203 27.983 130.203 53.094 Z"/>
                    <path
                        fill='#fff5d5'
                        d="M 142.903 67.226 L 142.903 430.273 C 142.903 441.337 147.542
                    450.337 153.243 450.337 C 155.37 450.337 157.456 449.099 159.2 446.704
                    L 224.604 357.864 L 290.006 446.704 C 291.752 449.099 293.837 450.337
                    295.965 450.337 C 301.667 450.337 306.304 441.337 306.304 430.273 L 306.304
                    67.226 C 306.304 45.346 297.155 27.596 285.879 27.596 L 163.329 27.596 C 152.05
                    27.596 142.903 45.346 142.903 67.226 Z"/>
                </svg>
            )}

        </div >
    )
}
