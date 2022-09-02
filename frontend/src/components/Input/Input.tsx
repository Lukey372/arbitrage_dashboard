import React from 'react'
import './Input.module.css'

function Input(props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input {...props} />
    )
}

export default Input