import React, { useState } from 'react';
import '../../../Styles/style.scss';

const FormDefault = ({defaultName,defaultContact}) => { 
    const [error, setError] = useState({});
    let regexName = /^[A-Za-z]+[A-Z a-z]*$/;
    let regexPhone = /^(\+88|88)?(01[3-9]\d{8})$/;

    const checkInput = () => {
        let isValid= false;
        let errorMsg={};
        const name= document.getElementById("name").value;
        const phone=document.getElementById("contact").value;
        if(!regexName.test(name)){
            errorMsg["name"]="Name is not valid"
        }
        if(!regexPhone.test(phone)){
            errorMsg["phone"]="Phone is not valid"
        }
        else if(regexName.test(name) && regexPhone.test(phone)){
            isValid = true;
        }
        setError(errorMsg);
        return isValid;
        
    }
    
    return (
        <div className='form-container'>
                <h2 className='text-center'>Add Record</h2>
                <label>Name</label>
                <input type="text" id="name" name="name"  onChange={checkInput} defaultValue={defaultName}/><br />
                <p className='text-error'>{error.name}</p>
                <label>Phone</label>
                <input type="text" id="contact" name="contact" onChange={checkInput} defaultValue={defaultContact}/><br />
                <p className='text-error'>{error.phone}</p>
                <input className='submit-button' id="submit-button" type="submit" value="Submit"/>        
        </div>
    );
};

export default FormDefault;