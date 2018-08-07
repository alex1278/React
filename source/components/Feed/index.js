// Core
import React, { Component } from 'react';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'hi', created: 1526825076855 }
        ],
    };

    render () {
        const { posts } = this.state;

        console.log(posts);
        const PostJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                {PostJSX}
            </section>
        );
    }
}
