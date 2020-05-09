import React from 'react';
import {TextareaWrap} from './textarea.stc'

export const Textarea = (props) => {
    const {type, value, placeholder, name, id, onChange, ...restProps} = props;    
    return(
        <TextareaWrap
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={onChange}
            {...restProps}
        ></TextareaWrap>
    )
}
