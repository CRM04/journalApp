import { removeError, setError, setLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('UI-Actions test suit', () => {

    test('should do all the sync ui actions', () => {
        const errorAction = setError('Error message');
        const removeAction = removeError();
        const loadingAction = setLoading();

        expect(errorAction).toEqual({
            type: types.uiSetError,
            payload: 'Error message'
        });

        expect(removeAction).toEqual({
            type: types.uiRemoveError,
        });

        expect(loadingAction).toEqual({
            type: types.setLoading,
        });
    });

});
