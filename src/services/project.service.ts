import { ProjectModel } from "../models/project.model";
import { HttpError } from "../utils/httpErrors.utils";

const findAll = async()=>{
    const projects = await ProjectModel.findAll();
    return projects;
};

const findOneById = async (id: string)=>{
    const project = await ProjectModel.findOneById(id);
    return project;
};

const create = async(title: string, description: string, imgurl: string)=>{
    const newProject = await ProjectModel.create(title, description, imgurl);
    return newProject;
};

const deleteById = async(id: string)=>{
    const project = await ProjectModel.deleteById(id);
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