import { Request, Response } from 'express';

import connection from '../database/connection';

export default {
  async create(request: Request, response: Response) {
    const { id } = request.body;

    const ngo = await connection('ngos')
      .where('id', id)
      .select('name')
      .first();

    if (!ngo) {
      return response.status(400).json({ error: 'No NGO Found with this ID' });
    }

    return response.json( ngo );
  }
}