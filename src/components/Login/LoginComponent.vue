<template>
  <v-container fluid fill-height>
    <v-row class="text-center" no-gutters justify="center">
      <v-col cols="6" align-self="center">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="passwordIcon ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordIcon ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            required
            outlined
            @click:append="(passwordIcon = !passwordIcon)"
          ></v-text-field>

          <v-btn color="error" class="mr-4" @click="reset">Reset Form </v-btn>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validateAndSubmit"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row> 
    <v-snackbar v-model="snackbar" :timeout="2000" :multi-line="true" color="red darken-1">
      {{ snackbar_msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template> 
  
<script>
import { mapActions, /*mapGetters,*/ mapMutations } from "vuex";
export default {
  name: "LoginComponenet",

  data: () => ({
    snackbar: false,
    snackbar_msg: "",
    valid: false,
    password: "",
    passwordIcon:false,
    passwordRules: [
      (v) => !!v || "Password is required",
      //(v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  /*computed: {
    ...mapGetters("auth", ["tokenAuth"]),
  },*/

  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("auth", ["SET_TOKEN_AUTH", 'SET_USER_AUTH']),
    async validateAndSubmit() {
      if (this.$refs.form.validate()) {
        let params = {
          email: this.email,
          password: this.password,
        };

        const res = await this.login(params);
        if (res.status === 200) {
          if (typeof Storage !== "undefined") {
            // LocalStorage disponible
            localStorage.setItem(
              "almacenweb",
              JSON.stringify({
                almacenweb: {
                  auth: {
                    tokenAuth: res.token,
                    user: res.user
                  },
                },
              })
            );
          }
          this.SET_TOKEN_AUTH(res.token);
          this.SET_USER_AUTH(res.user)
          this.$router.push({ name: "home" });
        } else {
          //console.log("ERROR AUTENTICACION");
          this.snackbar_msg = "Usuario o contraseña incorrectos";
          this.snackbar = true;
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
  