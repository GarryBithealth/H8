<template>
  <div class="container mt-4">
    <div class="card" v-if="!currentLayanan">
      <div class="card-header">
        <h4>Pilih layanan yang akan diedit</h4>
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li 
            v-for="layanan in layanans" 
            :key="layanan.id" 
            @click="selectLayanan(layanan)" 
            class="list-group-item list-group-item-action"
            style="cursor: pointer;"
          >
            {{ layanan.title }}
          </li>
        </ul>
      </div>
    </div>
  
      <div v-else class="submit-form">
        <div v-if="!submitted">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="currentLayanan.title"
              name="title"
            />
          </div>
  
          <div class="form-group">
            <label for="description">Description</label>
            <input
              class="form-control"
              id="description"
              required
              v-model="currentLayanan.description"
              name="description"
            />
          </div>
  
          <div class="form-group">
            <label for="jenis">Jenis</label>
            <input
              class="form-control"
              id="jenis"
              required
              v-model="currentLayanan.jenis"
              name="jenis"
            />
          </div>
  
          <div class="form-group">
            <label for="linkImg">Link Image</label>
            <input
              class="form-control"
              id="linkImg"
              required
              v-model="currentLayanan.linkImg"
              name="linkImg"
            />
          </div>
  
          <div class="form-group">
            <label for="alamat">Alamat</label>
            <input
              class="form-control"
              id="alamat"
              required
              v-model="currentLayanan.alamat"
              name="alamat"
            />
          </div>
  
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              class="form-control"
              id="phone"
              required
              v-model="currentLayanan.phone"
              name="phone"
            />
          </div>
  
          <button @click="saveLayanan" :disabled="!isAdmin" class="btn btn-success">Submit</button>

        </div>
  
        <div v-else>
          <button class="btn btn-success" @click="newLayanan">Add New</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LayananDataService from "../services/LayananDataservice";
  import { useAuthStore } from "../store/auth.module";
  import { useToast } from 'vue-toastification';
  export default {
    name: "edit-layanan",
    data() {
      return {
        layanans: [], // To hold the list of Layanans
        currentLayanan: null, // To hold the selected Layanan
        submitted: false,
        currentPage:1,
        totalPages:1,
        message:''
      };
    },
    created() {
      this.loadLayanans();
    },
    computed: {
    isAdmin() {
      const authStore = useAuthStore();
      return authStore.user && authStore.user.roles[1] === "ROLE_ADMIN";
    }
  },
    methods: {
        async loadLayanans() {
      try {
        while (this.currentPage <= this.totalPages) {
          const response = await LayananDataService.paginated(this.currentPage);
          this.layanans.push(...response.data.services); // Spread operator to merge arrays
          this.totalPages = response.data.totalPages;
          this.currentPage++;
        }
      } catch (e) {
        console.log(e);
      }
    },
      selectLayanan(layanan) {
        this.currentLayanan = layanan;
        this.submitted = false;
      },
      saveLayanan() {
        var data = {
          title: this.currentLayanan.title,
          description: this.currentLayanan.description,
          jenis: this.currentLayanan.jenis,
          linkImg: this.currentLayanan.linkImg,
          alamat: this.currentLayanan.alamat,
          phone: this.currentLayanan.phone
        };
        const toast = useToast();
        console.log(this.currentLayanan.id)
        LayananDataService.update(this.currentLayanan.id, data)
          .then(response => {
            console.log(response.data);
            this.submitted = true;
            toast.success('You submitted successfully!');
          })
          .catch(e => {
            console.log(e.message);
            toast.error(e.message);
          });
      },
      newLayanan() {
        this.currentLayanan = null;
        this.submitted = false;
      }
    }
  };
  </script>
  
  <style>
  .edit-layanan {
    max-width: 600px;
    margin: auto;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    cursor: pointer;
  }
  .submit-form {
    margin-top: 20px;
  }
  </style>
  