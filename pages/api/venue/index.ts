import { Venue } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Venue[]>
) {
  const venue = (await prisma?.venue.findMany()) || [];
  res.status(200).json(venue);
  console.log(req.method);
}
