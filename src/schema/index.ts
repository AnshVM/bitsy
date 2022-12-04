import mongoose from 'mongoose';
import * as shell from 'shelljs';
import * as fs from 'fs';
import { typeConstructorMap } from './schemaTypes';


export type schemaType = {
    [key:string]:Function
}
export type stringySchemaType = {
    [key:string]:string
}

const modelCreateCode = (modelName:string,schema:stringySchemaType):string => {
    return `
import {Schema} from 'mongoose';
export const ${modelName}Schema = new Schema(${JSON.stringify(schema).split('"').join('')}); 
    `
}

const createModels = (models:{name:string,schema:schemaType}[]) => {
    models.forEach((m) => {
        let transformedSchema:stringySchemaType = {};
        Object.keys(m.schema).forEach((k)=>{
            const typeConstructor = typeConstructorMap.get(m.schema[k]);
            if(typeConstructor){
                transformedSchema[k] = typeConstructor;
            }else{
                throw new Error("Invalid type")
            }
        })
        const file = `${m.name}.ts`;
        shell.touch(file);
        fs.writeFileSync(file,modelCreateCode(m.name,transformedSchema));
    })
}

export default createModels;



