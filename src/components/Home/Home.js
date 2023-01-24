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
    let regexName = /^[A-Z]+[A-Z a-z]*$/;
    let regexPhone = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    
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
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name"/><br />
                    <p className='text-error'>{nameError}</p>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="contact"/><br />
                    <p className='text-error'>{phoneError}</p>
                </div>
                <div className="form-group">
                    <input className='submit-button' type="submit" value="Submit"/>  
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
