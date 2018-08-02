// Core
import React, { Component } from 'react';

// Components
import { ProfileContext } from '../../components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class StatusBar extends Component {

    render () {
        return (
            <ProfileContext.Consumer>
                {(context) => (
                    <section className = { Styles.statusBar }>
                        <button>
                            <img src = { context.avatar } />
                            <span>{ context.currentUserFirstName }</span>
                            &nbsp;
                            <span>{ context.currentUserLastName }</span>
                        </button>
                    </section>
                )}
            </ProfileContext.Consumer>
        );
    }
}
