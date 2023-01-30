import React from 'react';
import '../../../Styles/style.scss';

const FormDefault = ({defaultName,defaultContact,handleChange,error}) => {
    return (
        <div className='form-container'>
                <h2 className='text-center'>Add Record</h2>
                <label>Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} defaultValue={defaultName? defaultName: ""} required/><br />
                {error && <p className='text-error'>{error.name}</p>}
                <label>Phone</label>
                <input type="text" id="contact" name="contact" onChange={handleChange} defaultValue={defaultContact? defaultContact: ""} required/><br />
                {error && <p className='text-error'>{error.contact}</p>}
                <input className='submit-button' id="submit-button" type="submit" value="Submit"/>        
        </div>
    );
};

export default FormDefault;