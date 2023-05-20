// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CREATE_NOTE = "session/CREATE_NOTE";
const EDIT_NOTE = "session/EDIT_NOTE";
const DELETE_NOTE = "session/DELETE_NOTE";
const TOGGLE_COMPLETED = "session/TOGGLE_COMPLETED";
const ENROLL_PLAN = "session/ENROLL_PLAN";
const UNENROLL_PLAN = "session/UNENROLL_PLAN";

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
		console.log("MYY PLAN!--->", plan)
		dispatch(enrollPlanAction(plan));
		return plan;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
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
		default:
			return state;
	}
}
