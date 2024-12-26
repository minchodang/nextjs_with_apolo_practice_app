import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

function allowCors(fn: {
    <HandlerReq extends NextApiRequest>(req: HandlerReq, res: NextApiResponse): Promise<unknown>;
    <HandlerReq extends NextRequest | Request>(req: HandlerReq, res?: undefined): Promise<Response>;
}) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Type, Authorization, X-Api-Version'
        );

        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        await fn(req, res);
    };
}

export default allowCors;
