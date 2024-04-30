<template>  
<div class="container mt-4">
  <div class="card" v-if="!currentLayanan">
    <div class="card-header">
      <h4>Pilih layanan yang akan dihapus</h4>
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
            <button @click="deleteLayanan" :disabled="!isAdmin" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Toast } from "bootstrap";
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
        currentPage: 1, // Track the current page
        totalPages: 1 // Track the total pages
      };
    },
    created() {
      this.loadAllLayanans();
    },
    computed: {
    isAdmin() {
      const authStore = useAuthStore();
      return authStore.user && authStore.user.roles[1] === "ROLE_ADMIN";
    }
  },
    methods: {
      async loadAllLayanans() {
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
  
        LayananDataService.update(this.currentLayanan.id, data)
          .then(response => {
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      async deleteLayanan() {
        const toast = useToast();
        try {
          await LayananDataService.delete(this.currentLayanan.id);
          this.layanans = this.layanans.filter(layanan => layanan.id !== this.currentLayanan.id);
          this.currentLayanan = null;
          this.submitted = false;
          toast.success('You deleted successfully!');
        } catch (e) {
          console.log(e);
          toast.error(e);
        }
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
    max-width: 800px;
    margin: auto;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .submit-form {
    margin-top: 20px;
  }
  </style>
  