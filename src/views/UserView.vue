<template>
    <div>
        <div v-if="user == null">
            Tu dois t'enregistrer pour publier tes histoires
            <button @click="signInWithPopup">SigIn</button>
        </div>

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
        signOut() {
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