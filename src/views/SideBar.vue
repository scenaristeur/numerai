<template>
    <div>
        lang:
        <select v-model="$i18n.locale">
            <option value="fr">🇲🇫</option>
            <option value="en">🇬🇧</option>
            <!-- <option>ja</option> -->
        </select>
        <UserView />
        <StoriesView />
    </div>
</template>

<script>
import UserView from '@/views/UserView.vue';
import StoriesView from '@/views/StoriesView.vue';
export default {
    name: "SideBar",
    components: {
        UserView,StoriesView
    },
}
</script>

<style scoped></style>