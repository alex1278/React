// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import { ProfileContext } from '../../components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };
    render () {
        const { comment, created } = this.props;

        console.log(comment);

        return (
            <ProfileContext.Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{`${context.currentUserFirstName} ${
                            context.currentUserLastName
                        }`}</a>
                        <time>
                            {moment.unix(created).format('MMMM D h:mm:ss')}
                        </time>
                        <p>{comment}</p>
                    </section>
                )}
            </ProfileContext.Consumer>
        );
    }
}
