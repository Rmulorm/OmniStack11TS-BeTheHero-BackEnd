import { Request, Response } from 'express';
import crypto from 'crypto';

import connection from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const ngos = await connection('ngos').select('*');
    console.log('listed NGOS');
    return response.json(ngos);
  },

  async create(request: Request, response: Response) {
    const { name, email, whatsApp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ngos').insert({
      id,
      name,
      email,
      whatsApp,
      city,
      uf
    });
    console.log(`Created NGO:\n  Id:       ${id},\n  Name:     ${name},\n  whatsApp: ${whatsApp},\n  city:     ${city},\n  uf:       ${uf}`);

    return response.json({ id });
  }
};