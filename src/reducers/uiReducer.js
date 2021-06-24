import { types } from '../types/types';

const initState = { loading: false, msgError: null };

export const uiReducer = (state = initState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        case types.setLoading:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state;
    }
}
