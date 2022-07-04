import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.name)
    res.send({ message: `Hello ${req.query.name}!`});
  else 
    res.send({ message: 'Hello API from next.js SSR'});
}