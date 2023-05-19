
const GET_ALL_BOOKS = "bible/GET_ALL_BOOKS"

const getAllBooksAction = (books) => ({
    type: GET_ALL_BOOKS,
    books
});

export const getAllBooksThunk = () => async (dispatch) => {

    const res = await fetch("/api/bible/books");

    if (res.ok) {
        const books = await res.json();
        dispatch(getAllBooksAction(books))
    } else {
        return await res.json();
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOOKS:
            const booksObject = {};

            for (let book of action.books) {
                booksObject[book.name] = book;

                for (let chapter of book.chapters) {
                    if (!booksObject[book.name].chaptersObj)
                        booksObject[book.name].chaptersObj = {};
                    booksObject[book.name].chaptersObj[chapter.number] = chapter;

                    for (let verse of chapter.verses) {
                        if (!booksObject[book.name].chaptersObj[chapter.number].versesObj)
                            booksObject[book.name].chaptersObj[chapter.number].versesObj = {}
                        booksObject[book.name].chaptersObj[chapter.number].versesObj[verse.number] = verse;
                    }

                    delete booksObject[book.name].chaptersObj[chapter.number].verses;
                }

                delete booksObject[book.name].chapters;
            }

            return booksObject;
        default:
            return state;
    }
}
