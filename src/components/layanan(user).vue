<template>
  <div id="background" class="col-md-12 mw-100">
    <img src="../assets/testbg.jpeg" alt="" style="align-items: center; max-width: 100%;">
  </div>
  <div v-if="currentLayanan" style="margin: 30px;">
    <h4>Layanan {{ currentLayanan.id }}</h4>
    <img :src="currentLayanan.linkImg" alt="poto" class="photos" style="height: 200px; width: 200px; display: flex; align-items: center">
  </div>
  <div v-if="currentLayanan" class="edit-form" style="margin: 30px;">
    <form class="container-fluid-xl">
      <div class="list row mt-3 ml-0 mb-2 mw-100">
        <div class="col-lg-4">
          <div class="form-group">
            <label for="title"><strong>Title:</strong></label>
            <p>{{ currentLayanan.title }}</p>
          </div>
          <div class="form-group">
            <label for="description"><strong>Description:</strong></label>
            <p>{{ currentLayanan.description }}</p>
          </div>
          <div class="form-group">
            <label for="alamat"><strong>Alamat:</strong></label>
            <p>{{ currentLayanan.alamat }}</p>
          </div>
          <div class="form-group">
            <label for="Phone"><strong>Phone:</strong></label>
            <p>{{ currentLayanan.phone }}</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label for="rating"><strong>Rating:</strong></label>
            <ul>
              <li v-for="review in currentLayanan.ul" :key="review.id">
                <h6>{{ review.user.username }}</h6>
                <p>{{ review.rating }}</p>
              </li>
            </ul>
          </div>
          <div class="form-group">
            <label for="rating"><strong>Review:</strong></label>
            <ul>
              <li v-for="review in currentLayanan.ul" :key="review.id">
                <h6>{{ review.user.username }}</h6>
                <p>{{ review.ulasan }}</p>
                <button type="button"v-if="review.user.id === currentUser.id" @click="showDeleteModal(review.id)">Delete</button>
              </li>
            </ul>
          </div>
          <div class="field">
            <button type="button" class="button is-info" @click="processUlasan">Send</button>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label for="ulasan"><strong>Ulasan:</strong></label>
            <input type="text" class="form-control" id="ulasan" v-model="newUlasanText" />
          </div>
          <div class="form-group">
            <label for="rating"><strong>Rating:</strong></label>
            <input type="text" class="form-control" id="rating" v-model="newUlasanRating" />
          </div>
        </div>
      </div>
    </form>
    </div>

  <div v-else>
    <br />
    <p>Please login first...</p>
  </div>
  <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
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
</template>

<script>
import { useAuthStore } from '@/store/auth.module';
import { useLayananStore } from '@/store/layananstore';
import { useUlasanStore } from '@/store/ulasanstore';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default {
  name: "ulasans-list",
  setup() {
    const authStore = useAuthStore();
    const layananStore = useLayananStore();
    const ulasanStore = useUlasanStore();
    const route = useRoute();

    const currentLayanan = computed(() => layananStore.currentLayanan);
    const file = computed(() => ulasanStore.file);
    const messagefile = computed(() => ulasanStore.messagefile);
    const error = computed(() => ulasanStore.error);
    const message = computed(() => ulasanStore.message);
    const currentUser = computed(() => authStore.user);
    const newUlasanText = ref("");
    const newUlasanRating = ref(0);
    const fileInput = ref(null);
    const showModal = ref(false);
    const ulasanToDelete = ref(null);

    const selectFile = (event) => {
      fileInput.value = event.target;
    };

    const processUlasan = () => {
      const existingReview = currentLayanan.value.ul.find(review => review.user.id === authStore.user.id);
      if (existingReview) {
        updateUlasan();
      } else {
        addUlasan();
      }
    };

    const addUlasan = async () => {
      if (!newUlasanText.value || newUlasanRating.value === 0) {
        return;
      }
      const data = {
        userId: authStore.user.id,
        ulasan: newUlasanText.value,
        rating: newUlasanRating.value,
      };
      await ulasanStore.addUlasan(route.params.id, data);
      showToast(ulasanStore.message, ulasanStore.error);
      ulasanStore.getUlasan(route.params.id);
      layananStore.getLayanan(route.params.id);
    };

    const updateUlasan = async () => {
      if (!newUlasanText.value || newUlasanRating.value === 0) {
        return;
      }
      const data = {
        userId: authStore.user.id,
        ulasan: newUlasanText.value,
        rating: newUlasanRating.value,
      };
      await ulasanStore.updateUlasan(route.params.id, data);
      showToast(ulasanStore.message, ulasanStore.error);
      ulasanStore.getUlasan(route.params.id);
      layananStore.getLayanan(route.params.id);
    };
    const showDeleteModal = (ulasanId) => {
      ulasanToDelete.value = ulasanId;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      ulasanToDelete.value = null;
    };
    const confirmDelete = async () => {
      await ulasanStore.deleteUlasan(authStore.user.id, route.params.id);
      showToast(ulasanStore.message, ulasanStore.error);
      closeModal();
    };
    const showToast = (message, isError) => {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: isError ? "linear-gradient(to right, #ff5f6d, #ffc371)" : "linear-gradient(to right, #8e7cc3, #96c93d)",
      }).showToast();
    };

    const clearMessage = () => {
      ulasanStore.message = '';
    };

    onMounted(() => {
      ulasanStore.getUlasan(route.params.id);
      layananStore.getLayanan(route.params.id);
    });

    return {
      currentLayanan,
      file,
      messagefile,
      error,
      message,
      newUlasanText,
      newUlasanRating,
      fileInput,
      showModal,
      ulasanToDelete,
      currentUser,
      selectFile,
      processUlasan,
      addUlasan,
      updateUlasan,
      showDeleteModal,
      closeModal,
      confirmDelete,
      clearMessage,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.clearMessage();
    next();
  }
};
</script>

<style scoped>
#background {
  position: absolute;
  opacity: 0.4;
}
.modal.is-active {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Darken the background */
}
.modal-card {
  width: 500px;
  max-width: 100%;
  background-color: white; /* Ensure modal content is visible */
  border-radius: 8px; /* Slightly rounded corners */
  overflow: hidden; /* Hide overflowing content */
}

.modal-card-head, .modal-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px; /* Add padding */
  background-color: #f5f5f5; /* Light background for header and footer */
}

.modal-card-body {
  padding: 20px; /* Add padding to the body */
}

.modal-card-title {
  font-size: 1.25em; /* Increase title size */
  font-weight: bold; /* Make title bold */
}

.delete {
  background: none;
  border: none;
  font-size: 1.5em; /* Increase the size of the close button */
}

.button.is-danger {
  background-color: #ff3860;
  color: white;
}

.button.is-info {
  background-color: #209cee;
  color: white;
}
</style>
