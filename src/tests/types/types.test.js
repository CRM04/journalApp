import { types } from '../../types/types';

describe('types test suit', () => {

    test('should match types object', () => {
        expect(types).toStrictEqual({
            login: '[Auth] login',
            logout: '[Auth] logout',

            uiSetError: '[UI] set error',
            uiRemoveError: '[UI] remove error',
            setLoading: '[UI] set loading',

            notesNewNote: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesAddNewNote: '[Notes] Add new note to memory var',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            saveNoteLocal: '[Notes] Update note locally',
            notesFileURL: '[Notes] Updated file url',
            notesDelete: '[Notes] Delete note',
            notesLogOutCleaning: '[Notes] LogOut Cleaning',
        })
    });

});
