<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HistoryGalery from './views/HistoryGalery.vue';
import StoriesView from './views/StoriesView.vue';
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <HistoryGalery />
    <div class="wrapper">
      <HelloWorld :msg="$t('Numerai_Planet')" />

      <nav>
        <RouterLink to="/">{{ $t('home') }}</RouterLink>
        <!-- <RouterLink to="/chat">{{ $t('Commencer') }}</RouterLink> -->
        <RouterLink to="/about">{{ $t('about') }}</RouterLink>

        <a href="https://discord.gg/X5UqZdSrmP" target="_blank">Join us on Discord</a>
      </nav>
      <small v-if="level == 0">
        {{ $t('disclaimer') }}

        <a href="https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage" target="_blank">models de language</a>.




        <hr>
        0.0.2-pwa
      </small>





    </div>

  </header>

  <RouterView />

  <StoriesView />
</template>

<script>

export default {
  name: "App",

  computed: {
    level() {
      return this.$store.state.core.level
    }
  }

}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

a  {
  color: hsla(160, 100%, 37%, 1);
 }

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
