import React from 'react';
import {InputWrap} from './input.stc'

export const Input = (props) => {
    const {type, value, placeholder, name, id, onChange, ...restProps} = props;    
    return(
        <InputWrap
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={onChange}
            {...restProps}
        />
    )
}
