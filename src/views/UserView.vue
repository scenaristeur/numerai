<template>
    <div>
        <button v-if="user==null" @click="signInWithPopup">SigIn</button>
        <div v-else>
{{ user.displayName }}
 <!-- {{ user.uid }} -->
<button variant="danger" @click="signOut">Logout</button>
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