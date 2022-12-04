import { fileContent } from "../schema";

describe('mongoose models generator', () => {

    test('simple mongoose model with multiple fields', () => {
        const content = fileContent({ name: "user", schema: { 
            name: String, 
            email:String, 
            password:String, 
            dor:Date
        }})

        const expected = `
import {Schema} from 'mongoose';
export const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dor: Date
}); 
    `
        expect(content).toBe(expected);
    })

})
