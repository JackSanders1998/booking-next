import type { NextApiRequest, NextApiResponse } from "next";

export interface Venue {
  id: string;
  image: string | null;
  title: string;
  description: string;
  seats: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Venue[]>
) {
  const venue = (await prisma?.venue.findMany()) || [];
  res.status(200).json(venue);
  console.log(req.method);
}
