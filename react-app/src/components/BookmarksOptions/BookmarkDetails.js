
export default function BookmarkDetails({ deleteModeOn, verse, chapter, book, bookmark }) {


    if (deleteModeOn) return (

        bookmark ? <div style={{ bottom: `${50}px`, right: '5px' }} className="pop-up-container-bookmarks-details">
            <p className="red bookmark-help">Remove Bookmark</p>
            <s className="red"><p className="black">{bookmark.verse.chapter.book.name} {bookmark.verse.chapter.number}:{bookmark.verse.number}</p></s>
        </div >
            : <div style={{ bottom: `${50}px`, right: '5px' }} className="pop-up-container-bookmarks-details">
                <p className="bookmark-help">No Bookmark</p>
            </div >
    )

    if (!bookmark) return (
        <div style={{ bottom: `${50}px`, right: '5px' }} className="pop-up-container-bookmarks-details">
            <p className="bookmark-help">New Bookmark</p>
            <i className="fa-solid fa-arrow-down"></i>
            <p>{book.name} {chapter.number}:{verse.number}</p>
        </div >
    )
    return (
        <div style={{ bottom: `${50}px`, right: '5px' }} className="pop-up-container-bookmarks-details">
            <p className="bookmark-help">Change Bookmark</p>
            <s className="red"><p className="black">{bookmark.verse.chapter.book.name} {bookmark.verse.chapter.number}:{bookmark.verse.number}</p></s>
            <i className="fa-solid fa-arrow-down"></i>
            <p>{book.name} {chapter.number}:{verse.number}</p>
        </div >
    )
}
