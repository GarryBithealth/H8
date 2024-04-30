<template>
  <section class="vh-70 mt-5">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <h1 class="mb-5">Login</h1>
          <Form @submit="handleLogin" :validation-schema="schema">
            <!-- Email input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="username">Username</label>
              <Field name="username" type="text" class="form-control form-control-lg" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" for="password">Password</label>
              <Field name="password" type="password" class="form-control form-control-lg" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button class="btn btn-primary btn-lg btn-block"
                style="padding-left: 2.5rem; padding-right: 2.5rem;" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span><span>Login</span>
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <router-link to="/register">Register</router-link></p>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from '@/store/auth.module'; // Import the Pinia store

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      const authStore = useAuthStore();
      return authStore.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile/");
    }
  },
  methods: {
    async handleLogin(user) {
      this.loading = true;
      const authStore = useAuthStore();

      try {
        await authStore.login(user);
        this.$router.push("/profile/");
      } catch (error) {
        this.loading = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>
