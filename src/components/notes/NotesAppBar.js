import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveNote, uploadImg } from '../../actions/notes';

export const NotesAppBar = () => {
    const { date, id, title, body, imgURL } = useSelector(state => state.notes.active);
    const dispatch = useDispatch();
    const dateFormat = moment(date);

    const handleSave = () => {
        console.log({ date, id, title, body, imgURL });
        let tempNote = { date, id, title, body }
        if (imgURL !== undefined) {
            tempNote.imgURL = imgURL;
        }

        dispatch(saveNote(tempNote));
    }

    const handleSelectIMG = () => {
        document.getElementById('file').click();
    }

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        dispatch(uploadImg(file));
    }

    return (
        <div className="notes__appbar">
            <span>{dateFormat.format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>

            <div>
                <input type="file" id="file" style={{ display: 'none' }} onChange={ handleFileChange }/>
                <button className="btn" onClick={ handleSelectIMG }>
                    Picture
                </button>

                <button className="btn" onClick={handleSave} >
                    Save
                </button>
            </div>
        </div>
    )
}
