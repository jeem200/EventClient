<template>
  <v-container>
    <v-row>
        <v-col v-for="(item,i) in serviceArray" :key="i">
           <ServiceCard :item="item" />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import ServiceCard from './ServiceCard'
  export default {
    props:['count'],
    components:{ ServiceCard },
    data () {
      return {
     
        show: false,
        Services:[]
      }
    },
    mounted:async function(){
      const serviceList = await axios.get('https://localhost:44327/api/vendor')
      this.Services=serviceList.data;
      console.log(this.Services.map(e=>e.serviceType).flat())
 
 
     
      
    },
    methods:{
       
      
    },
    computed:{
        serviceArray:function(){
          return this.Services.map(e=>e.serviceType).flat()
        },
        

    }
  }
</script>

// .AddJsonOptions(options => {
//     options.SerializerSettings.MaxDepth = 64;  // or however deep you need
// })