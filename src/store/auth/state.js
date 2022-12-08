const vuexLocalStore = JSON.parse(localStorage.getItem('almacenweb'))
const token = vuexLocalStore ? vuexLocalStore.almacenweb.auth.tokenAuth : ''
export default {
  tokenAuth: token || '',
}