import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/style.scss'


const Details = () => {

    const [data, setData] = useState([]);
    const [nameError, setNameError] = useState([]);
    const [phoneError, setPhoneError] = useState([]);
    const [contactList, setcontactList] = useState([]);
    const [refreshKey,setRefreshKey] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    // regex value for validating phone and contact
    let regexName = /^[A-Z]+[A-Z a-z]*$/;
    let regexPhone = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    useEffect(()=> {
        const parsedArr = JSON.parse(localStorage.getItem("information"));
        setcontactList(parsedArr);
        const filtered = parsedArr.filter(fd=> fd.id === id);
        setData(filtered);
    },[refreshKey])
    

    const handleDelete = (id) => {
        const filtered = contactList.filter(entry => entry.id !== id);
        localStorage.setItem('information', JSON.stringify(filtered));
        navigate("/");
    }

    const handleEdit = () => {
        const form = document.getElementById("editForm");
        form.classList.remove("d-none");
        console.log("clicked")
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        
        const testName = regexName.test(name);
        const testPhone = regexPhone.test(contact);
        
        if(testName === false ){
            setNameError("Name is not valid")
        }
        if(testPhone === false) {
            setPhoneError("Phone number is not valid")
        }
        
        if(testName && testPhone === true){
            handleUpdate(name,contact); 
            form.reset(""); 
            setRefreshKey(oldKey=> oldKey+ 1)
            // clear the value of input field and error messages when user submit correct info
            setNameError("");
            setPhoneError("");
        }             
    }

    const handleUpdate = (name,contact) => { 
        const filtered = contactList.findIndex(obj=> obj.id === id);
        contactList[filtered].name = name;
        contactList[filtered].contact = contact;   
        localStorage.setItem('information',JSON.stringify(contactList));
    }
   
    return (
        <div className='details-table table'>
            <h2>Record Book</h2>
            <div class="table" id="results">
                <div class='theader'>
                    <div class='table_header'>Name</div>
                    <div class='table_header'>Contact</div>
                    <div class='table_header'>Edit</div>
                    <div class='table_header'>Delete</div>
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
                            <div class='table_cell th-sm-bg'>Edit</div>
                            <div class='table_cell'><button onClick={handleEdit} className='btn green'>Edit</button></div>
                        </div> 
                        <div class='table_small'>
                            <div class='table_cell th-sm-bg'>Delete</div>
                            <div class='table_cell'><button onClick={()=> handleDelete(`${id}`)} className='btn red'>Delete</button></div>
                        </div>          
                    </div>
                    )
                }         
            </div>
            {
                data.map(rc=>
                    <form key={rc.id} onSubmit={handleSubmit} className='contact-form d-none' id="editForm">
                        <h2>Edit Information</h2> 
                        <div className='form-wrapper'>
                            <div className='form-control'>
                                <label htmlFor ="name">Name</label>
                                <input type ="text" name="name" minlength="3" defaultValue={rc.name}/>
                                <p className='text-error'>{nameError}</p>
                            </div>
                            <div className='form-control'> 
                                <label htmlFor ="contact">Contact</label>
                                <input type = "text" name="contact" defaultValue={rc.contact}/>
                                <p className='text-error'>{phoneError}</p>
                            </div>
                            <div> 
                            <input  className="form-button"
                                type="submit"
                                value="Submit"/>
                            </div>
                        </div>
                    </form>
                    )
            }                               
        </div>
    );
};

export default Details;