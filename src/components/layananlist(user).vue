<!-- <template>
  <div id="background">
    <img src="../assets/images.jpg" alt="" style="width: 80%; align-items: center;" />
  </div>
  <div class="list row">
    <div class="col-md-8 mt-2">
      <div class="d-flex align-items-start justify-content-start p-1 ml-5">
        <div class="rounded-lg bg-secondary p-3 w-100 mb-3">
          <div class="d-flex">
            <div class="d-flex rounded-start border-end border-dark bg-light">
              <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none w-5 fill-gray-500">
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <select class="form-select" name="" id="" v-model="selectedFilter" @change="updateSelectedFilter">
              <option v-for="(filter, index) in filterOptions" :key="index" :value="filter">{{ filter }}</option>
            </select>
            <input type="text" class="form-control bg-light p-2 flex-grow-1 border-0" placeholder="Search" v-model="searchText" />
            <button class="btn btn-primary rounded-end p-1 ml-1" type="button" @click="searchTitle">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-12">
    <h4 class="menu ml-5">Menu Layanan</h4>
    <div class="list-group" style="display: grid">
      <div class="list-group-item" v-for="(layanan, index) in paginatedLayanans" :key="index">
        <div class="photo">
          <img class="photos" :src="layanan.linkImg" alt="Farmasi Image" />
        </div>
        <div class="title" style="text-align: center; margin-bottom: 10px">
          <strong>{{ layanan.title }}</strong>
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ layanan.description }}
        </div>
        <div>
          <label><strong>Alamat:</strong></label> {{ layanan.alamat }}
        </div>
        <div>
          <label><strong>Rating:</strong></label> {{ layanan.averageRating }}
        </div>
        <div>
          <label><strong>Jenis:</strong></label> {{ layanan.jenis }}
        </div>
        <div v-if="currentUser">
          <router-link :to="'/details/' + layanan.id" class="badge badge-warning" style="display: flex; justify-content: center;">Details</router-link>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: this.layananStore.currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
        </li>
        <li class="page-item" v-for="page in this.layananStore.totalPages" :key="page" :class="{ active: page === this.layananStore.currentPage }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: this.layananStore.currentPage === this.layananStore.totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useLayananStore } from '@/store/layananstore';
import { mapStores } from 'pinia';

export default {
  name: "layanans-list",
  data() {
    return {
      currentIndex: -1,
      jenisfilter: ["alamat", "title", "jenis"],
      selectedFilter: null,
      searchText: "",
    };
  },
  computed: {
    ...mapStores(useLayananStore),
    currentUser() {
      return this.$store.state.auth.user;
    },
    filterOptions() {
      return this.jenisfilter;
    },
    paginatedLayanans() {
      return this.layananStore.layanans.slice(0, 6);
    },
    showAdminBoard() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN');
    },
    showModeratorBoard() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_MODERATOR');
    }
  },
  methods: {
    searchTitle() {
      this.layananStore.searchTitle(this.searchText, this.selectedFilter);
    },
    updateSelectedFilter() {
      this.layananStore.updateSelectedFilter(this.selectedFilter, this.searchText);
    },
    changePage(page) {
      this.layananStore.changePage(page);
    },
    nextPage() {
      this.layananStore.nextPage();
    },
    prevPage() {
      this.layananStore.prevPage();
    },
  },
  async mounted() {
    await this.layananStore.PaginatedLayanan(this.layananStore.currentPage);
  },
};
</script>

<style>
#background {
  position: absolute;
  opacity: 0.4;
  align-items: center;
}
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
}
.list-group-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  margin-left: 50px;
}
.photo {
  display: flex;
  justify-content: center;
}
.photos {
  width: 200px;
  height: 200px;
}
button::after {
  pointer-events: none;
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--glow-spread-color);
  filter: blur(2em);
  opacity: 0.7;
  transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
}
button:hover {
  color: var(--btn-color);
  background-color: var(--glow-color);
  box-shadow: 0 0 1em 0.25em var(--glow-color),
    0 0 4em 2em var(--glow-spread-color),
    inset 0 0 0.75em 0.25em var(--glow-color);
}
button:active {
  box-shadow: 0 0 0.6em 0.25em var(--glow-color),
    0 0 2.5em 2em var(--glow-spread-color),
    inset 0 0 0.5em 0.25em var(--glow-color);
}
</style> -->

