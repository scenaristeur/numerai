<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <!-- <hr>
    <br> -->


    <div>
      <h1>Pourquoi s'enregistrer ? </h1>
      <p>Lorsque vous souhaitez écrire une histoire, on vous propose de vous enregistrer de deux manières : </p>
      <ul>
        <li>pour obtenir une clé API Horde, en cliquant sur <a href="https://stablehorde.net/register" target="_blank">ce lien</a> 
          qui vous permettra d'être prioritaire et de générer le texte et les images plus rapidement. Pour l'API, il n'est pas nécessaire de se connecter sur l'un des providers indiqués.
          Vous avez juste à indiquer un nom d'utilisateur (Display Name) et à noter le code qui sera généré dans le bandeau orange, copiez-le. 
          Garder ce code dans un coin et insérez le dans le champ de saisie "clé d'API" de la page <RouterLink to="/ecrire#api_input"> Ecrire</RouterLink>
          <ul>
            <li>
              <a href="https://stablehorde.net/" target="_blank">plus d'infos sur le fonctionnement de la horde</a>
            </li>
            <!-- <li>

            </li> -->
          </ul>
        </li>
        <li>avec votre compte Google pour pouvoir enregistrer, publier et partager vos histoires. <UserView/>

        </li>
      </ul>




      <h1>How to contribute ?</h1>
      <ul>
        <li>
          <a href="https://github.com/scenaristeur/numerai/issues/1" target="_blank">Translate </a>
        </li>
        <li>Create Adventures : <a href="https://github.com/scenaristeur/numerai/issues/3" target="_blank">Coming soon</a>
        </li>
        <li>Enhance Code :
          <a href="https://github.com/scenaristeur/numerai/blob/main/README.md" target="_blank">
            source code & contribution
          </a>
        </li>

      </ul>
      <hr>
      <div>
        <b-alert :model-value="true">
          {{ $t('disclaimer') }}

          <a href="https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage" target="_blank">models de language</a>.
        </b-alert>
      </div>


    </div>
  </div>
</template>

<script>

import UserView from '@/views/UserView.vue';
export default {
    name: "AboutView",
    components: {
      UserView
    },

    // data() {
    //     return {
    //         show: true,
    //         showConfig: false
    //     }
    // },
    // mounted() {
    //     //this.showConfig = true
    // },
    // methods: {
    //     openMenu() {
    //         this.$store.commit('core/showMenu', true)
    //     }
    // }
    // methods: {
    //     toggleShowConfig() {
    //         console.log("tg")
    //         this.$store.commit('core/setShowConfig', true)
    //     }
    // }

}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
