import { Request, Response } from 'express';

import connection from '../database/connection';

export default {
  async create(request: Request, response: Response) {
    const ngo_id = request.headers.authorization;

    const ngo_name = await connection('ngos')
      .where('id', ngo_id)
      .select('name')
      .first();

    if (!ngo_name) {
      return response.status(400).json({ error: 'No NGO Found with this ID' });
    }

    return response.json({ name: ngo_name });
  }
}