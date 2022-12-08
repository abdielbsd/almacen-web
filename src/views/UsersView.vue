<template>
<div>
  <v-row>
    <v-col cols="3" >
      <v-container>
     <UsersComponent
     @user-id="handleruserId"
     />
      </v-container>
    </v-col>
    <v-col cols="8">
      <v-container>
      <UsersCardComponent
      ref="UsersCardComponent"
      :user-id.sync="useridc"
      />

      </v-container>
    </v-col>
  </v-row>
</div>
</template>

<script>
import UsersComponent from "@/components/users/UsersComponent";
import UsersCardComponent from "@/components/users/UsersCardComponent";

export default {
  //name: 'Home',

  components: {
    UsersComponent,
    UsersCardComponent,
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
