import React from 'react';

const ContactList = (props) => {
    return(
        <li style={{listStyle: 'none'}}>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.phone}</p>
            <p>{props.address} , {props.suite}</p>
            <p>{props.city} {props.state}, {props.zip}</p>
            <hr/>
        </li>
    )
}

export default ContactList;