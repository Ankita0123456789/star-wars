// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

const login = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await axios.get("http://localhost:3000/");
    console.log(data);
    res.status(200).json({ data, success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default login;
