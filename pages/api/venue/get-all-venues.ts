import type { NextApiRequest, NextApiResponse } from 'next'

export interface Venue {
    id: number;
    venue: string;
    name: string;
    city: string;
}

const venues: Venue[] = [
    {
        id: 1,
        venue: 'the-chicago-theater',
        name: 'The Chicago Theater',
        city: 'Chicago',
    },
    {
        id: 2,
        venue: 'the-portland-theater',
        name: 'The Portland Theater',
        city: 'Portland',
    },
    {
        id: 3,
        venue: 'the-new-york-theater',
        name: 'The New York Theater',
        city: 'New York',
    },
    // More venue...
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Venue[]>
) {
    res.status(200).json(venues)
}
