// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CREATE_NOTE = "session/CREATE_NOTE";
const EDIT_NOTE = "session/EDIT_NOTE";
const DELETE_NOTE = "session/DELETE_NOTE";
const TOGGLE_COMPLETED = "session/TOGGLE_COMPLETED";
const ENROLL_PLAN = "session/ENROLL_PLAN";
const UNENROLL_PLAN = "session/UNENROLL_PLAN";
const CREATE_PLAN = "session/CREATE_PLAN";
const EDIT_PLAN = "session/EDIT_PLAN";
const DELETE_PLAN = "session/DELETE_PLAN";
const CREATE_BOOKMARK = 'session/CREATE_BOOKMARK';
const REMOVE_BOOKMARK = 'session/REMOVE_BOOKMARK';
const CREATE_HIGHLIGHT = 'session/CREATE_HIGHLIGHT';
const REMOVE_HIGHLIGHT = 'session/REMOVE_HIGHLIGHT';


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

const toggleCompletedAction = (task, planId) => ({
	type: TOGGLE_COMPLETED,
	task,
	planId
});

const enrollPlanAction = (plan) => ({
	type: ENROLL_PLAN,
	plan
});

const unenrollPlanAction = (planId) => ({
	type: UNENROLL_PLAN,
	planId
});

const createPlanAction = (plan) => ({
	type: CREATE_PLAN,
	plan
});

const editPlanAction = (plan) => ({
	type: EDIT_PLAN,
	plan
});

const deletePlanAction = (planId) => ({
	type: DELETE_PLAN,
	planId
});


const createBookmarkAction = (bookmark) => ({
	type: CREATE_BOOKMARK,
	bookmark
});

const createHighlightAction = (highlight) => ({
	type: CREATE_HIGHLIGHT,
	highlight
});

const removeBookmarkAction = (bookmarkId) => ({
	type: REMOVE_BOOKMARK,
	bookmarkId
});


const removeHighlightAction = (highlightId) => ({
	type: REMOVE_HIGHLIGHT,
	highlightId
});

