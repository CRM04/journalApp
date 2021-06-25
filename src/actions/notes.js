import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";

export const newEntry = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const docRef = await db.collection(`${uid}/journal/notes/`).add(newNote);
        dispatch(setActiveNote(docRef, newNote));
    }
}

const setActiveNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}


export const getNotes = (uid) => {
    return async (dispatch) => {
        const notesSnap = await db.collection(`${uid}/journal/notes`).get();
        let notes = [];
        notesSnap.forEach(doc => {
            notes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        dispatch(setNotes(notes));
    }
}

const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}