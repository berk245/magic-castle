import { json } from '@sveltejs/kit';

export async function POST(requestEvent){
    const {request} = requestEvent

    const body = await request.json()

    // To-do: parse req body and make db query
    return json({result: 'Request received successfully. Signup methods will be implemented soon.'}, {status: 200})
}