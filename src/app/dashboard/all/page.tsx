"use client"

import {Table, TableColumnsType} from 'antd';
import {useCookies} from "next-client-cookies";
import {redirect} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";



interface DataType {
    key: React.Key;
    modelName: string;
    seating: number;
    image: string;
    carId: number
}

export default function AllCarsPage(){
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'modelName',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Seating',
            dataIndex: 'seating',
        },
        {
            title: 'Image',
            dataIndex: 'image',
        },
    ];

    const cookies = useCookies();
    const token = cookies.get('jwt')
    if(!token){
        redirect('/login')
    }
    const cars = useQuery({queryKey: ["cars"],
        queryFn: async ()=> {
            const carsResp = await axios.get('/api/car',{headers:{Authorization: `Bearer ${token}`}});
            return carsResp.data;
        }});
    console.log(cars.data)
    return (
        <Table

            columns={columns}
            dataSource={cars.data}
        />
    )
}