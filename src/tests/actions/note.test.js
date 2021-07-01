import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getNotes, newEntry, saveNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    }
}

let store = mockStore(initState);

describe('Notes actions test suit', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should create a new note', async (done) => {
        await store.dispatch(newEntry());
        const actions = store.getActions();

        const note = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        }
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: note
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNewNote,
            payload: note
        });

        const noteUID = actions[0].payload.id;
        await db.doc('/TESTING/journal/notes/' + noteUID).delete();
        done();
    });

    test('should get the notes', async () => {
        await store.dispatch(getNotes('TESTING'));
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });
    });

    test('should upadate the note correctly', async () => {
        const note = {
            id: 'HBaKG3Ja7NIDMcq8aEzT',
            title: 'titulo actualizado',
            body: 'body actualizado',
        }
        await store.dispatch(saveNote(note));

        const actions = store.getActions();
        expect(actions[0].type).toBe(types.saveNoteLocal);

        const docRef = await db.doc('/TESTING/journal/notes/'+note.id).get();
        expect(docRef.data().title).toBe(note.title);
    });
    

});
