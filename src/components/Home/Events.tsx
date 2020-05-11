import React, { useState, FC } from 'react'

import { Exhibition } from 'generated/graphql'
import './style.scss'





const Events: FC = () => {
    const [items, setItems] = useState([
        {
            name: 'Name of the Exebition',
            description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            startDate: '21.05.2020',
            exhibitionId: `1`
        },
        {
            name: 'Name of the Exebition',
            description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            startDate: '21.05.2020',
            exhibitionId: `2`
        },
        {
            name: 'Name of the Exebition',
            description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            startDate: '21.05.2020',
            exhibitionId: `3`
        },
        {
            name: 'Name of the Exebition',
            description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
            startDate: '21.05.2020',
            exhibitionId: `4`
        }
    ])

        return (
            <div className="events">
                <h1>Up coming online exhibitions</h1>
                {items.map((item: Exhibition) => ( 
                    <div className="event">
                        <h2>{item.name}</h2>
                        <p className="text">{item.description}</p>
                        <div>
                            <p className="date">Data: {item.startDate}</p>
                            <button color="primary">Join</button>
                        </div>
                    </div>
                ))}
            </div>
        ) 
    }

export default Events;