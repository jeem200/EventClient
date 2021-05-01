<template>
    
        <v-card
            class="mx-auto"
            max-width="400"
        >
                <v-carousel>
                    <v-carousel-item v-for="(idx,i) in item.mediaLocation" :key="i">
                        <v-img contain :src="idx"></v-img>
                    </v-carousel-item>
                </v-carousel>

            <v-card-subtitle class="pb-0">
                {{item.itemName}}
            </v-card-subtitle>

            <v-card-text class="text--primary">
            <div>{{item.itemType}}</div>

            <div>{{item.itemPrice}}</div>
            </v-card-text>

    
        </v-card>
    
</template>
<script>


export default {
   props:['item'],
    data () {
      return {
  
      }
    },
    mounted:async function(){
    //   const vendorList = await axios.get('https://localhost:44327/api/vendor')
    //   this.Vendors=vendorList.data;
    //   console.log(this.Vendors)
    },
    methods:{
        close:function(){
            this.$emit("close")
        },

      
    },
}
</script>
