

export function useGetToken(){

    if(typeof window !== 'undefined'){
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('jwt='))
            ?.split('=')[1];
        console.log("JWT",cookieValue)
        return cookieValue;

    }else {
        return null;
    }
}