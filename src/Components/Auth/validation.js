import * as zxcvbn from 'zxcvbn';


export function minMaxLength(text, minLength, maxLength) {   // name validation 
    let result = !text || text.length < minLength;
    if(maxLength)
        result = result || text.length < minLength;
    return result;
}

export function validEmail(text) {   //email regex
    const regex = RegExp(
        /^\S+@\S+\.\S+$/
      );
     
    return !regex.test(text);
}
 
let registeredUsers = [
    'ravi@kiran.com',
    'mail@myblog.in',
    'contact@lucky.com'
];
 
 
export function userExists(email) {   // email validator
    return new Promise(resolve => {
        setTimeout(() => {
            if(registeredUsers.findIndex(u => u === email) !== -1) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}

export function passwordStrength(text) {
    let result = zxcvbn(text);
    return result.score < 3;
}