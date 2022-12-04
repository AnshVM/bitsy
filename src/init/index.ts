import * as shell from 'shelljs';
import {packages} from './config'; 
import createModels from '../schema';
import { schemaType } from '../schema';

export default (projectName:string,models:{name:string,schema:schemaType}[]) => {
    shell.rm('-rf',projectName);
    shell.mkdir(projectName);
    shell.cd(projectName);

    shell.exec("npm init --y");
    shell.exec(`npm install ${packages.join(" ")}`);

    shell.mkdir('src');
    shell.cd('src');

    shell.touch('index.ts');

    shell.mkdir('models');
    shell.cd('models');
    console.log(models);
    createModels(models); 
    shell.cd('../');
}

