
const GET_ALL_PLANS = "plans/GET_ALL_PLANS"

const getAllPlansAction = (plans) => ({
    type: GET_ALL_PLANS,
    plans
});

export const getAllPlansThunk = () => async (dispatch) => {

    const res = await fetch("/api/plans");

    if (res.ok) {
        const plans = await res.json();
        dispatch(getAllPlansAction(plans))
    } else {
        return await res.json();
    }
}

const initialState = { allPublicPlans: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PLANS:
            {
                const flatPlans = {}
                for (let plan of action.plans) {
                    flatPlans[plan.id] = plan
                }

                return { ...state, allPublicPlans: flatPlans }
            }
        default:
            return state;
    }
}
