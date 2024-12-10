import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service";

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const projects = await projectService.findAll();
    res.status(200).json({
      ok: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const findOneById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const { uid } = req.params;
        if (!uid) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del proyecto es requerido"
            });
        }

        const project = await projectService.findOneById(uid);
        if (!project) {
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }

        res.status(200).json({
            ok: true,
            project
        });
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, imgurl } = req.body;
      
      if (!title || !description || !imgurl) {
        return res.status(400).json({
            ok: false,
            msg: "Todos los campos son requeridos"
        });
      }

      const newProject = await projectService.create(
        title,
        description,
        imgurl
      );

      res.status(201).json({
        ok: true,
        msg: "Proyecto creado con éxito",
        project: newProject
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteById = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const {uid} = req.params;
        if (!uid) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del proyecto es requerido"
            });
        }

        const deletedProject = await projectService.deleteById(uid);
        if (!deletedProject) {
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Proyecto eliminado con éxito",
            project: deletedProject
        });
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