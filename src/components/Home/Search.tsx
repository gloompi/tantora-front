import React, { FC } from 'react'
import './style.scss'

import { Button } from '@material-ui/core';


const Search: FC = () => (
    <div className="searchField">
        <label htmlFor="input">Keep in touch with all online exebitions</label>
        <input type="text" placeholder="What are you looking for..."></input>
        <Button color="primary" >Search</Button>
    </div>
)

export default Search;