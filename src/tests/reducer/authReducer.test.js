import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('authReducer test suit', () => {

    test('should return the login state', () => {
        const state = authReducer({}, {
            type: types.login,
            payload: {
                uid: 'uid',
                displayName: 'Cristian'
            }
        });

        expect(state).toStrictEqual({ uid: 'uid', name: 'Cristian' });
    });


    test('should logout and clean the auth state', () => {
        const loginState = { uid: 'uid', name: 'Cristian' };
        const state = authReducer(loginState, {
            type: types.logout,
        });

        expect(state).toStrictEqual({});
    });


    test('should return the current state when sending a not defined type', () => {
        const loginState = { uid: 'uid', name: 'Cristian' };
        const state = authReducer(loginState, {
            type: 'logIn',
        });

        expect(state).toStrictEqual(state);
    });
});
