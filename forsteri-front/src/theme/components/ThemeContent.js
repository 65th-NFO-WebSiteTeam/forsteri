import React from 'react';
import { Link } from 'react-router-dom';


export const ThemeContent = (theme) => {

    return(
        <div className='theme-content'>
            <Link to={`${theme.id}`} className='links'> <h1>{theme.theme}</h1> </Link> 
        </div>
    )
}