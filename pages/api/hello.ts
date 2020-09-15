import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
}

export default (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
