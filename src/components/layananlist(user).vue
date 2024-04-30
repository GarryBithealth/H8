<!-- <template>
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
</style> -->

<template>
<div class="list row">
  <div class="col-md-8 mt-2">
    <div class="d-flex align-items start justify-content start p-1">
      <div class="rounded-lg bg-secondary p-3 w-100 mb-3">
        <div class="d-flex">
          <div class="d-flex rounded-start border-end border-dark bg-light">
            <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none w-5 fill-gray-500">
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <input type="text" class="form-control bg-light p-2 flex-grow-1 border-0" placeholder="Search" v-model="title"/>
          <button class="btn btn-primary rounded-end p-1 ml-1" type="button" @click="searchTitle">Search</button>
        </div>
      </div>
    </div>
  </div>
</div>
    <div class="col-md-12">
      <h4>Menu Layanan</h4>
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
          <label><strong>Rating:</strong></label> {{ layanan.rating }}
        </div>
        <div>
          <label><strong>Phone:</strong></label> {{ layanan.phone }}
        </div>
        <router-link :to="'/details/' + layanan.id" class="badge badge-warning">Details</router-link>
      </div>
        </div>
      </div>
</template>

<script>
import LayananDataService from "../services/LayananDataservice";
import UlasanDataService from "../services/UlasanDataservice";
export default {
  name: "layanans-list",
  data() {
    return {
      layanans: [],
      currentLayanan: null,
      currentIndex: -1,
      ulasans: [],
      currentUlasan: null,
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
body {
  background-color: rgb(2, 237, 254, 0.6)
}
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center
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
.photos {
  width: 200px;
  height: 200px
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
 opacity: .7;
 transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
}

button:hover {
 color: var(--btn-color);
 background-color: var(--glow-color);
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 2em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
}

button:active {
 box-shadow: 0 0 0.6em .25em var(--glow-color),
        0 0 2.5em 2em var(--glow-spread-color),
        inset 0 0 .5em .25em var(--glow-color);
}
</style>