<template>
  <v-container fluid fill-height>
    <v-row class="text-center grey lighten-5" no-gutters justify="center">
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
            :rules="passwordRules" 
            label="Password"
            required
            outlined
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
  </v-container>
</template> 
  
<script>
import { mapActions} from 'vuex';

export default {
  name: "LoginComponenet",

  data: () => ({
    valid: false,
    password: "",
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

  methods: {
    ...mapActions('auth', ['login']),
   async validateAndSubmit() {
        if(this.$refs.form.validate()){
            let params = {
                email: this.email,
                password: this.password
            }
            
           const res = await this.login(params)
           console.log(res, ' ENV ',process.env)
        }
    },
    reset() {
        this.$refs.form.reset();
    },
  },
};
</script>
  