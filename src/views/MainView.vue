<template>
    <div>
        Carousssel
        <StoriesView />
        <hr>
        Démarrer une MissionSelect
        <MissionSelect />
        <hr>
        () mes histoires

    </div>
</template>

<script>
import MissionSelect from '@/views/MissionSelect.vue';
import StoriesView from '@/views/StoriesView.vue';

export default {
    name: "MainView",
    components: { MissionSelect, StoriesView }
}
</script>

<style scoped></style>