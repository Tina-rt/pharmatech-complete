import { type OrderItem } from "~/types/orderItem.models";
import { produitsMedicaux } from "./produits.mock";
export const orders: OrderItem[] = [
    {
        id: 1,
        date: "2021-09-01",
        status: 1,
        total: 100,
        cartItems:[
            {
                quantity: 2,
                produits: produitsMedicaux[0]
            },
            {
                quantity: 1,
                produits: produitsMedicaux[1]
            }
        ]
    },
    {
        id: 2,
        date: "2021-09-02",
        status: 2,
        total: 150,
        cartItems: [
            {
                quantity: 3,
                produits: produitsMedicaux[2]
            },
            {
                quantity: 1,
                produits: produitsMedicaux[3]
            }
        ]
    }
];