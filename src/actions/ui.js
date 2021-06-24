import { types } from "../types/types"

export const setError = (err) => {
    return {
        type: types.uiSetError,
        payload: err
    }
}

export const removeError = () => {
    return {
        type: types.uiRemoveError,
    }
}

export const setLoading = (estatus) => {
    return {
        type: types.setLoading,
        payload: estatus
    }
}