<template>
<div>
  <v-row>
    <v-col cols="3" >
     <UsersComponent/>
    </v-col>
    <v-col cols="9" >
      <UsersCardComponent/>
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
};
</script>
