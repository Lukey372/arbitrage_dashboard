import React from 'react'
import '../../styles.css';

function TableHead(props: any) {

    const { children, style } = props

    return (
        <div className={"tableHead"} {...{ style }} >
            {children}
        </div>
    )
}

export default TableHead

//style={{ width: "90%", height: "30px", backgroundColor: "grey", borderRadius: "5rem" }}