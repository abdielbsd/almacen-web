<template>
    <v-card
    color='primary'
      dark
      justify='center'
      align-self="center"
    >
      <v-list flat 
      min-height="45rem"
      height='45rem'
      color='primary'>
      <v-list-item-group
        color="rgba(255, 255, 255, 0.5)"
      >
        <v-list-item
          v-for="item in datos.user"
          :key="item.uid"
          link
          @click="moduser(item.uid)"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-list>
      <v-footer
       padless
      color='primary'
     >
  <div class="text-center" justify="center">
    <v-container>
      <v-row justify="center">
        <v-col cols="2">
          <v-container class="max-width"
          justify="center"
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
    </v-card>
</template>
<script>
import { mapActions, mapMutations} from 'vuex';
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
      ...mapMutations('users',['SET_USER_LIST']),
       async cargar_datos(){

           this.datos = await this.lister(this.params);
           if (this.datos.length<=10) {
             this.params.paget=1;

           } else {
           this.params.paget=Math. ceil(this.datos.length/10);
           }

           this.SET_USER_LIST(this.datos.user)

       },
       paginate(){
           // console.log("assaweaeaweaea ",this.params.page);
            this.params.skip=10*(this.params.page-1);
           this.cargar_datos();
       },
       moduser(id){
        console.log(('id:---'+id))
        this.$emit('user-id',id);

       }
    },
  }
</script>