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

    const handleDelete = (id) => {
        // fetching all inforamtion from local storage
        const entries = JSON.parse(localStorage.getItem('information'));

        const filtered = entries.filter(entry => entry.id !== id);

        setListData(filtered);

        localStorage.setItem('information', JSON.stringify(listData));

    }    

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
        
        // delete info form the list
       
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
            <div className='contact-table table'>
                <div className="tr">
                    <div className='th'>Name</div>
                    <div className='th'>Contact</div>
                    <div className='th'>Details</div>
                    <div className='th'>Edit</div>
                    <div className='th'>Delete</div>
                </div>          
                    {
                    listData?.map((data,i)=>
                        <div className="tr" key={i}>
                            <div className='td'>{data.name}</div>
                            <div className='td'>{data.contact}</div>
                            <div className='td'><Link to={`contact/${i}`}><button className='btn btn-details'>Details</button></Link></div>
                            <div className='td'><button className='btn green'>Edit</button></div>
                            <div className='td'><button onClick={()=> handleDelete(`${data.id}`)} className='btn red'>Delete</button></div>                       
                        </div>
                        )
                    }         
                </div>
        </div>
    );
};

export default Home;
