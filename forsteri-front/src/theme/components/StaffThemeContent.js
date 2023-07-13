import React from 'react';
import { Link } from 'react-router-dom';


export const StaffThemeContent = (theme) => {

    return(
        <div className='theme-content'>
            <Link to={`${theme.id}`} className='links'> <h1>{theme.theme}<span className='votes'>{theme.votes}票</span></h1> </Link> 
        </div>
    )
}