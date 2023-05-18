// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CREATE_NOTE = "session/CREATE_NOTE";
const EDIT_NOTE = "session/EDIT_NOTE";
const DELETE_NOTE = "session/DELETE_NOTE";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const createNoteAction = (note) => ({
	type: CREATE_NOTE,
	note
});

const editNoteAction = (note) => ({
	type: EDIT_NOTE,
	note
});

const deleteNoteAction = (noteId) => ({
	type: DELETE_NOTE,
	noteId
});

export const deleteNoteThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });

	if (res.ok) {
		dispatch(deleteNoteAction(id))
		return ["Successfully Deleted"]
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}


};


export const editNoteThunk = (id, text) => async (dispatch) => {
	const res = await fetch(`/api/notes/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			noteText: text
		})
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(editNoteAction(data))
		return data
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}


};


export const createNoteThunk = (verseId, note) => async (dispatch) => {
	const res = await fetch("/api/notes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			noteText: note,
			verseId
		})
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(createNoteAction(data))
		return data
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}


};

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case CREATE_NOTE:
			return { ...state, user: { ...state.user, notes: [...state.user.notes, action.note] } }
		case EDIT_NOTE:
			{
				const newState = { ...state, user: { ...state.user, notes: [...state.user.notes] } }
				newState.user.notes = state.user.notes.map(note => {
					if (note.id === action.note.id) return { ...action.note }
					else return { ...note }
				});
				return newState
			}
		case DELETE_NOTE:
			{
				const newState = { ...state, user: { ...state.user, notes: [...state.user.notes] } }
				newState.user.notes = state.user.notes.filter(note => note.id !== action.noteId);
				return newState
			}
		default:
			return state;
	}
}
