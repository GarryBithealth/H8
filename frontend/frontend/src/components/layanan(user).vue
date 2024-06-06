<template>
  <div v-if="currentLayanan" class="edit-form">
    <h4>Layanan</h4>
    <form>
      <div class="form-group">
        <label for="title"><strong>Title:</strong></label>
        <p> {{currentLayanan.title}}</p>
      </div>
      <div class="form-group">
        <label for="description"><strong>Description:</strong></label>
        <p> {{currentLayanan.description}}</p>
      </div>

      <div class="form-group">
        <label for="alamat"><strong>Alamat:</strong></label>
        <p> {{currentLayanan.alamat}}</p>
      </div>


      <div class="form-group">
        <label for="rating"><strong>Rating:</strong></label>
        <p> {{currentLayanan.rating}}</p>
      </div>

      <div class="form-group">
        <label for="ulasan"><strong>Ulasan:</strong></label>
        <input type="text" class="form-control" id="ulasan"
          v-model="currentLayanan.ulasan"
        />
      </div>

      <div class="form-group">
        <label for="Phone"><strong>Phone:</strong></label>
        <p> {{currentLayanan.phone}}</p>
      </div>

    </form>



    <button type="submit" class="badge badge-success"
      @click="updateLayanan"
    >
      Update ulasan
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
        rating : this.currentLayanan.rating,
        ulasan : this.currentLayanan.ulasan,
        phone: this.currentLayanan.phone,
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
  },
  mounted() {
    this.message = '';
    this.getLayanan(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>