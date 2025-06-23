import bcrypt from "bcryptjs"
import ConnectDB from "../utils/db.js";


export const hashPassword = async(password)=>{
    try {
        await ConnectDB();
        const saltRounds = 10;  
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(password, hashedPassword)=>{
    try {
        await ConnectDB();
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log(error)
    }
}

