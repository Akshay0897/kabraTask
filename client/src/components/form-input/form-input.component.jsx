import React from 'react';
import './form-input.styles.scss';

const FormInput = ({handleChange,label,...otherProps}) => { 
    let borderstyle='',margin='',value=otherProps.value ? otherProps.value : '';

    if(otherProps.type === 'file') { borderstyle = 'none'; margin = '-25px'  } 

    return (
    <div className = 'group'>
        <input className='form-input' style={{borderBottom:borderstyle}} onChange={handleChange} {...otherProps}/>
        {(label && !value) ?
             (<label style={{marginTop:margin}} className={`${value.length ? 'shrik' : ''} form-input-label`}>
                 {label}
        </label>) : null
       } 
    </div>
    ); 
};

export default FormInput;