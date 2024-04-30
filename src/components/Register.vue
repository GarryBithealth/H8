<!-- <template>
<section class="text-center text-lg-start">
  <div class="container pt-4">
    <div class="row g-0 align-items-center">
      <div class="col-lg-6 mb-5 mb-lg-0">
        <div class="card cascading-right bg-body-tertiary" style="
            backdrop-filter: blur(30px); margin-right: -39px; border-radius: 15px; padding: 10px; box-shadow: 10px 5px 5px black;
            ">
          <div class="card-body p-3 shadow-5 text-center">
            <h2 class="fw-bold mb-5">Sign up now</h2>
            <Form @submit="handleRegister" :validation-schema="schema">
              <div v-if="!successful">
                <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label d-flex justify-content-flex-start" for="username">Username</label>
                  <Field name="username" type="text" class="form-control" />
              <ErrorMessage name="username" class="error-feedback" />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label for="phone" class="d-flex justify-content-flex-start">Phone</label>
              <Field name="phone" type="text" class="form-control" />
              <ErrorMessage name="phone" class="error-feedback" />
                  </div>
                </div>
              </div>
                <div class="form-outline mb-4">
                  <label for="email" class="d-flex justify-content-flex-start">Email</label>
              <Field name="email" type="email" class="form-control" />
              <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-outline mb-4">
                  <label for="password" class="d-flex justify-content-flex-start">Password</label>
              <Field name="password" type="password" class="form-control" />
              <ErrorMessage name="password" class="error-feedback" />
                </div>
              
              <button type="submit" class="btn btn-primary btn-block mb-4" :disabled="loading">
                <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
              </button>
              </div>
            </Form>
            <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 mb-5 mb-lg-0">
        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" style="width: 100%; border-radius: 25px; padding: 10px; box-shadow: 5px 10px 5px lightblue; height: 505px"
          alt="" />
      </div>
    </div>
  </div>
</section>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
<style scoped>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style> -->

<template>
  <!-- Section: Design Block -->
  <section class="text-center text-lg-start">
    <!-- Jumbotron -->
    <div class="container pt-4">
      <div class="row g-0 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card cascading-right bg-body-tertiary" style="
              backdrop-filter: blur(30px); margin-right: -39px; border-radius: 15px; padding: 10px; box-shadow: 10px 5px 5px black;
              ">
            <div class="card-body p-3 shadow-5 text-center">
              <h2 class="fw-bold mb-5">Sign up now</h2>
              <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label d-flex justify-content-flex-start" for="username">Username</label>
                        <Field name="username" type="text" class="form-control" />
                        <ErrorMessage name="username" class="error-feedback" />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label for="phone" class="d-flex justify-content-flex-start">Phone</label>
                        <Field name="phone" type="text" class="form-control" />
                        <ErrorMessage name="phone" class="error-feedback" />
                      </div>
                    </div>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="email" class="d-flex justify-content-flex-start">Email</label>
                    <Field name="email" type="email" class="form-control" />
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>
                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <label for="password" class="d-flex justify-content-flex-start">Password</label>
                    <Field name="password" type="password" class="form-control" />
                    <ErrorMessage name="password" class="error-feedback" />
                  </div>
                
                  <button type="submit" class="btn btn-primary btn-block mb-4" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    Sign Up
                  </button>
                </div>
              </Form>
              <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0">
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" style="width: 100%; border-radius: 25px; padding: 10px; box-shadow: 5px 10px 5px lightblue; height: 505px" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "../store/auth.module";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      phone: yup
        .string()
        .required("Phone number is required!")
        .matches(/^[0-9]+$/, "Must be a valid phone number")
        .min(10, "Must be at least 10 digits!")
        .max(15, "Must be maximum 15 digits!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    async handleRegister(values) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      const authStore = useAuthStore();
      
      try {
        const data = await authStore.register(values);
        this.message = data.message;
        this.successful = true;
      } catch (error) {
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.successful = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>