// --/ Form SignUp /--
<template>
  <div class="signup">
    <form v-on:submit.prevent>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          placeholder="Usuario"
          v-model="state.user_name"
          required
        />
        <span v-if="v$.user_name.$error">
          <div class="errors">
            {{ v$.user_name.$errors[0].$message }}
          </div>
        </span>
      </div>
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
          v-model="state.password.password"
          required
        />
        <span v-if="v$.password.$error">
          <div class="errors">
            {{ v$.password.$errors[0].$message }}
          </div>
        </span>
      </div>
      <div>
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          v-model="state.password.confirm"
          required
        />
        <span v-if="v$.password.confirm.$error">
          <div class="errors">
            {{ v$.password.confirm.$errors[0].$message }}
          </div>
        </span>
      </div>

      <div>
        <label>Tipo de Usuario</label>
        <select v-model="state.type" required>
          <option value="engineer">Ingeniero</option>
          <option value="client">Cliente / Empresa</option>
        </select>
        <span v-if="v$.type$error">
          <div class="errors">
            {{ v$.type.$errors[0].$message }}
          </div>
        </span>
      </div>
      <br />
      <button @click="submitFormSignUp" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import router from "vue-router";
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      user_name: "",
      email: "",
      password: {
        password: "",
        confirm: "",
      },
      type: "engineer",
    });
    const rules = computed(() => {
      return {
        // ---> Rules for vuelidate <---
        user_name: {
          required: helpers.withMessage(
            "El usuario no debe estar vacío",
            required
          ),
          minLength: helpers.withMessage(
            "El usuario debe contener por lo menos 4 caracteres",
            minLength(4)
          ),
        },
        email: {
          required: helpers.withMessage(
            "El email no debe estar vacío",
            required
          ),
          email: helpers.withMessage("El email debe ser válido", email),
        },
        password: {
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
          confirm: {
            required: helpers.withMessage("Confirma tu contraseña", required),
            sameAs: helpers.withMessage(
              "Las contraseñas deben coincidir",
              sameAs(state.password.password)
            ),
          },
        },
        type: {
          required: helpers.withMessage(
            "Selecciona un tipo de usuario",
            required
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
  methods: {
    submitFormSignUp() {
      // --> On submit, call Vuelidate with rules and state <---
      this.v$.$validate();
      if (!this.v$.$error) {
        this.signUp();
      }
    },
    async signUp() {
      await axios
        .post("http://localhost:3080/api/users/signup", this.state)
        .then((data) => {
          console.log(data.data);
        });
        this.$router.push("/signin")
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
