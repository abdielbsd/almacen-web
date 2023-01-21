<template>
<div>
  <v-row>
    <v-col xs='12'>
      <v-container>
     <UsersComponent
     @user-id="handleruserId"
     />
      </v-container>
    </v-col>
    <!--<v-col xs='6' sm='7' md="8" lg='9' xl='2' >
      <v-container>
      <UsersCardComponent
      ref="UsersCardComponent"
      :user-id.sync="useridc"
      />

      </v-container>
    </v-col>-->
  </v-row>
</div>
</template>

<script>
import UsersComponent from "@/components/users/UsersComponent.vue";
//import UsersCardComponent from "@/components/users/UsersCardComponent";

export default {
  //name: 'Home',

  components: {
    UsersComponent,
    //UsersCardComponent,
  },
      data: () => ({
         userid:'',
    }),

    computed:{
      useridc(){
        return this.userid;
      }
    },
 
  methods:{
    handleruserId(id){
      this.$refs.UsersCardComponent.usermodm(id);
    }
  }
};
</script>
