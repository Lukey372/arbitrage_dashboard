import React from 'react'
import '../../styles.css';

function TableRow(props: any) {

    const { children, style } = props

    return (
        <div className={"tableRow"} {...{ style }} >
            {children}
        </div>
    )
}


export default TableRow