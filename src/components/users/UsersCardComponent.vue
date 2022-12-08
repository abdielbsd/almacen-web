
<script>
import { mapActions} from 'vuex';
  export default {

    name: "UsersComponent",
    data: () => ({
         datos: '',
         params:{limit: 10, skip: 0, page: 1, paget:1}
    }),
    created(){
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
           // console.log("assaweaeaweaea ",this.params.page);
            this.params.skip=10*(this.params.page-1);
           this.cargar_datos();
       }
    },
  }
</script>