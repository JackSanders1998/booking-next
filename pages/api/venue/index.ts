import HttpStatusCode from "@/types/status-codes";
import { Venue } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash';

/**
 * @swagger
 * /api/venue:
 *   get:
 *     tags: [Venue]
 *     description: GET all venues
 *     responses:
 *       200:
 *         description: OK
 */
async function handleGET(res: NextApiResponse) {
  try {
    const venues = (await prisma?.venue.findMany()) || [];
    if (_.isEmpty(venues)) res.status(HttpStatusCode.NOT_FOUND);
    res.status(HttpStatusCode.OK).json(venues)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
}

/**
 * @swagger
 * /api/venue:
 *   post:
 *     tags: [Venue]
 *     description: POST a venue
 *     responses:
 *       200:
 *         description: OK
 */
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  console.log('in here')
  try {
    const { title, description, seats, published } = req.body;
    const venue = (await prisma?.venue.create({
      data: {
        title,
        description,
        seats,
        published,
      }
    }))
    res.status(HttpStatusCode.OK).json(venue)
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
