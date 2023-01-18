import React from 'react';
import '../../Styles/responsive.css'
import '../../Styles/style.css'

const Home = () => {

    const printData = JSON.parse(localStorage.getItem('information'));
    let arrayData = [];

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;

        let regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
        
        const person = {
            name,
            contact
        }
        const data = person;

        
        arrayData.push(data);
        localStorage.setItem('information', JSON.stringify(arrayData));

    }
    return (
        <div className='wrapper-main'>
            <h2>Sample Contact Form</h2>
            <form onSubmit={handleSubmit} className='contact-form'> 
                <div className='form-wrapper'>
                    <div>
                        <label htmlFor ="name">Name</label>
                        <input type ="text" name="name"/>
                    </div>
                    <div>
                        <label htmlFor ="contact">Contact</label>
                        <input type = "text" name="contact"/>
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
                </tr>          
                    {
                      printData.map((data,i)=>
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.contact}</td>
                        </tr>
                        )
                    }         
                
                </table>
        </div>
    );
};

export default Home;