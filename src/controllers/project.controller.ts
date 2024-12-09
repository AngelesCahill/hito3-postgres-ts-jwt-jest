import { Request, Response } from "express";
import { projectService } from "../services/project.service";

const findAll = async (req: Request, res: Response)=>{
  try {
    const projects = await projectService.findAll();
    res.json({
      projects,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error){
      res.status(500).json({ error: error.message });
    } else res.status(500).json({ error: "Error de servidor" });
  }
};

const findOneById = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        res.json({});
    } catch (error) {
        console.log(error);
        if (error instanceof Error){
            res.status(500).json({ error: error.message });
        } else res.status(500).json({ error: "Error de servidor" });
    }
};

const create = async (req: Request, res: Response) => {
    try {
      const { title, description, imgurl } = req.body;
      const newProject = await projectService.create(
        title,
        description,
        imgurl
      );
      res.json({ newProject });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else res.status(500).json({ error: "Error de servidor" });
    }
  };

  const deleteById = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const deletedProject = await projectService.deleteById(id);
        res.json({msg: "Proyecto eliminado con éxito", deletedProject})
    } catch (error) {
        console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else res.status(500).json({ error: "Error de servidor" });
    }

  };

export const projectController = {
    findAll,
    findOneById,
    create,
    deleteById
};