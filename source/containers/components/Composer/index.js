// Core
import React, { Component } from 'react';

// Instruments
import avatar from '../../../theme/assets/lisa.png';

export default class Composer extends Component {
    render () {
        return (
            <section>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What's on?` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
