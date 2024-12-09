import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service";

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const projects = await projectService.findAll();
    res.json({
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const findOneById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const { id } = req.params;
        if(!id){
            res.status(400).json({
                ok: false,
                msg: "Proyecto no encontrado"
            })
        }
        res.json({});
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, imgurl } = req.body;
      const newProject = await projectService.create(
        title,
        description,
        imgurl
      );
      if(!title || !description || !imgurl){
        res.status(400).json({
            ok: false,
            msg: "Todos los campos son requeridos"
        })
      }
      res.json({ newProject });
    } catch (error) {
      next(error);
    }
  };

  const deleteById = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const {id} = req.params;
        const deletedProject = await projectService.deleteById(id);
        if(!deletedProject){
            res.status(400).json({
                ok: false,
                msg: "Proyecto no encontrado"
            })
        }
        res.json({msg: "Proyecto eliminado con éxito", deletedProject})
    } catch (error) {
        next(error);
    }

  };

export const projectController = {
    findAll,
    findOneById,
    create,
    deleteById
};