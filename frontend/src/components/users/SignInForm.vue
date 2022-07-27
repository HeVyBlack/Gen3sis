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
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import setAuthHeader from "@/utils/setAuthHeader";
export default {
  setup() {
    // Variables, that contain the users's info
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        // ---> Rules for vuelidate <---
        email: {
          // If email is void, send a message
          required: helpers.withMessage(
            "El email no debe estar vacío",
            required
          ),
          // If email is invalid, send a message
          email: helpers.withMessage("El email debe ser válido", email),
        },

        password: {
          // If password is void, send a message
          required: helpers.withMessage(
            "La contraseña no debe estar vacía",
            required
          ),
          // If password is not 4 characters, send a message
          minLength: helpers.withMessage(
            "La contraseña debe ser de mínimo 4 caracteres",
            minLength(4)
          ),
        },
      };
    });
    // Call function useValidate, with the rules, and user's info
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      // Msg array, for incoming msgs from backend
      msg: [{}],
    };
  },
  methods: {
    // When click, validate info --->
    submitFormSignIn() {
      // --> On submit, call Vuelidate with rules and state <---
      this.v$.$validate();
      if (!this.v$.$error) {
        this.signIn(); // <--- If ther's no errors, call signIn function
      }
    },
    async signIn() {
      await axios
        .post("http://localhost:3080/api/users/signin", this.state) // <--- Post petition, with user's info
        .then((data) => {
          if (data.data.token == null && !data.data.token) {
            this.msg.msgs = data.data; // <--- If there's no token, or is null, set de data recieved from backend, in msg array
          } else {
            localStorage.setItem("jwtToken", data.data.token);
            setAuthHeader(data.data.token);
            this.$router.push("/profile");
            // Else, set token recieved from backend, in local storage. Set token as "persistence". Send to profile page
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
