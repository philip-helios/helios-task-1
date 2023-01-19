import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/responsive.css'
import '../../Styles/style.css'

const Details = () => {

    const [record, setRecord] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        const entries = JSON.parse(localStorage.getItem('information'));

        const filtered = entries.filter(entry => entry.id === id);
        setRecord(filtered);
    },[])
    

    // const handleDelete = (id) => {
    //     // fetching all inforamtion from local storage
    //     const entries = JSON.parse(localStorage.getItem('information'));

    //     const filtered = entries.filter(entry => entry.id !== id);

    //     setUser(filtered);

    //     localStorage.setItem('information', JSON.stringify(filtered));

    // }

    const handleEdit = () => {
        const form = document.getElementById("editForm");
        form.classList.remove("d-none");
        console.log("clicked")
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact= form.contact.value;

        const updatedInfo = {name,contact};
        console.log(updatedInfo)
        
    }
   
    return (
        <div className='details-table table'>
            <h2>Record Book</h2>
            <div className="tr">
                <div className='dt-table-th'>Name</div>
                <div className='dt-table-th'>Contact</div>
                <div className='dt-table-th'>Edit</div>
                <div className='dt-table-th'>Delete</div>
            </div>          
            { 
              record.map(rc=>
                <div className="tr">
                    <div className='dt-table-td'>{rc.name}</div>
                    <div className='dt-table-td'>{rc.contact}</div>
                    <div className='dt-table-td'><button onClick={handleEdit} className='btn green'>Edit</button></div>
                    <div className='dt-table-td'><button className='btn red'>Delete</button></div>                       
                </div> 
                )          
            }
            {
                record.map(rc=>
                    <form onSubmit={handleUpdate} className='contact-form d-none' id="editForm">
                        <h2>Edit Information</h2> 
                        <div className='form-wrapper'>
                            <div className='form-control'>
                                <label htmlFor ="name">Name</label>
                                <input type ="text" name="name" defaultValue={rc.name}/>
                            </div>
                            <div className='form-control'> 
                                <label htmlFor ="contact">Contact</label>
                                <input type = "text" name="contact" defaultValue={rc.contact}/>
                                <p className='text-error'></p>
                            </div>
                            <div>
                            <input className="form-button"
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