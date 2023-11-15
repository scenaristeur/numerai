<template>
    <div class="container">
        <h1>Ecrire / Démarrer</h1>
        <!-- <NavBar /> -->
        <IconPeopleIcon />
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
}
</script>

<style scoped></style>