<template>
  <main>

      <TheWelcome  v-if="level==0"/>
      <ChatView />
   
  </main>
</template>



<script>
import TheWelcome from '../components/TheWelcome.vue'
import ChatView from '@/views/ChatView.vue'


export default {
  name: "HomeView",
  components: {
    TheWelcome, ChatView
  },
  computed: {
    level() {
      return this.$store.state.core.level
    }
  }

}



</script>

