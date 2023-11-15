<template>
    <div>


        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Config</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <!-- <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Horde API Key</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Google</a>
                  </li> -->
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      User
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Horde Api Key</a></li>
                      <li><a class="dropdown-item" href="#">Google</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                  <!-- <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                  </li> -->
                </ul>
                <!-- <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form> -->
              </div>
            </div>
          </nav>

<hr>

        <b-navbar toggleable="lg" type="dark" variant="info"  >
            <b-navbar-brand href="#">Numerai</b-navbar-brand>
             
            <MenuView />

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                    <b-nav-item @click="showConfig = !showConfig"><b-button size="sm"
                            class="btn btn-secondary my-2 my-sm-0">⚙️</b-button></b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!-- <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form> -->

                    <!-- 
         <b-nav-item-dropdown text="Lang" right >
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown> -->

                    <b-nav-item-dropdown right >
                       
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown> 

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <BModal title="Config" v-model="showConfig">



        </BModal>
    </div>
</template>

<script>

import MenuView from '@/views/MenuView.vue';
export default {
    name: "NavBar",
    components: {
         MenuView
    },

    data() {
        return {
            show: true,
            showConfig: false
        }
    },
    mounted() {
        //this.showConfig = true
    },
    methods: {
        openMenu() {
            this.$store.commit('core/showMenu', true)
        }
    }
    // methods: {
    //     toggleShowConfig() {
    //         console.log("tg")
    //         this.$store.commit('core/setShowConfig', true)
    //     }
    // }

}
</script>

<style scoped></style>