import { Filter } from 'bad-words'

export function isValidEmail(email: string): boolean {
    // regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // test provided email string against the regex
    return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
    // regular expression to check for at least 8 characters, 1 digit, and 1 symbol
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    // test provided password string against the regex
    return passwordRegex.test(password);
}


//use this to reduce profanity in bio, descriptions and other features
export function containsBadWord(text: string): boolean {
    const filter = new Filter();
    return filter.isProfane(text); 
}
