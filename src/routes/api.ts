import { IRoute, RouteMethods } from '@interfaces/common';

export default (): IRoute[] => [
    {
        path: '/',
        method: RouteMethods.GET,
        handle: ({ res }) => res.json({ timestamp: Date.now().toString() }),
    },
];
