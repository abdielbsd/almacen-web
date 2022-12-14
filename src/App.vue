<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../src/assets/logo.svg"
          transition="scale-transition"
          width="40"
        />
        <v-btn class="ma-2" to="/" text>
          <span >Home</span>
        </v-btn>
        <v-btn class="ma-2" v-if="viewRoute" to="users" text>
          <span >Adm User</span>
        </v-btn>
        <v-btn class="ma-2" to="about" text>
          <span >About</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn to="login" text>
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { getUser } from "./utils/utils";

export default {
  name: "App",

  data: () => ({}),
  created() {},

  computed: {
    viewRoute() {
      try {
        if (this.$route.path && getUser().role === "ADMIN") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("ERROR IN PARSE USER JSON");
        return false;
      }
    },
  },
};
</script>
