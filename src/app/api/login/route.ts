
import axios from "axios";
import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export  async function POST(request: Request) {
    const { email, password } = await request.json()
    console.log("email, password",email, password)
    const authResponse = await axios.post('http://localhost:8080/auth/login',{email,password})
    const token = authResponse.data.token;
    console.log("token",token)
    const cookieStore = cookies();
    cookieStore.set('jwt',token)
    return Response.json({token})
}