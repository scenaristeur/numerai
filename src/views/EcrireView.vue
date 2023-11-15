<template>
    <div class="container">
        <h1>Ecrire / Démarrer</h1>
        <!-- <NavBar /> -->

        <RouterLink to="/user">
            <IconPeopleIcon />
        </RouterLink>

<!-- {{ hordeApi }} -->
        <span v-if="hordeApi == '0000000000'"> ***! Api Horde conseillée pour générer texte et images en priorité !*** </span>
        <span v-if="user == null"> ***! Compte google conseillé pour publier !*** </span>
        <!-- <HordeApi /> -->
        <MissionSelect />
        <StoryView />
        <ChatInput />
    </div>
</template>

<script>
import MissionSelect from '@/views/MissionSelect.vue';
import ChatInput from '@/views/ChatInput.vue';
import StoryView from '@/views/StoryView.vue';
import IconPeopleIcon from '@/components/icons/IconPeople.vue'
//import HordeApi from '@/components/HordeApi.vue';
// import NavBar from '@/components/NavBar.vue';

export default {
    name: "EcrireView",
    components: {
        MissionSelect, ChatInput, StoryView,
        IconPeopleIcon
        // HordeApi,
        //  NavBar
    },
    computed: {
        user() {
            return this.$store.state.firestore.user
        },
        hordeApi() {
            return this.$store.state.core.hordeApi
        }
    }
}
</script>

<style scoped></style>