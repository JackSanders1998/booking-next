import { NotFoundError } from "@prisma/client/runtime";
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
  res: NextApiResponse<Venue | undefined>
) {
  console.log(req.method, req.url);
  const venue = await prisma?.venue.findFirstOrThrow(req.body.id);
  if (!venue) throw new Error();
  res.status(200).json(venue);
}
