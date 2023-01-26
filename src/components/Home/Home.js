import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/style.scss'
import { v4 as uuidv4 } from 'uuid';
import FormDefault from '../Utils/Form/FormDeafult';


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
    let regexName = /^[A-Z]+[A-Z a-z]*$/;
    let regexPhone = /^(?:\+88|88)?(01[3-9]\d{8})|(01[3-9]\d{8})$/;
    
    const handleSubmit = (e) => {

        setNameError("");
        setPhoneError("");
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        
        // execute rest of the function upon matching phone number and name validation 
        const testName = regexName.test(name);
        const testPhone = regexPhone.test(contact);
        
        if(testName === false ){
            setNameError("Name is not valid")
        }
        if(testPhone === false) {
            setPhoneError("Phone number is not valid")
        }

        if(testName && testPhone === true){
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

        setRefreshKey(oldKey=> oldKey + 1);
        }   
    }
    
    return (
        <div className='wrapper-main'>      
            <form onSubmit={handleSubmit} className='form-container'>
                <FormDefault 
                    nameError={nameError}
                    phoneError={phoneError}
                >
                </FormDefault>      
            </form>
            <h2 className='text-center'>Contact List</h2> 
            <div className="table" id="results">
                <div className='theader'>
                    <div className='table_header'>Name</div>
                    <div className='table_header'>Contact</div>
                    <div className='table_header'>Details</div>
                </div>
                {   
                    data?.map((dt,i)=>
                    <div className='table_row' key = {dt.id}>
                        <div className='table_small'>
                        <div className='table_cell th-sm-bg'>Name</div>
                        <div className='table_cell'>{dt.name}</div>
                        </div>
                        <div className='table_small'>
                        <div className='table_cell th-sm-bg'>Contact</div>
                        <div className='table_cell'>{dt.contact}</div>
                        </div>
                        <div className='table_small'>
                        <div className='table_cell th-sm-bg'>Details</div>
                        <div className='table_cell'><Link to={`contact/${dt.id}`}><button className='btn btn-details'>Details</button></Link></div>
                        </div>           
                    </div>
                    )
                }         
            </div>
        </div>
    );
};

export default Home;
