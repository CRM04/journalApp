import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { registerWithEmailAndPassword } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        name: 'CR',
        email: 'crm.00@hotmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name,
        email,
        password,
        password2 } = formValues;

    const handleSubmit = (ev) => {
        ev.preventDefault();


        if (isFormValid()) {
            console.log({
                name,
                email,
                password,
                password2
            });
            dispatch(registerWithEmailAndPassword(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('Name is required')
            dispatch(setError('Name is required'))
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('Email is required')
            dispatch(setError('Invalid email'))
            return false;
        } else if (password !== password2 || password2.length < 5) {
            console.log('Password should be at least 6 characters long and match each other');
            dispatch(setError('Password should be at least 6 characters long and match each other'))
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            {
                msgError &&
                (<div className="auth__alert-error">
                    {msgError}
                </div>)
            }
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
