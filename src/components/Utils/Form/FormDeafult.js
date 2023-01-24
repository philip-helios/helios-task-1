import React, { useState } from 'react';
import '../../../Styles/style.scss';

const FormDefault = ({name,contact,handleSubmit,nameError, phoneError}) => {
    
    return (
        <div className='form-container'>
                <h2 className='text-center'>Add Record</h2>
                <label>Name</label>
                <input type="text" name="name" defaultValue={name}/><br />
                <p className='text-error'>{nameError}</p>
                <label>Phone</label>
                <input type="text" name="contact" defaultValue={contact}/><br />
                <p className='text-error'>{phoneError}</p>
                <input className='submit-button' type="submit" value="Submit"/>        
        </div>
    );
};

export default FormDefault;