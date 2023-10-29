<template>
    <div>
        lang:
        <select v-model="$i18n.locale">
            <option value="fr">🇲🇫</option>
            <option value="en">🇬🇧</option>
            <!-- <option>ja</option> -->
        </select>
        <UserView />
    
    </div>
</template>

<script>
import UserView from '@/views/UserView.vue';

export default {
    name: "SideBar",
    components: {
        UserView
    },
}
</script>

<style scoped></style>