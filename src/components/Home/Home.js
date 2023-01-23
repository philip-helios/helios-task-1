import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/style.scss'
import { v4 as uuidv4 } from 'uuid';


const Home = () => {
    
    const [data, setData] = useState([]);
    const [refreskKey,setRefreshKey] = useState(0);
    const [nameError,setNameError] = useState([]);
    const [phoneError,setPhoneError] = useState([]);

    // fetch data from local storage
    useEffect(()=> {
        const parsedArr = JSON.parse(localStorage.getItem("information"));    
        setData(parsedArr);    
    },[refreskKey])
    
    // submit new entry after validating phone number
    let regexPhone = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    let regexName = /^[A-Z][a-z ]{3,19}$/;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        // execute rest of the function upon matching phone number
        if(!regexName.test(name)) {
            let message = "Name is not valid";
            setNameError(message);      
        }
        if(!regexPhone.test(contact)) {
            let message = "Phone number is not valid"
            setPhoneError(message);
        }
        else  {
            const person = {
                id: uuidv4(),
                name,
                contact
            }
            // create a new array and push data as object in new array
            if(!data){
                let newData = [];
                newData.push(person)
                localStorage.setItem('information', JSON.stringify(newData));
            }
            // push data to existing array
            else {
                const existData = JSON.parse(localStorage.getItem("information"));
                existData.push(person);
                localStorage.setItem('information', JSON.stringify(existData));
            }           
        }

        setRefreshKey(oldKey=> oldKey + 1);

        // clear the value of input field and error messages when user submit correct info
        form.reset();
        setNameError("");
        setPhoneError("");
    }
    
    return (
        <div className='wrapper-main'>
            <form onSubmit={handleSubmit} className='contact-form'> 
                <div className='form-wrapper'>
                    <h2>Sample Contact Form</h2>
                    <div className='form-control'>
                        <label htmlFor ="name">Name</label>
                        <input type ="text" name="name" required/>
                        <p className='text-error'>{nameError}</p>
                    </div>
                    <div className='form-control'> 
                        <label htmlFor ="contact">Contact</label>
                        <input type = "text" name="contact" required/>
                        <p className='text-error'>{phoneError}</p>
                    </div>
                    <div>
                    <input className="form-button"
                        type="submit"
                        value="Submit"/>
                    </div>
                </div>
            </form>
            <div class="table" id="results">
                <div class='theader'>
                    <div class='table_header'>Name</div>
                    <div class='table_header'>Contact</div>
                    <div class='table_header'>Details</div>
                </div>
                {   
                    data?.map((dt,i)=>
                    <div class='table_row' key = {dt.id}>
                        <div class='table_small'>
                        <div class='table_cell th-sm-bg'>Name</div>
                        <div class='table_cell'>{dt.name}</div>
                        </div>
                        <div class='table_small'>
                        <div class='table_cell th-sm-bg'>Contact</div>
                        <div class='table_cell'>{dt.contact}</div>
                        </div>
                        <div class='table_small'>
                        <div class='table_cell th-sm-bg'>Details</div>
                        <div class='table_cell'><Link to={`contact/${dt.id}`}><button className='btn btn-details'>Details</button></Link></div>
                        </div>           
                    </div>
                    )
                }         
            </div>
        </div>
    );
};

export default Home;
