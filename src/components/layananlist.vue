<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Layanan List Edit</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(layanan, index) in layanans"
          :key="index"
          @click="setActiveLayanan(layanan, index)"
        >
          {{ layanan.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllLayanans">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentLayanan">
        <h4>Layanan</h4>
          <img :src="currentLayanan.linkImg" alt="poto" class="photos">
        <div>
          <label><strong>Title:</strong></label> {{ currentLayanan.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentLayanan.description }}
        </div>
        <div>
          <label><strong>Alamat:</strong></label> {{ currentLayanan.alamat }}
        </div>
        <div>
          <label><strong>Rating:</strong></label> {{ currentLayanan.rating }}
        </div>
        <div>
          <label><strong>Ulasan:</strong></label> {{ currentLayanan.ulasan }}
        </div>

        <div>
          <label><strong>Phone:</strong></label> {{ currentLayanan.phone }}
        </div>

        <router-link :to="'/admin/home/' + currentLayanan.id" class="badge badge-warning">Details</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Layanan...</p>
      </div>
    </div>
  </div>
</template>

<script>
import LayananDataService from "../services/LayananDataservice";

export default {
  name: "layanans-list",
  data() {
    return {
      layanans: [],
      currentLayanan: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveLayanans() {
      LayananDataService.getAll()
        .then(response => {
          this.layanans = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveLayanans();
      this.currentLayanan = null;
      this.currentIndex = -1;
    },

    setActiveLayanan(layanan, index) {
      this.currentLayanan = layanan;
      this.currentIndex = layanan ? index : -1;
    },

    removeAllLayanans() {
      LayananDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      LayananDataService.findByTitle(this.title)
        .then(response => {
          this.layanans = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveLayanans();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>