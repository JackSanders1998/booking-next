import HttpStatusCode from "@/types/status-codes";
import { Venue } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     description: GET a venue by ID
 *     responses:
 *       200:
 *         description: OK
 */
async function handleGET(id: string, res: NextApiResponse) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id },
    })
    if (!venue) res.status(HttpStatusCode.NOT_FOUND).json(id);
    res.status(HttpStatusCode.OK).json(venue)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
}

/**
 * @swagger
 * /venue/{venueId}:
 *   delete:
 *     tags: [Venue]
 *     description: DELETE a venue by ID
 *     responses:
 *       200:
 *         description: OK
 */
async function handleDELETE(id: string, res: NextApiResponse) {
  try {
    const venue = await prisma.venue.delete({
      where: { id },
    })
    if (!venue) res.status(HttpStatusCode.NOT_FOUND).json(id);
    res.status(HttpStatusCode.OK).json(venue)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Venue>
) {
  const { query, method } = req
  const venueId = query.id as string;

  switch (method) {
    case 'GET':
      return handleGET(venueId, res)
      break
    case 'DELETE':
      return handleDELETE(venueId, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`)
  }
}
