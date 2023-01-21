<template>
  <v-card elevation="0">
    <v-data-table
    :headers="headers"
    :items="datos.user"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>FCITEC</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                 
                   
      <UsersCardComponent
      ref="UsersCardComponent"
      :user-id.sync="useridc"
      />



              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-card>
    <!--<v-card
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
    </v-card>-->
</template>
<!--
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
</script>-->

<script>
import { mapActions, mapMutations} from 'vuex';
import UsersCardComponent from "@/components/users/UsersCardComponent";
  export default {
    components: {
    UsersCardComponent,
  },
    data: () => ({

      dialog: false,
        dialogDelete: false,
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'start',
            filterable: true,
            value: 'name',
          },
          {
            text: 'Correo',
            align: 'start',
            filterable: false,
            value: 'email',
          },
          {
            text: 'Rol',
            align: 'start',
            filterable: false,
            value: 'role',
          },
          {
            text: 'Autenticacion google',
            align: 'start',
            filterable: false,
            value: 'google',
          },
          {
            text: 'Acciones',
            align: 'start',
            filterable: false,
            value: 'actions',
          },
          
        ],
        datos: {},
        params:{limit: 10, skip: 0, page: 1, paget:1},

      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created(){
        console.log("assaweaeaweaea ",this.params.limit);
        this.cargar_datos();
      },

    methods: {

      ...mapActions('users',['lister']),
      ...mapMutations('users',['SET_USER_LIST']),
       async cargar_datos(){

           this.datos = await this.lister(this.params);
           console.log("DATOS ",this.datos);
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

       },

      initialize () {
        this.desserts = [
        ]
      },

      editItem (item) {
        this.editedIndex = 1
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
  