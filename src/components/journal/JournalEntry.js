import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';

export const JournalEntry = ({ id, body, date, title, imgURL }) => {
    const dateFormat = moment(date);
    const dispatch = useDispatch();

    const imgStyle = (url) => ({
        backgroundSize: 'cover',
        backgroundImage: `url(${url})`
    })

    const handleActiveNote = () => {
        dispatch(setActiveNote(id, { title, body, date, imgURL }));
    }

    return (
        <div className="journal__entry pointer" onClick={handleActiveNote}>

            {imgURL && (<div className="journal__entry-picture" style={imgStyle(imgURL)}></div>)}

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{dateFormat.format('dddd')}</span>
                <h4>{dateFormat.format('Do')}</h4>
            </div>

        </div>
    )
}
