"use client"
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function LogoutPage (){

    const mutation = useMutation({
        mutationFn: (value: FieldType) => {
            return axios.post('/auth/logout', value)
        },
    })
}