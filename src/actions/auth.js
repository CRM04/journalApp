import { types } from "../types/types"
import { firebase, googleAuth } from "../firebase/firebaseConfig";
import { setLoading } from "./ui";

export const registerWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
                console.log(user);
            }).catch(err => {
                console.warn(err);
            });
    }
}

export const loginWithGoogle = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuth)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    }
}

export const loginWithEmailPass = (email, pass) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(({ user }) => {
                dispatch(setLoading(false));
                dispatch(login(user.uid, user.displayName));
            }).catch(err => {
                dispatch(setLoading(false));
                console.warn(err);
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid, displayName
        }
    }
}

export const logOutFireBase = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logOut())
    }
}

export const logOut = () => {
    return {
        type: types.logout
    }
}