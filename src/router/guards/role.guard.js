import store from "@/store";
import { getUser } from "@/utils/utils";

export default ( async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth && record.meta.requiresAmin)) {
      if (store.state.auth.tokenAuth && getUser().role === 'ADMIN') {
        console.log('PASO POR EL GUARD DE ADMIN')
        next();
      } else {
        next({ name: "home" });
      }
    } else {
      next();
    }
})