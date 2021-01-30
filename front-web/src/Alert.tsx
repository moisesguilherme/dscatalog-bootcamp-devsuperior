import React from 'react';

type Props = {
    text?: string;
}

const Alert = ({text}: Props )=> (
    <div className="alert alert-primary">
        Hellow {text}!
    </div>
)

export default Alert;