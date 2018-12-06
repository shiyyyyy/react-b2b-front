import Retail from './Retail';

import { NormalRegimentProduct } from "./NormalRegimentProduct";
import { ScatteredRoomProduct } from "./ScatteredRoomProduct";
import { ScatteredTicketProduct } from "./ScatteredTicketProduct";

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