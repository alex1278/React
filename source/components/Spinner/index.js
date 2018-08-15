// Core
import React from 'react';
import { createPortal } from 'react-dom';

//Instruments
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

const Spinner = () => {
    const { isSpinning } = this.props;

    return createPortal(
        isSpinning ? <div className = { Styles.spinner } /> : null,
        portal,
    );
};

export default Spinner;
