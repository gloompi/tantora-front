import React from 'react'

import './style.scss'

interface Info {
    items: any;
}


class Events extends React.Component<Info, Array<Info>> {
    public render(){

        return (
            <div className="events">
                <h1>Up coming online exhibitions</h1>
                {this.props.items.map((item: any) => ( 
                    <div className="event" key={item.id}>
                        <h2>{item.name}</h2>
                        <p className="text">{item.text}</p>
                        <div>
                            <p className="date">Data: {item.date}</p>
                            <button color="primary">Join</button>
                        </div>
                    </div>
                ))}
            </div>
        ) 
    }
}

export default Events;