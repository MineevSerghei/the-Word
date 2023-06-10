
export default function BookmarkDetails({ bookmark }) {



    return (
        <div style={{ bottom: `${50}px`, right: '5px' }} className="pop-up-container-bookmarks">
            <p>{bookmark.verse.chapter.book.name} {bookmark.verse.chapter.number}:{bookmark.verse.number}</p>
        </div >
    )
}
