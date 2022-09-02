import React from 'react';
import '../../styles.css';

function TableBody(props: any) {

    const { children, style } = props

    return (
        <div className={"tableBody"} {...{ style }} >
            {children}
        </div>
    )
}




export default TableBody

