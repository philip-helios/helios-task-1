import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/responsive.css'
import '../../Styles/style.css'
import { v4 as uuidv4 } from 'uuid';
import { getLocal } from '../fetchLocal.js/FetchLocal';



const Home = () => {
    
    const [data, setData] = useState([]);
    const [refreskKey,setRefreshKey] = useState(0);
    const [error,setError] = useState([]);

    // fetch data from local storage
    useEffect(()=> {
        const parsedArr = JSON.parse(localStorage.getItem("information"));    
        setData(parsedArr);
      
    },[refreskKey])
    

    
    
    // submit new entry after validating phone number
    let regexPhone = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    let regexName = /^[A-Z][-a-zA-Z]+$/;
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;


        // execute rest of the function upon matching phone number
        if(regexPhone.test(contact) && regexName.test(name)){

            const person = {
                id: uuidv4(),
                name,
                contact
            }

            // create a new array and push data as object in new array

            if(data == null){

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

        // show erro message if phone number doesn't match with regex 
        else {
            let message = "Phone number or User Name is not valid";
            setError(message);
        }

        setRefreshKey(oldKey=> oldKey + 1);

    }
    
    return (
        <div className='wrapper-main'>
            <form onSubmit={handleSubmit} className='contact-form'> 
                <div className='form-wrapper'>
                    <h2>Sample Contact Form</h2>
                    <div className='form-control'>
                        <label htmlFor ="name">Name</label>
                        <input type ="text" name="name" required/>
                    </div>
                    <div className='form-control'> 
                        <label htmlFor ="contact">Contact</label>
                        <input type = "text" name="contact" required/>
                        <p className='text-error'>{error}</p>
                    </div>
                    <div>
                    <input className="form-button"
                        type="submit"
                        value="Submit"/>
                    </div>
                </div>
            </form>
            <div className='contact-table table'>
                <h2>Record Book</h2>
                <div className="tr">
                    <div className='th'>Name</div>
                    <div className='th'>Contact</div>
                    <div className='th'>Details</div>
                </div> 
                    {

                        data?.map((data,i)=>
                        <div className="tr" key={i}>
                            <div className='td'>{data.name}</div>
                            <div className='td'>{data.contact}</div>
                            <div className='td'><Link to={`contact/${data.id}`}><button className='btn btn-details'>Details</button></Link></div>                                         
                        </div>
                        )
                    }         
            </div>
        </div>
    );
};

export default Home;
