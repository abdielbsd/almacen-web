
<template>
    <v-navigation-drawer
    color='primary'
  height='100%'
      dark
      absolute
      
    >
      <v-list flat>
      <v-list-item-group
        color="rgba(255, 255, 255, 0.5)"
      >
        <v-list-item
          v-for="item in datos.user"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-list>
      <v-footer
      absolute
       padless
      color='primary'
     >
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="max-width"
              @click="paginate">
            <v-pagination
              v-model="params.page"
              class="my-4"
              :length="params.paget"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
      </v-footer>
    </v-navigation-drawer>
</template>
<script>
import { mapActions} from 'vuex';
  export default {

    name: "UsersComponent",
    data: () => ({
         datos: '',
         params:{limit: 10, skip: 0, page: 1, paget:1}
    }),
    created(){
      console.log("assaweaeaweaea ",this.params.limit);
      this.cargar_datos();

    },
    methods: {
      ...mapActions('users',['lister']),
       async cargar_datos(){

           this.datos = await this.lister(this.params);
           if (this.datos.length<=10) {
             this.params.paget=1;

           } else {
           this.params.paget=Math. ceil(this.datos.length/10);
           }

       },
       paginate(){
            console.log("assaweaeaweaea ",this.params.page);
            this.params.skip=10*(this.params.page-1);
           this.cargar_datos();
       }
    },
  }
</script>