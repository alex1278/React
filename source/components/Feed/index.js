// Core
import React, { Component } from 'react';

// Components
import { withProfile } from "../HOC/withProfile";

import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import { Spinner } from '../Spinner';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments';

@withProfile
export default class Feed extends Component {

    state = {
        posts: [
            {
                id:      '123',
                comment: 'Hi there!',
                created: 1526825076849,
                likes:   [],
            },
            {
                id:      '456',
                comment: 'hi',
                created: 1526825076855,
                likes:   [],
            }
        ],
        isSpinning: false,
    };

    _setPostFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const post = {
            id:      getUniqueID(),
            comment,
            created: moment().utc().valueOf(),
            likes:   [],
        };

        await delay(200);

        this.setState(({ posts }) => ({
            posts:      [post, ...posts],
            isSpinning: false,
        }));
    };

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        const { posts } = this.state;
        const newPosts = posts.filter((post) => {
            return post.id !== id;
        });

        await delay(200);

        this.setState(() => ({
            posts:      [...newPosts],
            isSpinning: false,
        }));
    };

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostFetchingState(true);

        await delay(100);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:      newPosts,
            isSpinning: false,
        });
    };

    render () {
        const { posts, isSpinning } = this.state;
        const postJSX = posts.map((post) => {
            return (<Post
                key = { post.id }
                { ...post }
                _likePost = { this._likePost }
                _removePost = { this._removePost }
            />);
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postJSX}
            </section>
        );
    }
}
