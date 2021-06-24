import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loginWithEmailPass, loginWithGoogle } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: 'crm.00@hotmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (ev) => {
        ev.preventDefault();
        console.log({ email, password });
        if (isFormValid()) {
            dispatch(loginWithEmailPass(email, password));
        }
    }

    const handleGoogleLogin = () => {
        dispatch(loginWithGoogle())
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('Invalid email'));
            return false;
        } else if (password.length < 5) {
            dispatch(setError('Invalid password length'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            {
                msgError &&
                (<div className="auth__alert-error">
                    {msgError}
                </div>)
            }
            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
