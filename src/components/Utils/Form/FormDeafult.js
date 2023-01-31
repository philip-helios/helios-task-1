import React, { useEffect, useState } from 'react';
import '../../../Styles/style.scss';
import validateInput from './validateInput';

const FormDefault = ({handleChange,values}) => {
    const [error,setError] = useState(); 
    useEffect(()=> {
        const error = validateInput(values)
        setError(error);
        console.log(error.status) 
     },[values])
    return (
        <div className='form-container'>
                <h2 className='text-center'>Add Record</h2>
                <label>Name</label>
                <input type="text" id="name" value={values?.name} name="name" onChange={handleChange} required/><br />
                {error && <p className='text-error'>{error.name}</p>}
                <label>Phone</label>
                <input type="text" id="contact" value={values?.contact} name="contact" onChange={handleChange} required/><br />
                {error && <p className='text-error'>{error.contact}</p>}
                <input className='submit-button' id="submit-button" type="submit" value="Submit"/>        
        </div>
    );
};

export default FormDefault;