<template>
  <div class="signup">
    

    <div class="alert alert-success alert-dismissible fade show container px-5" role="alert" v-if="msg_from_signup">
      <strong>{{msg_from_signup}}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <SignInForm />
  </div>
</template>

<script>
import SignInForm from "@/components/users/SignInForm.vue";
export default {
  name: "SignInView",
  components: {
    SignInForm,
  },
  props: {
    msg_from_signup: String,
  },
};
</script>
