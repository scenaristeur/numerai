<template>
    <div>
<h1>Ecrire / Démarrer</h1>

<MissionSelect />
<StoryView />
<ChatInput />
    </div>
</template>

<script>
import MissionSelect from '@/views/MissionSelect.vue';
import ChatInput from '@/views/ChatInput.vue';
import StoryView from '@/views/StoryView.vue';
    export default {
        name: "EcrireView",
        components: {
  MissionSelect, ChatInput, StoryView
  },
    }
</script>

<style scoped>

</style>