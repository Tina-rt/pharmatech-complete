export const useConstants = () => {
    const ORDER_STATUS = [
        { id: 1, name: "En attente" },
        { id: 2, name: "En cours de préparation" },
        { id: 3, name: "Expédiée" },
        { id: 4, name: "Livrée" },
    ];
    return {
        ORDER_STATUS
    };
};