export const createHighlightThunk = highlight => async dispatch => {

	const res = await fetch("/api/highlights", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...highlight
		})
	});

	if (res.ok) {
		const highlight = await res.json();
		dispatch(createHighlightAction(highlight));
		return highlight;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const removeHighlightThunk = highlightId => async dispatch => {

	const res = await fetch(`/api/highlights/${highlightId}`, {
		method: "DELETE"
	});

	if (res.ok) {
		const message = await res.json();
		dispatch(removeHighlightAction(highlightId));
		return message;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}


export const removeBookmarkThunk = bookmarkId => async dispatch => {

	const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
		method: "DELETE"
	});

	if (res.ok) {
		const message = await res.json();
		dispatch(removeBookmarkAction(bookmarkId));
		return message;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const createBookmarkThunk = bookmark => async dispatch => {

	const res = await fetch("/api/bookmarks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...bookmark
		})
	});

	if (res.ok) {
		const bookmark = await res.json();
		dispatch(createBookmarkAction(bookmark));
		return bookmark;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const deletePlanThunk = (planId) => async dispatch => {
	const res = await fetch(`/api/plans/${planId}`, { method: "DELETE" });

	if (res.ok) {
		dispatch(deletePlanAction(planId));
		return planId;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const editPlanThunk = (plan, planId) => async dispatch => {
	const res = await fetch(`/api/plans/${planId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...plan
		})
	});

	if (res.ok) {
		const returnedPlan = await res.json();
		dispatch(editPlanAction(returnedPlan));
		return returnedPlan;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const editPlanImageThunk = (formData, planId) => async dispatch => {
	const res = await fetch(`/api/plans/${planId}/image`, {
		method: "PUT",
		body: formData
	});

	if (res.ok) {
		const returnedPlan = await res.json();
		dispatch(editPlanAction(returnedPlan));
		return returnedPlan;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}


export const createPlanThunk = formData => async dispatch => {
	const res = await fetch("/api/plans", {
		method: "POST",
		body: formData
	});

	if (res.ok) {
		const returnedPlan = await res.json();
		dispatch(createPlanAction(returnedPlan));
		return returnedPlan;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const unenrollPlanThunk = (planId) => async dispatch => {
	const res = await fetch(`/api/plans/${planId}/unenroll`, { method: "DELETE" });

	if (res.ok) {
		const data = await res.json();
		dispatch(unenrollPlanAction(planId));
		return data;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const enrollPlanThunk = (planId) => async dispatch => {
	const res = await fetch(`/api/plans/${planId}/enroll`, { method: "POST" });

	if (res.ok) {
		const plan = await res.json();
		dispatch(enrollPlanAction(plan));
		return { 'message': 'Success!' };
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const toggleCompletedThunk = (taskId, planId) => async dispatch => {
	const res = await fetch(`/api/tasks/${taskId}`, { method: "PUT" });

	if (res.ok) {
		const task = await res.json();
		dispatch(toggleCompletedAction(task, planId));
		return task;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

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

export const signUp = (name, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
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
			{
				const newState = { user: action.payload };
				const highlights = {};

				for (let hl of action.payload.highlights) {
					highlights[hl.verseId] = hl
				}
				newState.user.highlights = highlights
				return newState;
			}
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

		case TOGGLE_COMPLETED:
			{
				const planIndex = state.user.enrolledPlans.findIndex(plan => {
					return plan.id === action.planId
				})

				const taskIndex = state.user.enrolledPlans[planIndex].tasks.findIndex(task => task.id === action.task.id)

				const newState = { ...state, user: { ...state.user, enrolledPlans: [...state.user.enrolledPlans] } }
				newState.user.enrolledPlans[planIndex] = { ...state.user.enrolledPlans[planIndex] }
				newState.user.enrolledPlans[planIndex].tasks = [...state.user.enrolledPlans[planIndex].tasks]
				newState.user.enrolledPlans[planIndex].tasks[taskIndex] = { ...action.task }

				return newState;
			}
		case ENROLL_PLAN:
			{
				return { ...state, user: { ...state.user, enrolledPlans: [...state.user.enrolledPlans, action.plan] } }
			}

		case UNENROLL_PLAN:
			{
				const newEnrolledPlans = state.user.enrolledPlans.filter(plan => plan.id !== action.planId)
				return { ...state, user: { ...state.user, enrolledPlans: newEnrolledPlans } }
			}

		case CREATE_PLAN:
			{
				return { ...state, user: { ...state.user, authoredPlans: [...state.user.authoredPlans, action.plan] } }
			}

		case EDIT_PLAN:
			{
				const index = state.user.authoredPlans.findIndex(plan => plan.id === action.plan.id);

				const newState = { ...state, user: { ...state.user, authoredPlans: [...state.user.authoredPlans] } }

				newState.user.authoredPlans[index] = action.plan;

				return newState;
			}

		case DELETE_PLAN:
			{

				const newPlans = state.user.authoredPlans.filter(plan => plan.id !== parseInt(action.planId));
				const newState = { ...state, user: { ...state.user, authoredPlans: newPlans } }

				return newState;
			}

		case CREATE_BOOKMARK:
			{
				const newState = { ...state, user: { ...state.user, bookmarks: [...state.user.bookmarks] } };

				const index = state.user.bookmarks.findIndex(bm => bm.number === action.bookmark.number);

				if (index !== -1)
					newState.user.bookmarks[index] = action.bookmark;
				else
					newState.user.bookmarks.push(action.bookmark);

				return newState;
			}
		case REMOVE_BOOKMARK:
			{
				const newState = { ...state, user: { ...state.user, bookmarks: [...state.user.bookmarks] } };
				const index = state.user.bookmarks.findIndex(bm => bm.id === action.bookmarkId);

				newState.user.bookmarks.splice(index, 1);

				return newState;
			}
		case CREATE_HIGHLIGHT:
			{
				return {
					...state, user: {
						...state.user, highlights: {
							...state.user.highlights, [action.highlight.verseId]: action.highlight
						}
					}
				}
			}
		default:
			return state;
	}
}
