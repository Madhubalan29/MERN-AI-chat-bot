import {connect,disconnect} from 'mongoose';

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    }
    catch (error){
        console.log(error);
        throw new Error("CANNOT CONNECT");
    }
}
async function disconnectFromDatabase(){
    try {
        await disconnect();
    }
    catch (error){
        console.log(error);
        throw new Error("couldn' disconnect");
    }
}
export {connectToDatabase,disconnectFromDatabase};