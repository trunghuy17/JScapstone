
//check rỗng

export function checkEmpty(value, selectorError, name) {
    if (value.trim() == '') {
        document.querySelector(selectorError).innerHTML = name + ' invalid';
        return false;
    } else {
        document.querySelector(selectorError).innerHTML = '';
        return true
    }
}
//check dinh dang 

export function checkName(value, selectorError, name) {
    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' tat ca phai la ki tu';
        return false;
    }
}

//check tat ca la so

export function checkNumber(value, selectorError, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' tat ca phai la so';
        return false;
    }
}

//check email 
export function checkEmail(value, selectorError, name) {
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' khong dung dinh dang <br/> example: abc@gamil.com';
        return false;
    }
}

//check mat khau
export function checkPassword(value, selectorError, name) {
    var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (regexPassword.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' phai co so va chu , it nhat 1 ky tu viet hoa va 1 ki tu dat biet';
        return false;
    }
}

//check do dai
export function checkLength(value, selectorError, name, minLength, maxLength) {
    if (value.trim().length > maxLength || value.trim().length < minLength) {
        document.querySelector(selectorError).innerHTML = name + ' do dai tu ' + minLength + ' den ' + maxLength;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return  true;
}

//check date
export function checkDate(value, selectorError, name){
    // console.log(typeof (value));
    var regexDate=/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
	if(regexDate.test(value)){
        return true;
    }else{
        document.querySelector(selectorError).inner= name+ 'error';
        return false;
    }
 }