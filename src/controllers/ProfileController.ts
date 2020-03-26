import { Request, Response } from 'express';

import connection from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const ngo_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ngo_id', ngo_id)
      .select('*');

    console.log(`Listed Incidents for NGO Id ${ngo_id}`);
    return response.json(incidents);
  }
}