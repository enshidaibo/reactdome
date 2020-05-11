import * as React from 'react';

interface Dprops {
    title: string
}

const DD = ({ title }: Dprops) => {
    return <div>{title}</div>
}

export default DD