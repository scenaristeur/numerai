<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <!-- <hr>
    <br> -->

    <b-alert :model-value="true">
    {{ $t('disclaimer') }}

    <a href="https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage" target="_blank">models de language</a>.
    </b-alert>

    <div>
      How to contribute
      <ul>
        <li>
          <a href="https://github.com/scenaristeur/numerai/issues/1" target="_blank">Translate </a></li>
        <li>Create Adventures : <a href="https://github.com/scenaristeur/numerai/issues/3" target="_blank">Coming soon</a></li>
        <li>Enhance Code :
          <a href="https://github.com/scenaristeur/numerai/blob/main/README.md" target="_blank">
            source code & contribution
          </a>
        </li>

      </ul>

    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
