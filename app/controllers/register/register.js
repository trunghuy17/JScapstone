import {User} from '../../models/User.js';
import {checkEmail,checkEmpty,checkPassword,checkNumber} from '../../util/validation.js';
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
document.querySelector('#submit').onclick= (e) => {
    e.preventDefault();
    let arrInput = document.querySelectorAll('.form-group input');
    for (let input of arrInput) {
        let{id,value} = input;
        user[id] = value;
    }
    user[gender] = gender;
    validationError(user);
}
//validation error

let validationError=(user)=>{
    for (let key in user) {
        checkEmpty(user.key,);
        if(key=='email') {
            checkEmail(key);
        }

        console.log(key)
    }
}
