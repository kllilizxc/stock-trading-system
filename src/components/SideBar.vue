<template>
  <div>
    <md-button id="side-bar-switch" class="md-icon-button" @click.native="toggleSideNav">
      <md-icon>menu</md-icon>
    </md-button>
    <md-sidenav class="md-left md-fixed" ref="sideBar">
      <div id="user-info">
        <router-link to="/SignIn" @click.native="toggleSideNav">
          <span id="user-name">登陆</span>
          <md-avatar id="user-avatar" class="md-large">
            <img src="//placeimg.com/40/40/people/1" />
          </md-avatar>
        </router-link>
      </div>
      <md-list>
        <md-list-item v-for="link in links">
          <router-link :to="link.to" @click.native="toggleSideNav">
            <md-icon>{{ link.icon }}</md-icon>
            <span>{{ link.text }}</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        links: [
          { icon: 'search', text: '查询', to: '/Search' },
          { icon: 'shopping', text: '交易', to: '/Deal' },
          { icon: 'subject', text: '流水记录', to: '/Record' }
        ]
      }
    },
    methods: {
      toggleSideNav () {
        this.$refs.sideBar.toggle()
      }
    }
  }
</script>

<style scoped>
  #side-bar-switch {
    position: fixed;
    left: 16px;
    top: 16px;
  }

  #user-info {
    width: 100%;
    height: 160px;
    background-color: #eee;
    margin-bottom: 32px;
  }

  #user-avatar {
    position: absolute;
    top: 128px;
    left: 16px;
    z-index: 99;
  }

  #user-name {
    color: #000;
    position: absolute;
    top: 128px;
    left: 96px;
  }
</style>
