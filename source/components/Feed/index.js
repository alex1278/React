// Core
import React, { Component } from 'react';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'hi', created: 1526825076855 }
        ],
        isSpinning: true,
    };

    render () {
        const { posts, isSpinning } = this.state;
        const PostJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        setTimeout(
            () =>
                this.setState({
                    isSpinning: false,
                }),
            500,
        );

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer />
                {PostJSX}
            </section>
        );
    }
}
