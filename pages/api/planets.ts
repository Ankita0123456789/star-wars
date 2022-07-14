// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next'



const login =  async (_req: NextApiRequest, res: NextApiResponse) => {
    
  try {
    const results = await axios.get('https://swapi.dev/api/planets/')
    if (results?.data){
        res.status(200).json({ data: results.data, success: true });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

export default login;