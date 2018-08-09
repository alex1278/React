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
import { getUniqueID, delay } from "../../instruments";

export default class Feed extends Component {
    constructor () {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
    }

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
        isPostsFetching: false,
    };

    _setPostFetchingState (state) {
        this.setState({
            isPostsFetching: state,
        });
    }

    async _createPost (comment) {
        this._setPostFetchingState(true);

        const post = {
            id:      getUniqueID(),
            comment,
            created: moment().utc().valueOf(),
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:           [post, ...posts],
            isPostsFetching: false,
        }));
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostFetchingState(true);

        await delay(1200);

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
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    render () {
        const { posts, isPostsFetching } = this.state;
        const PostJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } _likePost = { this._likePost } />;
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
