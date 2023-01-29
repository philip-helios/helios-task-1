import React, { useState } from 'react';
import '../../../Styles/style.scss';
import useForm from './useForm';

const FormDefault = ({defaultName,defaultContact}) => {  
    const {handleChange,error,isValid} = useForm();

    return (
        <div className='form-container'>
                <h2 className='text-center'>Add Record</h2>
                <label>Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} defaultValue={defaultName}/><br />
                {error && <p className='text-error'>{error.name}</p>}
                <label>Phone</label>
                <input type="text" id="contact" name="contact" onChange={handleChange} defaultValue={defaultContact}/><br />
                {error && <p className='text-error'>{error.contact}</p>}
                <input className='submit-button' disabled={!isValid} id="submit-button" type="submit" value="Submit"/>        
        </div>
    );
};

export default FormDefault;