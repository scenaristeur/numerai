<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Le contexte</template>
    A la suite d'un malencontreux accident, vous vous retrouverez sur la planète Num 7 erAi,
    une terre inexplorée où l'intelligence artificielle règne en maître.
    Votre objectif sera de découvrir les secrets cachés de cette planète
    afin de permettre à votre équipe de participer au hackathon interplanétaire sur l'IA.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>L'aventure</template>

    Ne manquez pas cette occasion incroyable de vous lancer dans l'aventure du siècle et de découvrir les merveilles de
    l'intelligence artificielle. Embarquez dès maintenant dans la navette spatiale et préparez-vous à être fasciné par les
    trésors cachés de Num 7 erAi ! 🌏🚀

    <!-- <br />

    More instructions are available in <code>README.md</code>. -->
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>La collaboration</template>

    N'hésitez pas à partager cette aventure avec vos amis et à les inviter à rejoindre notre communauté d'explorateurs
    d'AI.
    Nous sommes ravis de vous accueillir dans ce monde unique et poussif, où les limites sont celles que vous vous
    donnerez.

  </WelcomeItem>
  <!-- 
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>. You
    should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem> -->
</template>


