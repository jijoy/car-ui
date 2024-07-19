
import axios from "axios";
import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export  async function GET(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')

    const carsResponse = await axios.get('http://localhost:8080/car',{headers:{Authorization: `Bearer ${token?.value}`}})
    console.log("carsResponse",carsResponse)
    return Response.json(carsResponse.data)
}