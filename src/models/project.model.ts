import { db } from "../config/connection.db";
import { Project } from "../interfaces/project.interface";

const findAll = async () => {
  const { rows } = await db.query("SELECT uid, title, description, imgurl FROM projects");
  return rows as Project[];
};

const findOneById = async (uid: string) => {
  console.log('Buscando proyecto con UID:', uid);

  const query = {
    text: `
    SELECT uid, title, description, imgurl 
    FROM projects
    WHERE uid = $1
    `,
    values: [uid],
  };

  const { rows } = await db.query(query);
  console.log('Resultado de la consulta:', rows);
  
  if (rows.length === 0) {
    throw new Error('Project not found');
  }

  return rows[0] as Project;
};

const create = async (title: string, description: string, imgurl: string) => {
  const query = {
    text: `
    INSERT INTO projects (title, description, imgurl)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    values: [title, description, imgurl],
  };

  const { rows } = await db.query(query);

  return rows[0] as Project;
};

const deleteById = async (uid: string) => {
    console.log('Intentando eliminar proyecto con UID:', uid);

    const query = {
        text: `
            DELETE FROM projects
            WHERE uid = $1
            RETURNING uid, title, description, imgurl
        `,
        values: [uid]
    }

    const { rows } = await db.query(query);
    console.log('Resultado del delete:', rows);
    
    if (rows.length === 0) {
        throw new Error('Project not found');
    }

    return rows[0] as Project;
}

export const ProjectModel = {
    findAll,
    findOneById,
    create,
    deleteById
};