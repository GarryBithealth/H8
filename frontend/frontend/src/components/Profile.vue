<template>
  <div class="container">
    <header class="jumbotron mt-4">
      <h2>Profile</h2>
      <h3>
        <strong>{{currentUser.username}}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <div class="jumbotron mt-4" style="background-color:cornflowerblue;">
      <h3><strong> History </strong></h3>
      <div class="list row">
        <div class="col-md-6">
          <h5 style="margin-top: 30px;">Ulasan 1</h5>
          <p>Apotek 1</p>
          <p>Rating: 5</p>
          <p>Ulasan: mantappppp</p>
        </div>
        <div class="col-md-6">
          <h5 style="margin-top: 30px;">Ulasan 2</h5>
          <p>Apotek 2</p>
          <p>Rating: 3</p>
          <p>Ulasan: kurengggg</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  methods: {
    cekparam() {
  }
},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    // this.cekparam()
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
