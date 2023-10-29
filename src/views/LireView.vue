<template>
    <div>
        <h1>Lire / Explorer</h1>
        <StoriesView />
    </div>
</template>

<script>
import StoriesView from '@/views/StoriesView.vue';
export default {
    name: "LireView",
    components: {
        StoriesView
    }
}
</script>

<style scoped></style>