import store from "@/store";

export default ( async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.state.auth.tokenAuth) {
        next();
      } else {
        next({ name: "login" });
      }
    } else {
      next();
    }
})