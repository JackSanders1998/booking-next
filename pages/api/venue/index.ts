import HttpStatusCode from "@/types/status-codes";
import { Venue } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function handleGET(res: NextApiResponse) {
  try {
    const venues = (await prisma?.venue.findMany()) || [];
    if (!venues) res.status(HttpStatusCode.NOT_FOUND);
    res.status(HttpStatusCode.OK).json(venues)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const venues = (await prisma?.venue.findMany()) || [];
    if (!venues) res.status(HttpStatusCode.NOT_FOUND);
    res.status(HttpStatusCode.OK).json(venues)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Venue[]>
) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGET(res)
      break
    case 'POST':
      return handlePOST(req, res)
      break
      console.log(req.method);
  }
}
