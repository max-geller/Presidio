import React from 'react';
import {FormWrap} from './form.stc'
import {Input} from './input'
import {Textarea} from './textarea'

const Form = (props) => {
    const {method, action, children, onSubmit, ...restProps} = props;
    return(
        <FormWrap onSubmit={onSubmit} {...restProps}>
            {children}
        </FormWrap>
    )
}

export {Input, Textarea}

export default Form;