/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import BriefCard from "../../components/dashboard/BriefCard";
import OrderTable, { Order } from "@/components/orders/OrderTable";
import ApiClient from "@/components/ApiClient";
import { toast } from "react-toastify";
const Orders: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const response = await ApiClient.get("/order");
                if (response.status === 200) {
                    setOrders(response.data);
                }
            } catch (error: any) {
                toast(error?.response?.data?.message || "Error fetching orders", { type: "error" });
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const data = [
        { title: "Total Orders", content: orders.length },
        { title: "Pending Orders", content: orders.filter((order) => order.status === "pending").length },
        { title: "Fulfilled Orders", content: orders.filter((order) => order.status === "fulfilled").length },
    ];

    // const OrderData: Order[] = [
    //     {
    //         id: "m5gr84i9",
    //         amount: 316,
    //         status: "fulfilled",
    //         email: "ken99@example.com",
    //         address: "1, Moronfolu Street, Pako",
    //         order: ["shoes", "pen", "bag", "book", "plate"],
    //     },
    //     {
    //         id: "3u1reuv4",
    //         amount: 242,
    //         status: "fulfilled",
    //         email: "Abe45@example.com",
    //         address: "18, Alara Street, Sabo-Onike",
    //         order: ["belt", "cup", "plate"],
    //     },
    //     {
    //         id: "derv1ws0",
    //         amount: 837,
    //         status: "pending",
    //         email: "Monserrat44@example.com",
    //         address: "2, Tunji Oluwole Street, Fola-Agoro",
    //         order: ["shoes", "pen", "bag", "book", "plate"],
    //     },
    //     {
    //         id: "5kma53ae",
    //         amount: 874,
    //         status: "fulfilled",
    //         email: "Silas22@example.com",
    //         address: "University of Lagos",
    //         order: ["shoes", "pen", "bag", "book", "plate"],
    //     },
    //     {
    //         id: "bhqecj4p",
    //         amount: 721,
    //         status: "pending",
    //         email: "carmella@example.com",
    //         address: "Jaja Hostel, UNILAG",
    //         order: ["shoes", "pen", "bag", "book", "plate"],
    //     },
    // ];

    return (
        <div>
            <p className="mb-5">You have new orders!</p>
            <div className="flex flex-wrap gap-y-3 -mx-1 mb-3">
                {data.map((item, index) => (
                    <div key={index} className="w-full px-3 lg:w-1/3">
                        <BriefCard title={item.title} content={item.content} />
                    </div>
                ))}
            </div>

            <OrderTable data={orders} isLoading={isLoading} />
        </div>
    );
};

export default Orders;
