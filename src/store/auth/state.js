const vuexLocalStore = JSON.parse(localStorage.getItem('almacen-web'))
const token = vuexLocalStore ? vuexLocalStore.auth.tokenAuth : ''
export default {
  tokenAuth: token || '',
}