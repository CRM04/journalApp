import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdated:
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.payload
                }
            }

        case types.saveNoteLocal:
            return {
                ...state,
                notes: state.notes.map(n => n.id === action.payload.id ? action.payload.note : n)
            }

        default:
            return state;
    }
}