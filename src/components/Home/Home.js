import React from 'react';
import '../../Styles/responsive.css'
import '../../Styles/style.css'

const Home = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        
        const person = {
            name,contact
        }

        const data = JSON.stringify(person)
        localStorage.setItem("Contact Information",data);

        
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
        </div>
    );
};

export default Home;