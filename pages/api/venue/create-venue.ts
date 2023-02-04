import { getSession } from 'next-auth/react';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if user is authenticated
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    // Create new venue
    if (req.method === 'POST') {
        try {
            const { image, title, description, seats, published, timeSlots } =
                req.body;

            const user = await prisma?.user.findUnique({
                where: { email: session.user.email },
            });

            const venue = await prisma?.venue.create({
                data: {
                    image,
                    title,
                    description,
                    seats,
                    published,
                    timeSlots,
                    ownerId: user.id,
                },
            });
            res.status(200).json(venue);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
    // HTTP method not supported!
    else {
        res.setHeader('Allow', ['POST']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}