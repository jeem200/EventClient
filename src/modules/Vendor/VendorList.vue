<template>
  <v-container>
    <v-row>

      <v-col>
          <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                class="elevation-1"
          >

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
            
          </v-data-table>
      </v-col>    


    </v-row>


  </v-container>
</template>

<script>


  import axios from 'axios'
  export default {
    mounted:async function(){
       const res= await axios.get('https://localhost:44327/api/vendor');
       this.items=res.data
       console.log("WERERE",res)
    },

    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        headers:[
          {
            text: 'Vendor Name',
            align: 'start',
            
            value: 'vendorName',
          },
          { text: 'No Of Collab', value: 'noOfCollab' },
          { text: 'Address', value: 'address' },
          { text: 'Contact Number', value: 'contactNumber' },
          { text: 'Actions', value: 'actions', sortable: false },
       
        ],
        items:[],
        vendor:{
          VendorName:'Vendor Name',
          NoOfCollab:0,
          Capacity:0,
          ContactNumber:'',
          Address:'',
          serviceType: [],
        }
      }
    },
    methods:{
 
    }
  }
</script>
