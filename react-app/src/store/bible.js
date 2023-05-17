
const GET_ALL_BOOKS = "bible/GET_ALL_BOOKS"

const getAllBooksAction = (books) => ({
    type: GET_ALL_BOOKS,
    books
});

export const getAllBooksThunk = () => async (dispatch) => {
    console.log("before fetch ....... ")
    const res = await fetch("/api/bible/books");
    console.log("after fetch ....... ")
    if (res.ok) {
        const books = await res.json();
        dispatch(getAllBooksAction(books))
    } else {
        return await res.json();
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOOKS:

            return action.books;
        default:
            return state;
    }
}
