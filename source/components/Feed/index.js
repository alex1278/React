// Core
import React, { Component } from 'react';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';
import moment from "moment";

// Instruments
import Styles from './styles.m.css';
import { getUniqueID } from "../../instruments";

export default class Feed extends Component {
    constructor () {
        super();
        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'hi', created: 1526825076855 }
        ],
        isPostsFetching: false,
    };

    _createPost (comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    }

    render () {
        const { posts, isPostsFetching } = this.state;
        const PostJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {PostJSX}
            </section>
        );
    }
}
