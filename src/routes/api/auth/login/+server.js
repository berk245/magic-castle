import { json } from '@sveltejs/kit';

export function POST(requestEvent){
    console.log(requestEvent);
    return json({'access-token': 'To be implemented'})
}