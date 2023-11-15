<template>
    <div>
        <h1>Mon Compte</h1>
        <ul>
            <li>
                <h2>Horde API Key</h2>

                <HordeApi />

            </li>
            <li>
                <h2>Compte Google</h2>
                <UserView />
            </li>
        </ul>
    </div>
</template>

<script>
import UserView from '@/views/UserView.vue';
import HordeApi from '@/components/HordeApi.vue';
export default {
    name: "MonCompte",
    components: {
        UserView, HordeApi
    }
}
</script>

<style scoped></style>