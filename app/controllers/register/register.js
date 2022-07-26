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
                if (user[classTag] != user.password) {
                    validation = false;
                    document.querySelector(`.${classTag}`).innerHTML = `nhập lại ${classTag}`;
                    arrValidation.push(validation);
                }
            }
            if (classTag == 'phone') {
                validation = checkNumber(user[classTag], `.${classTag}`, classTag);
                if (!validation) {
                    arrValidation.push(validation);
                }
            }
        } else {
            arrValidation.push(validation);
        }
    }
    let check = false;
    check = arrValidation.find(item => item == false);
    if (check) {
        // let userCopy = { ...user };
        // if (userCopy.hasOwnProperty('passwordConfirm')) {
        //     delete userCopy.passwordConfirm;
        // }

        let userCopy = {
            email : user.email,
            password : user.password,
            name : user.name,
            phone : user.phone,
            gender : user.gender
        }
        singUp(userCopy);
        
        let userLogIn = {
            email: user.email,
            password: user.password
        }
        setTimeout(signIn(userLogIn), 3000);
        setTimeout(() => location.assign("../../index.html"), 1000);
    }
}

//sign up user
let singUp = (user) => {
    let promises = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: user
    })
    promises.then((res) => {
        let success = res.data.message;
        alert(success);
    })
    promises.catch((err) => {
        alert(err.response.data);
    })
}

//sign in user
let signIn = (userLogIn) => {
    let promises = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signin',
        method: 'POST',
        data: userLogIn
    })
    promises.then((res) => {
        console.log(res.data.message);

    })
    promises.catch((err) => {
        console.log(err.response.data);
    })
}



