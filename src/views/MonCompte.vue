<template>
    <div>
        <h1>Mon Compte</h1>
        <ul>
            <!-- <li>
                <h2>OpenAi Key</h2>
                obtenir une <a href="https://platform.openai.com/account/api-keys" target="_blank">clé openAi</a><br>
                <input id="openai_api_input" placeholder="clé d'Api OpenAI" v-model="newOpenAiApi" autocomplete="off"
                    @change="changeOpenAiApi" />
            </li> -->
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
    },
    data() {
        return {
            newOpenAiApi: null
        }
    },
    methods: {
        changeOpenAiApi() {
            console.log(this.newOpenAiApi)
        }
    }
}
</script>

<style scoped></style>