export function getToken(){
    const vuexLocalStore = JSON.parse(localStorage.getItem('almacenweb'))
    const token = vuexLocalStore ? vuexLocalStore.almacenweb.auth.tokenAuth : ''
    return token;
}

export function getUser(){
    const vuexLocalStore = JSON.parse(localStorage.getItem('almacenweb'))
    const token = vuexLocalStore ? vuexLocalStore.almacenweb.auth.user : {}
    return token;
}
export function getUsers(){
    const vuexLocalStore = JSON.parse(localStorage.getItem('almacenweb'))
    const token = vuexLocalStore ? vuexLocalStore.almacenweb : {}
    return token;
}