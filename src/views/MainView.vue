<template>
    <div>
   
        <MissionSelect />
        <!-- <hr>
        () mes histoires -->

        <StoriesView />



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