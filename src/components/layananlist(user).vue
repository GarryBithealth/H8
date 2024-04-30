<template>
  <div class="list row">
    <div class="col-md-8 mt-2">
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
      <h4>Layanan List</h4>
      <div class="list-group">
        <div class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(layanan, index) in layanans"
          :key="index"
          @click="setActiveLayanan(layanan, index)"
        >
        <div class="photo">
          <img class="photos" :src="layanan.linkImg" alt="Farmasi Image">
        </div>
          {{ layanan.title }} <br>
          {{ layanan.alamat }} <br>
          {{ layanan.ulasan }} <br>
          {{ layanan.phone }}
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div v-if="currentLayanan">
        <h4>Layanan</h4>
          <div class="photo">
            <img class="photos" :src="currentLayanan.linkImg" alt="Farmasi Image">
          </div>
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
        <router-link :to="'/home/' + currentLayanan.id" class="badge badge-warning">Edit</router-link>
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
import farmasi1 from "../assets/Farmasi1.jpg"
import farmasi2 from "../assets/Farmasi2.jpg"
import farmasi3 from "../assets/Farmasi3.jpg"
import farmasi4 from "../assets/Farmasi4.jpg"
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
.list-group-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: 15px;
}
.photos {
  width: 200px;
  height: 200px
}
</style>