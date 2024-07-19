

export function useGetToken(){

    const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith('jwt='))
        ?.split('=')[1];
    console.log("JWT",cookieValue)
    return cookieValue;
}