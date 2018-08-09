// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { Consumer } from '../../components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    state = {
        comment: '',
    };

    render () {
        const { comment } = this.state;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar } />
                        <form>
                            <textarea
                                placeholder = { `What's on your mind, ${context.currentUserFirstName}?` }
                                value = { comment }
                            />
                            <input type = 'submit' value = 'Post' />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
