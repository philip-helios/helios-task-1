import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/responsive.css'
import '../../Styles/style.css'

const Details = () => {

    const [record, setRecord] = useState([]);
    const id = useParams();

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('information'));
        let filter = data.find(dt=> dt.id !== id);
        setRecord(filter);
    },[])
    console.log(record)

    // const handleDelete = (id) => {
    //     // fetching all inforamtion from local storage
    //     const entries = JSON.parse(localStorage.getItem('information'));

    //     const filtered = entries.filter(entry => entry.id !== id);

    //     setUser(filtered);

    //     localStorage.setItem('information', JSON.stringify(filtered));

    // }
   
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
               
                <div className="tr">
                    <div className='dt-table-td'>{record.name}</div>
                    <div className='dt-table-td'>{record.contact}</div>
                    <div className='dt-table-td'><button className='btn green'>Edit</button></div>
                    <div className='dt-table-td'><button className='btn red'>Delete</button></div>                       
                </div>
                
            }         
        </div>
    );
};

export default Details;