import api from "./api";

export default async function fetchAll() {
    return api.get("all");
}

// export const fetchCartridgesList = async () => {
//     const cartridges = await api.get("cartridges/");
//     // console.log("fetchCartridgesList:", cartridges);
//     // return cartridges.data;
//     return (await api.get("cartridges/")).data;
// };

// export const fetchOrders = async () => {
//     const orders = await api.get("orders/");
//     // console.log("fetchSupplies:", orders);
//     return orders.data;
// };
