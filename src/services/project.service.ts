import { ProjectModel } from "../models/project.model";
import { HttpError } from "../utils/httpErrors.utils";

const findAll = async()=>{
    const projects = await ProjectModel.findAll();
    return projects;
};

const findOneById = async (uid: string)=>{
    const project = await ProjectModel.findOneById(uid);
    return project;
};

const create = async(title: string, description: string, imgurl: string)=>{
    const newProject = await ProjectModel.create(title, description, imgurl);
    return newProject;
};

const deleteById = async(uid: string)=>{
    const project = await ProjectModel.deleteById(uid);
    if (!project) {
        throw new HttpError("Este projecto no existe", 404);
      }
    return project;
};

export const projectService = {
    findAll,
    findOneById,
    create,
    deleteById
};