import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateNoteData } from '../../actions/notes';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const { id, title, body, imgURL } = useSelector(state => state.notes.active);
    const dispatch = useDispatch();

    const handleInputChange = (ev) => {
        const data = {
            id,
            [ev.target.name]: ev.target.value
        };
        dispatch(updateNoteData(data));
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    name="title"
                    value={title}
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {imgURL && <div className="notes__image">
                    <img
                        src={imgURL}
                        alt="imagen"
                    />
                </div>}


            </div>

        </div>
    )
}
