import React, { FC } from 'react'

import './style.scss'
import Search from './Search'
import Events from './Events'

const items = [
        {
            name: 'Name of the Exebition',
            text: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            date: '21.05.2020',
            id: 1
        },
        {
            name: 'Name of the Exebition',
            text: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            date: '21.05.2020',
            id: 2
        },
        {
            name: 'Name of the Exebition',
            text: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            date: '21.05.2020',
            id: 3
        },
        {
            name: 'Name of the Exebition',
            text: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            date: '21.05.2020',
            id: 4
        },
        
    ];

const Home: FC = () => (
    <div>
        <Search />
        <Events items={items}/>
    </div>
)

export default Home;