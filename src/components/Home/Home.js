import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/responsive.css'
import '../../Styles/style.css'
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    
    const [listData, setListData] = useState([]);

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('information'));
        setListData(data)
    },[])
    
    const [error,setError] = useState([]);
    let regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;

        if(regex.test(contact)){

            const person = {
                id: uuidv4(),
                name,
                contact
            }
            const data = person; 
            let arrayData = JSON.parse(localStorage.getItem('information'));
            arrayData.push(data);
            localStorage.setItem('information', JSON.stringify(arrayData));
            setListData(arrayData);
            
        }
        else {
            let message = "Phone number is not valid";
            setError(message);
        }
        
        
        // const person = {
        //     name,
        //     contact
        // }
        // const data = person;

        
        // arrayData.push(data);
        // localStorage.setItem('information', JSON.stringify(arrayData));

    }
    return (
        <div className='wrapper-main'>
            <h2>Sample Contact Form</h2>
            <form onSubmit={handleSubmit} className='contact-form'> 
                <div className='form-wrapper'>
                    <div className='form-control'>
                        <label htmlFor ="name">Name</label>
                        <input type ="text" name="name"/>
                    </div>
                    <div className='form-control'> 
                        <label htmlFor ="contact">Contact</label>
                        <input type = "text" name="contact"/>
                        <p className='text-error'>{error}</p>
                    </div>
                    <div>
                    <input className="form-button"
                        type="submit"
                        value="Submit"/>
                    </div>
                </div>
            </form>
            <table className='contact-table'>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Details</th>
                </tr>          
                    {
                    listData.map((data,i)=>
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.contact}</td>
                            <td><Link to={`contact/${i}`}>Details</Link></td>
                        </tr>
                        )
                    }         
                
                </table>
        </div>
    );
};

export default Home;
