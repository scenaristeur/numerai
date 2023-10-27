<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">

    <h1 class="green">{{ msg }} </h1>

    
        <h3>
          {{ $t('epopee') }}
          <!-- L'épopée des aventuriers du numérique et de l'IA. -->
          <!-- <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. -->
        </h3>
    
        <select v-model="$i18n.locale">
          <option value="fr">🇲🇫</option>
          <option value="en">🇬🇧</option>
          <!-- <option>ja</option> -->
        </select>
  

  </div>
  
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
