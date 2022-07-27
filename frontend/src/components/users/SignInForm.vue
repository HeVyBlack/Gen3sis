// --/ Form SignUp /--
<template>
  <div class="signup">
    <div v-if="msg.msgs" class="container">
      <div v-for="msg in msg.msgs" v-bind:key="msg">
        <div
          class="alert alert-danger alert-dismissible fade show px-5"
          role="alert"
        >
          <strong>{{ msg.text }}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
    <form v-on:submit.prevent>
      <div>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Email"
          v-model="state.email"
          required
        />
        <span v-if="v$.email.$error">
          <div class="errors">
            {{ v$.email.$errors[0].$message }}
          </div>
        </span>
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          v-model="state.password"
          required
        />
        <span v-if="v$.password.$error">
          <div class="errors">
            {{ v$.password.$errors[0].$message }}
          </div>
        </span>
      </div>
      <br />
      <button @click="submitFormSignIn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import router from "vue-router";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        // ---> Rules for vuelidate <---
        email: {
          required: helpers.withMessage(
            "El email no debe estar vacío",
            required
          ),
          email: helpers.withMessage("El email debe ser válido", email),
        },

        password: {
          required: helpers.withMessage(
            "La contraseña no debe estar vacía",
            required
          ),
          minLength: helpers.withMessage(
            "La contraseña debe ser de mínimo 4 caracteres",
            minLength(4)
          ),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      msg: [{}],
    };
  },
  methods: {
    // When click, validate info --->
    submitFormSignIn() {
      // --> On submit, call Vuelidate with rules and state <---
      this.v$.$validate();
      if (!this.v$.$error) {
        this.signIn();
      }
    },
    async signIn() {
      await axios
        .post("http://localhost:3080/api/users/signin", this.state)
        .then((data) => {
          if (data.data.token == null && !data.data.token) {
            this.msg.msgs = data.data;
          } else {
            this.$router.push("/profile");
          }
        });
    },
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.errors {
  margin-top: 0.3rem;
  color: red;
  background-color: rgba(170, 170, 170, 0.2);
  padding: 0.3rem;
}
</style>
