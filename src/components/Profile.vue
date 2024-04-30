<!-- <template>
  <div class="container-md">
    <header class="jumbotron mt-4">
      <h2>Profile</h2>
      <h3>
        <strong>{{ currentUser.username }}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <div class="jumbotron mt-4" style="background-color:cornflowerblue;">
      <h3 class="text-hist ml-2"><strong> History </strong></h3>
      <div class="container-lg mt-4">
        <div class="list row d-flex flex-wrap wrap mw-100">
          <div class="col-md-4" v-for="(currentHistory, index) in ulasanshist" :key="index">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Ulasan {{ index + 1 }}</h5>
                <p v-if="currentHistory.layanan" class="card-text">Layanan: {{ currentHistory.layanan.title }}</p>
                <p class="card-text">Rating: {{ currentHistory.rating }}</p>
                <p class="card-text">Ulasan: {{ currentHistory.ulasan }}</p>
                <button class="button is-info" @click="showEditModal(currentHistory)">Edit</button>
                <button class="button is-danger" @click="showDeleteModal(currentHistory.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showDeleteModalFlag" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm Delete</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <p>Are you sure you want to delete this review?</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="confirmDelete">Delete</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>

  <div v-if="showEditModalFlag" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Review</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">New Review Text</label>
          <div class="control">
            <textarea class="textarea" v-model="newUlasanText"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">New Rating</label>
          <div class="control">
            <input class="input" type="number" v-model="newUlasanRating" min="1" max="5"/>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="confirmEdit">Save changes</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth.module';
import { useUlasanStore } from '@/store/ulasanstore';
import { mapStores } from 'pinia';

export default {
  name: 'Profile',
  data() {
    return {
      showDeleteModalFlag: false,
      showEditModalFlag: false,
      ulasanToDelete: null,
      ulasanToEdit: null,
      newUlasanText: '',
      newUlasanRating: 0,
    };
  },
  computed: {
    ...mapStores(useAuthStore, useUlasanStore),
    currentUser() {
      const authStore = useAuthStore();
      return authStore.user;
    },
    ulasanshist() {
      const ulasanStore = useUlasanStore();
      return ulasanStore.ulasanshist;
    },
  },
  methods: {
    async getHistory() {
      const authStore = useAuthStore();
      if (authStore.user) {
        await this.ulasanStore.historyUlasan(authStore.user.id);
      }
    },
    showDeleteModal(ulasanId) {
      this.ulasanToDelete = ulasanId;
      this.showDeleteModalFlag = true;
    },
    closeModal() {
      this.showDeleteModalFlag = false;
      this.showEditModalFlag = false;
      this.ulasanToDelete = null;
      this.ulasanToEdit = null;
      this.newUlasanText = '';
      this.newUlasanRating = 0;
    },
    async confirmDelete() {
      if (this.ulasanToDelete) {
        await this.ulasanStore.deleteUlasan(this.authStore.user.id, this.ulasanshist.layanan.id);
        this.showToast(this.ulasanStore.message, this.ulasanStore.error);
        this.closeModal();
        this.getHistory();
      }
    },
    showEditModal(ulasanshist) {
      this.ulasanToEdit = ulasanshist.id;
      this.newUlasanText = ulasanshist.ulasan;
      this.newUlasanRating = ulasanshist.rating;
      this.showEditModalFlag = true;
    },
    async confirmEdit() {
      if (this.ulasanToEdit) {
        const updatedUlasan = {
          ulasan: this.newUlasanText,
          rating: this.newUlasanRating,
        };
        await this.ulasanStore.updateUlasan(this.ulasanshist.layanan.id, updatedUlasan);
        this.showToast(this.ulasanStore.message, this.ulasanStore.error);
        this.closeModal();
        this.getHistory(); // Refresh the history list
      }
    },
    async updateUlasan() {
      if (!this.newUlasanText || this.newUlasanRating === 0) {
        return;
      }
      const data = {
        userId: this.authStore.user.id,
        ulasan: this.newUlasanText,
        rating: this.newUlasanRating,
      };
      await this.ulasanStore.updateUlasan(route.params.id, data);
      showToast(this.ulasanStore.message, this.ulasanStore.error);
    },
    showToast(message, isError) {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: isError ? "linear-gradient(to right, #ff5f6d, #ffc371)" : "linear-gradient(to right, #8e7cc3, #96c93d)",
      }).showToast();
    },
  },
  mounted() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      this.$router.push('/login');
    } else {
      this.getHistory();
    }
  },
};
</script> -->


