<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>{{ $t('context_title') }}</template>
    {{ $t('context_content') }}
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>{{ $t('adventure_title') }}</template>

    {{ $t('adventure_content') }} 🌏🚀

    <!-- <br />

    More instructions are available in <code>README.md</code>. -->
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>

      <CommunityIcon />
    </template>
    <template #heading>{{ $t('collab_title') }}</template>

    {{ $t('collab_content') }} <br>
    <br>

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <!-- <template #heading>{{ $t('collab_title') }}</template>

    {{ $t('collab_content') }} <br>
    <br> -->

    <!-- <RouterLink to="/chat" class="btn">{{ $t('Commencer') }}</RouterLink> -->


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

<style>
  /* Adding some basic styling to button */

.btn {
    margin: 10px 2px 10px 2px;
    text-decoration: none;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    background-color: green;
    color: #fff;
    border-radius: 5px;
    box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    outline: none;
    transition: 0.2s all;

}

/* Adding transformation when the button is active */

.btn:active {
    transform: scale(0.98);
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    /* Lowering the shadow */
}
</style>


