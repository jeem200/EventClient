<template>
  <v-row justify="center">
<!--   
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar> -->


   
        <v-container>
            <v-row>

                <v-col>
                   <v-select
                       
                        :items="Vendors"
                        item-text="vendorName"
                        item-value="id"
                        label="Select Vendors"
                        v-model="selectedVendorId"
                      
                        outlined
                    >
                    </v-select>
                </v-col>
                <v-col>     
                    
                    <v-select
                       
                        :items="items"
                        item-text="text"
                        item-value="value"
                        label="Select Aspect"
                        v-model="serviceDetails.ItemType"
                      
                        outlined
                    >
                    
                    </v-select>
                </v-col>    
           

            </v-row>

            <v-row>

                <v-col>
                    <v-text-field
                        label="Item Name"
                        value="Item Name"
                        v-model="serviceDetails.ItemName"
                        outlined
                    >
                    </v-text-field>
                </v-col>    
                <v-col>
                    <v-text-field
                        label="Item Price"
                        value="0"
                        v-model="serviceDetails.ItemPrice"
                        outlined
                    >
                    </v-text-field>
                </v-col>

            </v-row>
  
            <v-row>
              <template v-if="serviceDetails.ItemType=='food'">
                <v-col>
                    <v-text-field
                        label="Min Guest"
                        value="0"
                        v-model="serviceDetails.MinGuest"
                        outlined
                    >
                    </v-text-field>
                </v-col>    
                <v-col>
                    <v-text-field
                        label="Max Guest"
                        value="0"
                        v-model="serviceDetails.MaxGuest"
                        outlined
                    >
                    </v-text-field>
                </v-col>
              </template>
              <template v-if="serviceDetails.ItemType=='venue'">
                  <v-col>
                    <v-text-field
                        label="Capacity"
                        value="0"
                        v-model="serviceDetails.Capacity"
                        outlined
                    >
                    </v-text-field>
                  </v-col>
              </template>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                    v-model="files"
                  
                    counter
                    label="File input"
                    multiple
                    placeholder=""
                    prepend-icon="mdi-paperclip"
                    outlined
                    :show-size="1000"
                    @change="onFileSelected"
                >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
              </v-col>
            </v-row>
            <v-row>

                <v-col>
                    <v-textarea
                        outlined
                        v-model="serviceDetails.ItemDescription"
                      
                        label="Description"
                        value=""
                    >
                    </v-textarea>
                </v-col>    
           

            </v-row>
            <v-row>
              <v-btn
                dark
                color="primary"
                text
                @click="save"
              >
                    Save
              </v-btn>
          
            </v-row>
            <v-row>
              {{selectedVendor}}
            </v-row>

        </v-container>
<!-- 
      </v-card> -->
    
  </v-row>
</template>

<script>
 import axios from 'axios'
  export default {
    props:['count'],
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        items:[{ text:'Food',value:'food'},
               { text:'Decoration',value:'decoration'},
               { text:'Venue',value:'venue' },
               { text:'Photography',value:'photography'}
              ],
        files: [],
        selectedVendorId:'',
        
        serviceDetails:{
          
          ItemName:'Item Name',
          ItemType:'Select Aspect',
          ItemPrice:0,
          MinGuest:0,
          MaxGuest:0,
          ItemDescription:'Description',
          Capacity:0,
          MediaLocation:[]
        },
        Vendors:[]
      }
    },
    mounted:async function(){
      const vendorList = await axios.get('https://localhost:44327/api/vendor')
      this.Vendors=vendorList.data;
      console.log(this.Vendors)
    },
    methods:{
        close:function(){
            this.$emit("close")
        },
        save:async function(){

          this.serviceDetails.ItemCode=this.generateCode
          let item={
            
            ItemCode:this.serviceDetails.ItemCode,
            ItemName:this.serviceDetails.ItemName,
            ItemType:this.serviceDetails.ItemType,
            ItemPrice:parseInt(this.serviceDetails.ItemPrice),
            MinGuest:parseInt(this.serviceDetails.MinGuest),
            MaxGuest:parseInt(this.serviceDetails.MaxGuest),
            ItemDescription:this.serviceDetails.ItemDescription,
            Capacity:parseInt(this.serviceDetails.Capacity),
            MediaLocation:this.serviceDetails.MediaLocation
          }
          // axios.put
          this.selectedVendor.serviceType.push(item)
          console.log("ITEM",item)
          const res= await axios.patch('https://localhost:44327/api/vendor', this.selectedVendor);
        console.log("RESPONSE",res)
          //this.$emit("save",this.selectedVendor)
        },
        onFileSelected: function (event) {
            console.log("WWWWWW", event)
            const selectedFiles = event
            selectedFiles.forEach(element => {
              let reader = new FileReader()
              reader.readAsDataURL(element)
              reader.onload = e => {
                console.log("R", e.target.result)
                this.serviceDetails.MediaLocation.push( e.target.result) 
              }
  
            });
                              
        }
      
    },
    computed:{
        generateCode:function(){
            const nameInitial=this.serviceDetails.ItemName.charAt(0).toUpperCase();
            const typeInitial=this.serviceDetails.ItemType.charAt(0).toUpperCase();
            return typeInitial+nameInitial+this.count;
        },
        selectedVendor:function(){
          return this.Vendors.find(e=>e.id==this.selectedVendorId)||{}
        },

    }
  }
</script>

// .AddJsonOptions(options => {
//     options.SerializerSettings.MaxDepth = 64;  // or however deep you need
// })