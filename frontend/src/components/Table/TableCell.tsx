import React from 'react';
import '../../styles.css';

function TableCell(props: any) {

    const { children, style } = props

    return (
        <div className={"tableCell"} {...{ style }} >
            {children}
        </div>
    )
}

export default TableCell