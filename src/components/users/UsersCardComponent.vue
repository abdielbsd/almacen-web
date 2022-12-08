<template>
  <v-card class="overflow-hidden" color="primary lighten-1" dark>
    <v-toolbar flat color="primary">
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        User Profile
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing, iseliminated = false">
        <v-icon v-if="isEditing"> mdi-close </v-icon>
        <v-icon v-else> mdi-pencil </v-icon>
      </v-btn>
      <v-btn
        color="red darken-3"
        fab
        small
        @click="iseliminated = !iseliminated, isEditing=false"
      >
        <v-icon v-if="iseliminated && this.userView !==null "> mdi-close </v-icon>
        <v-icon v-else> mdi-delete </v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        v-model="userView.name"
        color="white"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="userView.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-autocomplete
        v-model="userView.role"
        :items="rol"
        :filter="customFilter"
        color="white"
        item-text="name"
        label="State"
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        @click="save"
      >
        {{  control }}
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
      Your profile has been updated
    </v-snackbar>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UsersCardComponent",
  props: {
    userId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    hasSaved: false,
    userView: {},
    iseliminated: null,
    isEditing: null,
    model: null,
    boton: "",
    rol: [
      { name: "ADMIN", abbr: "ADMIN" },
      { name: "USER", abbr: "USER" },
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  created() {},

  computed: {
    ...mapGetters("users", ["userList"]),
    control() {
      if (this.iseliminated) {
        return "Delete";
      } if(this.isEditing){
        return "Edit";

        }else { 
         return "add";
      }
    },
  },
  methods: {
    ...mapActions("users", ["update_user","remove_user","add_user"]),
    usermodm(id) {
      console.log("USER LIST ", this.userList);
      this.userList.forEach((element) => {
        if (element.uid === id) {
          this.userView = element;
        }
      });
      console.log("USER VIEW ", this.userView);
    },

    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      if (this.iseliminated && this.userView!=='') {
          this.remove_user(this.userView);
        }if(this.isEditing){
          this.update_user(this.userView);
      }else{
          this.add_user(this.userView);
      }

    },
  },
};
</script>