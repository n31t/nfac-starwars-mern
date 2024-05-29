import Log from './models/Log.js';

export function logRequest(message, link){
    Log.create({
        message: message,
        link: link
    })
    .then((log)=> console.log(log))
    .catch((err) => console.log(err))
}