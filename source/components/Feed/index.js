// Core
import React, { Component } from 'react';

// Components
import { withProfile } from "../HOC/withProfile";

import StatusBar from '../StatusBar';
import Catcher from '../../components/Catcher';
import Composer from '../Composer';
import Post from '../Post';
import { Spinner } from '../Spinner';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN } from '../../config/api';

@withProfile
export default class Feed extends Component {

    state = {
        posts:      [],
        isSpinning: false,
    };

    componentDidMount () {
        this._fetchPosts();
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isSpinning: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:      [post, ...posts],
            isSpinning: false,
        }));
    };

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Authorization': TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts:      posts.filter((post) => post.id !== id),
            isSpinning: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                'Authorization': TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post
            ),
            isSpinning: false,
        }));
    };

    render () {
        const { posts, isSpinning } = this.state;
        const postJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            );
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
