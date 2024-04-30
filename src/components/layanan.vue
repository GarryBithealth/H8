<template>
  <div v-if="currentLayanan" class="edit-form">
    <h4>Layanan</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentLayanan.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentLayanan.description"
        />
      </div>

      <div class="form-group">
        <label for="alamat">Alamat</label>
        <input type="text" class="form-control" id="alamat"
          v-model="currentLayanan.alamat"
        />
      </div>


      <div class="form-group">
        <label for="linkImg">Link Image</label>
        <input type="text" class="form-control" id="linkImg"
          v-model="currentLayanan.linkImg"
        />
      </div>

      <div class="form-group">
        <label for="Phone">Phone</label>
        <input type="text" class="form-control" id="Phone"
          v-model="currentLayanan.phone"
        />
      </div>
      

    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteLayanan"
    >Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateLayanan"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Layanan...</p>
  </div>
</template>

<script>
import LayananDataService from "../services/LayananDataservice";

export default {
  name: "layanan",
  data() {
    return {
      currentLayanan: null,
      message: ''
    };
  },
  methods: {
    getLayanan(id) {
      LayananDataService.get(id)
        .then(response => {
          this.currentLayanan = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentLayanan.id,
        title: this.currentLayanan.title,
        description: this.currentLayanan.description,
        alamat : this.currentLayanan.alamat,
        phone: this.currentLayanan.phone,
        linkImg: this.currentLayanan.linkImg,
        published: status
      };

      LayananDataService.update(this.currentLayanan.id, data)
        .then(response => {
          console.log(response.data);
          this.currentLayanan.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateLayanan() {
      LayananDataService.update(this.currentLayanan.id, this.currentLayanan)
        .then(response => {
          console.log(response.data);
          this.message = 'Layanan was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteLayanan() {
      LayananDataService.delete(this.currentLayanan.id)
        .then(response => {
          console.log(response.data);
          this.message = 'Layanan sudah berhasil dihapus'
          this.$router.push("/home");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getLayanan(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 3000px;
  margin: auto;
}
</style>