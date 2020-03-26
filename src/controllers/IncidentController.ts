import { Request, Response } from 'express';

import connection from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();
    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .limit(5)
      .offset( (page - 1) * 5 )
      .select([
        'incidents.*',
        'ngos.name as ngoName',
        'ngos.email as ngoEmail',
        'ngos.whatsApp as ngoWhatsApp',
        'ngos.city as ngoCity',
        'ngos.uf as ngoUf' ]);

    console.log('Listed all Incidents');

    response.header('X-Total-Count', count['count(*)']);
    return response.json(incidents);
  },

   async create(request: Request, response: Response) {
    const { title, description, value } = request.body;
    const ngo_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    });
    console.log(`Created Incident:\n  Id:          ${id}\n  Title:       ${title},\n  description: ${description},\n  value:       ${value},\n  ngo_id:      ${ngo_id}`);

    return response.json({ id });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const ngo_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ngo_id')
      .first();

    if (incident !== undefined && incident.ngo_id !== ngo_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();
    return response.status(204).send();
  }
};