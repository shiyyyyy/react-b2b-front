import Retail from './retail/Retail';

import { NormalRegimentProduct } from "./retail/NormalRegimentProduct";
import { ScatteredRoomProduct } from "./retail/ScatteredRoomProduct";
import { ScatteredTicketProduct } from "./retail/ScatteredTicketProduct";

export default [
    {
        path: '/retail',
        component: Retail,
    },
    {
        path: '/normalRegimentProduct',
        component: NormalRegimentProduct
    },
    {
        path: '/scatteredRoomProduct',
        component: ScatteredRoomProduct
    },
    {
        path: '/scatteredTicketProduct',
        component: ScatteredTicketProduct
    }
];