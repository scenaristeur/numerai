<template>
    <div>
        <b-button v-if="user==null" @click="signInWithPopup">SigIn with Google</b-button>
        <div v-else>
{{ user.displayName }}
 <!-- {{ user.uid }} -->
<b-button variant="danger" @click="signOut">Logout</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserView",
    methods: {
        signInWithPopup() {
            this.$store.dispatch('firestore/signInWithPopup')
        },
        signOut(){
            this.$store.dispatch('firestore/signOut')
        }
    },
    computed: {
    user() {
      return this.$store.state.firestore.user
    }
  }
}
</script>

<style scoped></style>