import { User } from '../../models/User.js';
import { checkEmail, checkEmpty, checkPassword, checkNumber, checkName, checkLength } from '../../util/validation.js';
// checked by input radio 
let inputMale = document.querySelector('#male');
let inputFemale = document.querySelector('#female');

let gender = 'male';
//get input gender
inputMale.onclick = function (e) {
    gender = inputMale.id;
}
inputFemale.onclick = function (e) {
    gender = inputFemale.id;
}

let user = new User();
//get input by tag input
document.querySelector('#submit').onclick = (e) => {
    e.preventDefault();
    let arrInput = document.querySelectorAll('.form-group input');
    for (let input of arrInput) {
        let { id, value } = input;
        user[id] = value;
    }
    if (gender == 'male') {
        user.gender = true;
    } else if (gender == 'female') {
        user.gender = false;
    }
    validationError(user);

}
//validation error
let validationError = (user) => {
    let arrOutputValidation = document.querySelectorAll('.form-group div');
    let validation = true;
    let arrValidation = [];
    for (let input of arrOutputValidation) {
        let classTag = input.className;
        validation = checkEmpty(user[classTag], `.${classTag}`, classTag);
        if (validation) {
            if (classTag == 'name') {
                validation = checkName(user[classTag], `.${classTag}`, classTag);
                if (validation) {
                    checkLength(user[classTag], `.${classTag}`, classTag, 5, 30);
                } else {
                    arrValidation.push(validation);
                }
            }
            if (classTag == 'email') {
                validation = checkEmail(user[classTag], `.${classTag}`, classTag);
                if (!validation) {
                    arrValidation.push(validation);
                }
            }
            if (classTag == 'password') {
                validation = checkPassword(user[classTag], `.${classTag}`, classTag);
                if (!validation) {
                    arrValidation.push(validation);
                }
            }
            if (classTag == 'passwordConfirm') {
                console.log(classTag)
                if (user[classTag] != user.password) {
                    document.querySelector(`.${classTag}`).innerHTML = `nhập lại ${classTag}`;
                    arrValidation.push('false');
                }
            }
            if (classTag == 'phone') {
                validation=checkNumber(user[classTag], `.${classTag}`, classTag);
                if (!validation) {
                    arrValidation.push(validation);
                }
            }
        }else{
            arrValidation.push(validation);
        }
    }

    console.log(arrValidation)
    let check=true;
    for (let value of arrValidation) {
        if (value==false) {
           check=false;
           break;
        }
    }
    let userCopy={...user};
    if(userCopy.hasOwnProperty('passwordConfirm')){
       delete userCopy.passwordConfirm;
    }
    if (check) {
        singUp(userCopy);
    }
}

let singUp = (user) => {
    let promises = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: user,
    })
    promises.then((res) => {
        let success = res.data.message;
        alert(success);
        setTimeout(() =>{
            
        },3000);
    })
    promises.catch((err) => {
       alert(err.response.data);
    })
}


