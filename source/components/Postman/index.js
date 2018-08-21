// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import TweenLite from 'gsap/TweenLite';

// Components
import { withProfile } from '../HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

const _animatePostmanEnter = (postman) => {
    TweenLite.fromTo(
        postman,
        1,
        { right: -260 },
        { right: 30 });
};

const _animatePostmanEntered = (postman) => {
    TweenLite.fromTo(
        postman,
        1,
        { right: 30 },
        { right: -260 });
};

const Postman = (props) => {
    return (
        <Transition
            appear
            in
            timeout = { 4000 }
            onEnter = { _animatePostmanEnter }
            onEntered = { _animatePostmanEntered }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
