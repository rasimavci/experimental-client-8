<template>
  <v-ons-page modifier="white">
    <div class="profile-pic">
      <img src="../assets/kandylogo.png">
    </div>

    <v-ons-list-title>Access</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="(item, index) in access" :key="item.title"
        :modifier="md && 'nodivider'"
        @click="loadView(index)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="fa-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list-title>Links</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in links" :key="item.title"
        :modifier="md && 'nodivider'"
        @click="loadLink(item.url)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="fa-external-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  methods: {
    loadView(index) {
      this.$store.commit('tabbar/set', index + 1);
      this.$store.commit('splitter/toggle');
    },
    loadLink(url) {
      window.open(url, '_blank');
    }
  },
  data() {
    return {
      links: [
        {
          title: 'Settings',
          icon: 'cog',
          url: 'https://onsen.io/v2/docs/guide/vue/'
        }
      ],
      access: [
        {
          title: 'Home',
          icon: 'ion-home, material:md-home'
        },
        {
          title: 'Forms',
          icon: 'ion-edit, material:md-edit'
        },
        {
          title: 'Animations',
          icon: 'ion-film-marker, material: md-movie-alt'
        },
        {
          title: 'Favorites',
          icon: 'star, material:md-home'
        },
        {
          title: 'Contacts',
          icon: 'address-book, material:md-edit'
        },
        {
          title: 'Inbox',
          icon: 'inbox, material: md-movie-alt'
        },
        {
          title: 'History',
          icon: 'clock, material:md-home'
        },
        {
          title: 'Dialpad',
          icon: 'phone, material:md-edit'
        },
        {
          title: 'Sessions',
          icon: 'list, material: md-movie-alt'
        },
        {
          title: 'Collaboration',
          icon: 'ion-document-text, material: md-movie-alt'
        }                     
      ]
    };
  }
};
</script>

<style scoped>
.profile-pic {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #DDD;
  color: rgba(0, 0, 0, .56);
  padding-bottom: 8px;
}
.page--material .profile-pic {
  background-color: #f6f6f6;
}

.profile-pic > img {
  display: block;
  max-width: 100%;
}
</style>

<style>
.page--material__background.page--white__background {
  background-color: #fff;
}
</style>
