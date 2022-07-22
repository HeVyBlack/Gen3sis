<template>
  <div class="signup">
    <SignInForm/>
  </div>
</template>

<script>
import SignInForm from "@/components/users/SignInForm.vue";
export default {
  name: "SignInView",
  components: {
    SignInForm,
  },
};
</script>
