<template>
<div>


  
   <v-container>
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
      <v-text-field
        v-model="psw1"
        :rules="pswrules"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="psw2"
        :rules="pswrules"
        label="Password"
        required
      ></v-text-field>
      <v-autocomplete
        v-model="userView.role"
        :items="rol"
        :filter="customFilter"
        color="white"
        item-text="name"
        label="Role"
      ></v-autocomplete>
    </v-card-text>
   </v-container>
  </div>
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
    ifViewform: false,
    psw1:'',
    psw2:'',
    hasSaved:{'state': 'false', msg: ''} ,
    userView: {},
    iseliminated: null,
    isEditing: null,
    isagregated: true,
    model: null,
    boton: "",
    rol: [
      { name: "ADMIN", abbr: "ADMIN" },
      { name: "USER", abbr: "USER" },
    ],
    pswrules:[
     (v) => !!v || "Password is required",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  created() {},

  computed: {
    ...mapGetters("users", ["userList"])
  },
  methods: {
    ...mapActions("users", ["update_user","remove_user","add_user"]),
    usermodm(id) {
      console.log("USER LIST ", this.userList);
      this.isagregated=false,
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
    limpiar(){

    },
    agregate(){
      if(this.psw1===this.psw2){
        this.hasSaved.msg=  this.add_user({parm: this.userView, psw: this.psw1}).msg;
      }else{
        this.hasSaved.msg="password is bad",
        this.hasSaved.state=true;
      }
    },
    save() {

      if (this.iseliminated  && this.userView!=='') {
        this.hasSaved.msg=  this.remove_user(this.userView).msg;
      } if(this.isEditing && this.userView!==''){
         this.hasSaved.msg=  this.update_user(this.userView).msg;
        }
      console.log('todo cuadra y llama al metodo limpiar')
      this.limpiar(),
      this.hasSaved.state=true;

     /* if (this.iseliminated && this.userView!=='') {
          this.ismodificated=false,
          this.isEditing=false,
          this.remove_user(this.userView);
        }if(this.isEditing){
          this.iseliminated=false,
          this.ismodificated=false,

          this.update_user(this.userView);
      }else{
        if(this.ismodificated){
          this.iseliminated=false,
          this.isEditing=false,
          this.add_user(this.userView);
        }
      }*/

    },
  },
};
</script>