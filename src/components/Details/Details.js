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
                    <div onClick={()=> handleEdit()} className='dt-table-td'>{rc.contact}</div>
                    <div className='dt-table-td'><button className='btn green'>Edit</button></div>
                    <div className='dt-table-td'><button className='btn red'>Delete</button></div>                       
                </div> 
                )          
            }
            {
                <div>
                     <h2>Edit Information</h2>
                        <form action="/action_page.php">
                        <label for="name">Name</label><br/>
                        <input type="text" id="name" name="name" value={record.name}/><br/>
                        <label for="contact">Contact</label><br/>
                        <input type="text" id="contact" name="contact" value={record.contact}/><br/>
                        <input type="submit" value="Submit"/>
                        </form> 
                </div>
               
                
            }         
        </div>
    );
};

export default Details;