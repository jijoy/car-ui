"use client"
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import {Car} from "@lib/types";
import {useGetToken} from "@lib/hooks";
import {redirect} from "next/navigation";
import {Avatar, List} from "antd";
import React from "react";
import {useCookies} from "next-client-cookies";

export default function DashboardPage(){
    const cookies = useCookies();
    const token = cookies.get('jwt')
    if(!token){
        redirect('/login')
    }
    const cars = useQuery<AxiosResponse>({queryKey: ["cars"],
        queryFn: async ()=> {
            const carsResp = await axios.get('/api/car',{headers:{Authorization: `Bearer ${token}`}});
            return carsResp.data;
        }});
    console.log(cars.data)
    return (

    <List
        itemLayout="horizontal"


    >
        {cars.data?.map(car =>         <List.Item key={car.carId}>
                <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${car.carId}`} />}
                    title={<a href="https://ant.design">{car.modelName}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
        )}

        </List>
    )
}