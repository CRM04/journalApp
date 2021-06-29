import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    // const entries = [1, 2, 3, 4, 5];
    const { notes } = useSelector(state => state.notes);
    // console.log(notes);
    return (
        <div className="journal__entries">

            {
                /* entries.map(value => (
                    <JournalEntry key={value} />
                )) */

                notes.map(note => (
                    <JournalEntry key={note.id} {...note} />
                ))
            }

        </div>
    )
}
