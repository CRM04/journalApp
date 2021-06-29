import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { uploadIMG } from "../helpers/uploadImg";

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

export const setActiveNote = (id, note) => {
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

export const updateNoteData = (note) => {
    return {
        type: types.notesUpdated,
        payload: {
            ...note
        }
    }
}

export const saveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const noteToSave = { ...note };
        delete noteToSave.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToSave);
        dispatch(saveNoteStore(note.id, note));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const saveNoteStore = (id, note) => {
    return {
        type: types.saveNoteLocal,
        payload: {
            id,
            note
        }
    }
}

export const uploadImg = (file) => {
    return async (dispatch, getState) => {
        Swal.fire({
            title: 'Uploading',
            text: 'Saving...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const { active: activeNote } = getState().notes;
        console.log(activeNote);
        const url = await uploadIMG(file);
        console.log(url)
        activeNote.imgURL = url;
        dispatch(saveNote(activeNote));
        Swal.close();
    }
}