<template>
  <div class="container-md">
    <header class="jumbotron mt-4">
      <h2>Profile</h2>
      <h3>
        <strong>{{ currentUser.username }}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <div class="jumbotron mt-4" style="background-color:cornflowerblue;">
      <h3 class="text-hist ml-2"><strong> History </strong></h3>
      <div class="container-lg mt-4">
        <div class="list row d-flex flex-wrap wrap mw-100">
          <div class="col-md-4" v-for="(currentHistory, index) in ulasanshist" :key="index">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Ulasan {{ index + 1 }}</h5>
                <p v-if="currentHistory.layanan" class="card-text">Layanan: {{ currentHistory.layanan.title }}</p>
                <p class="card-text">Rating: {{ currentHistory.rating }}</p>
                <p class="card-text">Ulasan: {{ currentHistory.ulasan }}</p>
                <button class="btn btn-info mr-1" @click="showEditModal(currentHistory)">Edit</button>
                <button class="btn btn-danger" @click="showDeleteModal(currentHistory)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModalFlag" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Delete</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this review?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModalFlag" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Review</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="newUlasanText">New Review Text</label>
            <textarea id="newUlasanText" class="form-control" v-model="newUlasanText"></textarea>
          </div>
          <div class="form-group">
            <label for="newUlasanRating">New Rating</label>
            <input id="newUlasanRating" class="form-control" type="number" v-model="newUlasanRating" min="1" max="5"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="confirmEdit">Save changes</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth.module';
import { useUlasanStore } from '@/store/ulasanstore';
import { mapStores } from 'pinia';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default {
  name: 'Profile',
  data() {
    return {
      showDeleteModalFlag: false,
      showEditModalFlag: false,
      ulasanToDelete: null,
      ulasanToEdit: null,
      newUlasanText: '',
      newUlasanRating: 0,
    };
  },
  computed: {
    ...mapStores(useAuthStore, useUlasanStore),
    currentUser() {
      const authStore = useAuthStore();
      return authStore.user;
    },
    ulasanshist() {
      const ulasanStore = useUlasanStore();
      return ulasanStore.ulasanshist;
    },
  },
  methods: {
    async getHistory() {
      const authStore = useAuthStore();
      if (authStore.user) {
        await this.ulasanStore.historyUlasan(authStore.user.id);
      }
    },
    showDeleteModal(currentHistory) {
      this.ulasanToDelete = currentHistory.layanan.id;
      this.showDeleteModalFlag = true;
      console.log(this.authStore.user.id)
      console.log(this.ulasanToDelete)
    },
    showEditModal(currentHistory) {
      this.ulasanToEdit = currentHistory.layanan.id;
      this.newUlasanText = currentHistory.ulasan;
      this.newUlasanRating = currentHistory.rating;
      this.showEditModalFlag = true;
      
    },
    closeModal() {
      this.showDeleteModalFlag = false;
      this.showEditModalFlag = false;
      this.ulasanToDelete = null;
      this.ulasanToEdit = null;
      this.newUlasanText = '';
      this.newUlasanRating = 0;
    },
    async confirmDelete() {
      if (this.ulasanToDelete) {
        await this.ulasanStore.deleteUlasan(this.authStore.user.id,this.ulasanToDelete);
        this.showToast(this.ulasanStore.message, this.ulasanStore.error);
        this.closeModal();
        this.getHistory(); // Refresh the history list
      }
    },
    async confirmEdit() {
      if (this.ulasanToEdit) {
        const updatedUlasan = {
          userId: this.currentUser.id,
          ulasan: this.newUlasanText,
          rating: this.newUlasanRating,
        };
        await this.ulasanStore.updateUlasan(this.ulasanToEdit, updatedUlasan);
        this.showToast(this.ulasanStore.message, this.ulasanStore.error);
        this.closeModal();
        this.getHistory(); // Refresh the history list
      }
    },
    showToast(message, isError) {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: isError ? "linear-gradient(to right, #ff5f6d, #ffc371)" : "linear-gradient(to right, #8e7cc3, #96c93d)",
      }).showToast();
    },
  },
  mounted() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      this.$router.push('/login');
    } else {
      this.getHistory();
    }
  },
};
</script>