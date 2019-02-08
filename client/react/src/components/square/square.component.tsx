import React from 'react';

import './square.component.css';

type props = {
    value: number,
    onClick: any
};
export function Square(props: Readonly<props>) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
