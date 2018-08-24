// Core
import React from 'react';

// Components
import { withProfile } from '../HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

const Postman = (props) => {
    return (
        <section className = { Styles.postman }>
            <img src = { props.avatar } />
            <span>Welcome online, { props.currentUserFirstName }</span>
        </section>
    );
};

export default withProfile(Postman);
