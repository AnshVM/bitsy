import mongoose,{Schema} from 'mongoose';
import * as shell from 'shelljs';
import * as fs from 'fs';
import { typeConstructorMap } from './schemaTypes';


export type schemaType = {
    [key: string]: Function
}
export type stringySchemaType = {
    [key: string]: string
}

const modelCreateCode = (modelName: string, stringifiedSchema: string): string => {
    return `
import {model,Schema} from 'mongoose';
const ${modelName}Schema = new Schema(${stringifiedSchema}); 
export default model("${modelName}",${modelName}Schema);
    `
}

const stringifySchema = (model: { name: string, schema: schemaType }) => {
    let transformedSchema: stringySchemaType = {};
    Object.keys(model.schema).forEach((k) => {
        const typeConstructor = typeConstructorMap.get(model.schema[k]);
        if (typeConstructor) {
            transformedSchema[k] = typeConstructor;
        } else {
            throw new Error("Invalid type")
        }
    })
    return JSON.stringify(transformedSchema,null,4).replace(/"/g, '');
}

export const fileContent = (model: { name: string, schema: schemaType }) => {
    const stringifiedSchema = stringifySchema(model);
    const content = modelCreateCode(model.name, stringifiedSchema);
    return content;
}

const createModels = (models: { name: string, schema: schemaType }[]) => {
    models.forEach((m) => {
        const file = `${m.name}.ts`;
        shell.touch(file);
        const content = fileContent(m);
        fs.writeFileSync(file, content);
    })
}

export default createModels;



