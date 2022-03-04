import { Connection } from "pg";
import db from "../database";
import User from "../types/user.types";

class UserModel {
  //Create user
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users(email, name, password)
                values($1,$2,$3) returning * `;
      // run the query
      const result = await connection.query(sql, [u.email, u.name, u.password]);
      // release connection
      connection.release();
      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${u.name}): ${(error as Error).message}`
      );
    }
  }
  //Get all users
  async getMany(): Promise<User[]>{
    try{
      const connection = await db.connect();
      const sql=
      'SELECT user_id, email, name FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    }catch (error) {
      throw new Error(`Error at retreiving users ${(error as Error).message}`);

    }
  }

  //get specific user 
  async getUser(user_id: number): Promise<User>{
    try{
      const sql=
      `SELECT user_id, email, name FROM users
       WHERE id=($1)
      `;
      const connection = await db.connect();
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    }catch (error) {
      throw new Error(`Couldn't find user ${user_id}, ${(error as Error).message}`);
    }
  }
  //Update the user 
  async updateUser(u: User): Promise<User>{
    try{
      const sql=
      `UPDATE users 
      SET email =$1, name FROM users
       WHERE id=($1)
      `;
      const connection = await db.connect();
      const result = await connection.query(sql, [
        u.email,
        u.name,
        u.password
      ]);
      connection.release();
      return result.rows[0];
    }catch (error) {
      throw new Error(`Couldn't find user ${u.name}, ${(error as Error).message}`);
    }
  }
  //delete the user
  async deleteUser(user_id:number): Promise<User>{
    try{
      const connection = await db.connect();
      const sql=
      `DELETE FROM users 
       WHERE id=($1)
       RETURNING user_id, email, name 
      `;

      const result = await connection.query(sql, [user_id
      ]);
      connection.release();
      return result.rows[0];
    }catch (error) {
      throw new Error(`Couldn't find user ${user_id}, ${(error as Error).message}`);
    }
  }
}

export default UserModel;
