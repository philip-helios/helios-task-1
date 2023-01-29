const validateInput = (values) => {
    let errors = {}
    let valid = false;
    let regexName = /^[A-Za-z]+[A-Z a-z]*$/;
    let regexPhone = /^(\+88|88)?(01[3-9]\d{8})$/;
    const name = values.name;
    const contact = values.contact;
    if(!regexName.test(name) && name.length > 0){
        errors.name="Name is not valid"
    }
    if(!regexPhone.test(contact) && contact.length > 0){
        errors.contact="Phone number is not valid"
    }
    if(regexPhone.test(contact) && name.length === 0){
        errors.name="Name is required"
    }
    if(regexName.test(name) && regexPhone.test(contact)){
        valid= true;
    }
    return {errors,valid};
};

export default validateInput;