<template>
  <div id="background">
    <img src="../assets/images.jpg" alt="" style="align-items: center; max-width: 100%;" />
  </div>
  <div class="list row">
    <div class="col-md-8 mt-2">
      <div class="d-flex align-items-start justify-content-start p-1 ml-5">
        <div class="rounded-lg bg-secondary p-3 w-100 mb-3">
          <div class="d-flex">
            <div class="d-flex rounded-start border-end border-dark bg-light">
              <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none w-5 fill-gray-500">
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <select class="form-select" v-model="selectedFilter" @change="updateSelectedFilter">
              <option v-for="(filter, index) in filterOptions" :key="index" :value="filter">{{ filter }}</option>
            </select>
            <input type="text" class="form-control bg-light p-2 flex-grow-1 border-0" placeholder="Search" v-model="searchText" />
            <button class="btn btn-primary rounded-end p-1 ml-1" type="button" @click="searchTitle">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-12">
    <h4 class="menu ml-5">Menu Layanan</h4>
    <div class="list-group" style="display: grid">
      <div class="list-group-item" v-for="(layanan, index) in paginatedLayanans" :key="index">
        <div class="photo">
          <img class="photos" :src="layanan.linkImg" alt="Farmasi Image" />
        </div>
        <div class="title" style="text-align: center; margin-bottom: 10px">
          <strong>{{ layanan.title }}</strong>
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ layanan.description }}
        </div>
        <div>
          <label><strong>Alamat:</strong></label> {{ layanan.alamat }}
        </div>
        <div>
          <label><strong>Rating:</strong></label> {{ layanan.averageRating }}
        </div>
        <div>
          <label><strong>Jenis:</strong></label> {{ layanan.jenis }}
        </div>
        <div v-if="currentUser">
          <router-link :to="'/details/' + layanan.id" class="badge badge-warning" style="display: flex; justify-content: center;">Details</router-link>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !layananStore || layananStore.currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !layananStore || layananStore.currentPage === layananStore.totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useLayananStore } from '@/store/layananstore';
import { useAuthStore } from '@/store/auth.module';
import { computed, ref, onMounted } from 'vue';

export default {
  name: "layanans-list",
  setup() {
    const layananStore = useLayananStore();
    const authStore = useAuthStore();

    const currentIndex = ref(-1);
    const selectedFilter = ref(null);
    const searchText = ref("");
    const jenisfilter = ["alamat", "title", "jenis"];

    const currentUser = computed(() => authStore.user);
    const filterOptions = computed(() => jenisfilter);
    const paginatedLayanans = computed(() => layananStore.layanans.slice(0, 6));
    const currentPage = computed(() => layananStore.currentPage);
    const totalPages = computed(() => layananStore.totalPages);
    const showAdminBoard = computed(() => currentUser.value && currentUser.value.roles.includes('ROLE_ADMIN'));
    const showModeratorBoard = computed(() => currentUser.value && currentUser.value.roles.includes('ROLE_MODERATOR'));

    const searchTitle = () => {
      layananStore.searchTitle(searchText.value, selectedFilter.value);
    };

    const updateSelectedFilter = () => {
      layananStore.updateSelectedFilter(selectedFilter.value, searchText.value);
    };

    const changePage = (page) => {
      layananStore.changePage(page);
    };

    const nextPage = () => {
      if (layananStore.currentPage < layananStore.totalPages) {
        layananStore.nextPage();
      }
    };

    const prevPage = () => {
      if (layananStore.currentPage > 1) {
        layananStore.prevPage();
      }
    };

    onMounted(() => {
      layananStore.PaginatedLayanan();
    });

    return {
      currentIndex,
      selectedFilter,
      searchText,
      filterOptions,
      paginatedLayanans,
      currentUser,
      currentPage,
      totalPages,
      showAdminBoard,
      showModeratorBoard,
      searchTitle,
      updateSelectedFilter,
      changePage,
      nextPage,
      prevPage,
      layananStore
    };
  },
};
</script>

<style scoped>
#background {
  position: absolute;
  opacity: 0.4;
  align-items: center;
}
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
}
.list-group-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  margin-left: 50px;
}
.photo {
  display: flex;
  justify-content: center;
}
.photos {
  width: 200px;
  height: 200px;
}
button::after {
  pointer-events: none;
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--glow-spread-color);
  filter: blur(2em);
  opacity: 0.7;
  transform: perspective(1.5em) rotateX(35deg) scale(0.9, 1) translateY(10%);
}
.menu {
  display: flex;
  justify-content: flex-start;
  font-family: inherit;
  font-size: 24px;
}
</style>
