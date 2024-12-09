import { db } from "../config/connection.db";
import { Project } from "../interfaces/project.interface";

const findAll = async () => {
  const { rows } = await db.query("SELECT * FROM projects");
  return rows as Project[];
};

const findOneById = async (id: string) => {
  const query = {
    text: `
    SELECT * FROM projects
    WHERE id = $1
    `,
    values: [id],
  };

  const { rows } = await db.query(query);

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

const deleteById = async (id: string) => {
    const query = {
        text: `
            DELETE FROM projects
            WHERE id = $1
            RETURNING *
        `,
        values: [id]
    }

    const { rows } = await db.query(query);
    return rows[0] as Project;
}

export const ProjectModel = {
    findAll,
    findOneById,
    create,
    deleteById
};