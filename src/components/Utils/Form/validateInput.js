const validateInput = (values) => {
    let errors = {status:true}
    let regexName = /^[A-Za-z]+[A-Z a-z]*$/;
    let regexPhone = /^(\+88|88)?(01[3-9]\d{8})$/;
    const name = values?.name;
    const contact = values?.contact;
        if(name && !regexName.test(name)){
            errors.name="Name is not valid"
            errors.status= false;
        }
        if(contact && !regexPhone.test(contact)){
            errors.contact="Phone number is not valid"
            errors.status= false;
        }
        if(!name || !contact){
            errors.status=false;
        }

    return errors;
};

export default validateInput;