// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(req.body);
    const people = await axios.get("https://swapi.dev/api/people/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const person = people.data.results.find(
      (person: any) => person.name === data.name
    );
    const isValid = person && person.birth_year === data.password;

    res.status(200).json({ data: person, success: isValid });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default login;
