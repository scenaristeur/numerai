<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HistoryGalery from './views/HistoryGalery.vue';

//import StoriesView from './views/StoriesView.vue';
//import NavBar from './components/NavBar.vue'
//import MissionSelect from './views/MissionSelect.vue';


</script>

<template>
  <header>


    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <NavBar /> -->
      <HistoryGalery />
      <HelloWorld :msg="$t('Numerai_Planet')" />

      <nav>

        <RouterLink to="/">{{ $t('home') }}</RouterLink>
        <!-- <RouterLink to="/chat">{{ $t('Commencer') }}</RouterLink> -->
        <RouterLink to="/ecrire"> Ecrire</RouterLink>
        <RouterLink to="/lire">Lire</RouterLink>
        <RouterLink to="/about">{{ $t('about') }}</RouterLink>

        <a href="https://discord.gg/X5UqZdSrmP" target="_blank">Join us on Discord</a>
      </nav>

      lang:
      <select v-model="$i18n.locale">
        <option value="fr">🇲🇫</option>
        <option value="en">🇬🇧</option>
        <!-- <option>ja</option> -->
      </select>
      <br>




    </div>

  </header>

 

  <RouterView />
 
  <!-- <StoriesView />
  <MissionSelect /> -->

  <footer>
    0.0.2-horde api key
  </footer>
</template>

<script>

// import MainView from '@/views/MainView.vue';

// import ChatInput from '@/views/ChatInput.vue';
// import NavBar from '@/components/NavBar.vue';

export default {
  name: "App",
  mounted() {
    this.$store.dispatch('firestore/checkIfUserLoggedIn')
  },

  computed: {
    level() {
      return this.$store.state.core.level
    },
    story() {
      return this.$store.state.core.story
    }
  }

}
</script>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh;*/
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

a {
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

footer {
  padding-top: 100px;
  height: 200px;
}
</style>
<style>
.mobileShow {
  display: none;
}

/* Smartphone Portrait and Landscape */

@media screen and (min-width : 320px) and (max-width : 968px) {
  .mobileShow {
    display: inline;
  }
}

.mobileHide {
  display: inline;
}

/* Smartphone Portrait and Landscape */

@media only screen and (min-width : 320px) and (max-width : 968px) {
  .mobileHide {
    display: none;
  }
}
</style>
