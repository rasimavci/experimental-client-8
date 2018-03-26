<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo">
      <v-ons-segment v-if="!md"
        tabbar-id="infinite-scroll-tabbar"
        style="width: 200px"
      >
        <button>Load More Contact</button>
        <button>Lazy Repeat</button>
      </v-ons-segment>
    </custom-toolbar>

    <v-ons-tabbar id="infinite-scroll-tabbar" position="auto">
      <template slot="pages">

        <!-- Load more items on scroll bottom -->
        <v-ons-page :infinite-scroll="loadMore">
          <p class="intro">
            Useful for loading more items when the scroll reaches the bottom of the page, typically after an asynchronous API call.<br><br>
          </p>

          <v-ons-list>
            <v-ons-list-item v-for="call in getCalls" :key="call">
            {{call.calleeName}} {{call.state}} {{call.startTime}}
            </v-ons-list-item>
          </v-ons-list>

          <div class="after-list">
            <v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>
          </div>
        </v-ons-page>

        <!-- Lazy load thousands of items -->
        <v-ons-page>
          <p class="intro">
            Automatically unloads items that are not visible and loads new ones. Useful when the list contains thousands of items.<br><br>
          </p>

          <v-ons-list>
            <v-ons-lazy-repeat :render-item="renderItem" :length="3000"></v-ons-lazy-repeat>
          </v-ons-list>
        </v-ons-page>
      </template>

      <v-ons-tab label="Load More" active></v-ons-tab>
      <v-ons-tab label="Lazy Repeat"></v-ons-tab>
    </v-ons-tabbar>

  </v-ons-page>
</template>

<script>
import Vue from 'vue';
// import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: []
    };
  },
  beforeMount() {
    for (let i = 0; i < 30; i++) {
      this.list.push(i);
    }
  },
  methods: {
    loadMore(done) {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + i);
        }
        done();
      }, 600)
    },

    renderItem(i) {
      return new Vue({
        template: `
          <v-ons-list-item :key="index">
            Item #{{ index }}
          </v-ons-list-item>
        `,
        data() {
          return {
            index: i
          };
        }
      });
    }
  },
  computed: {
    getCalls () {
      return this.$store.state.navigator.calls
    }
  }  
};
</script>

<style scoped>
.after-list {
  margin: 20px;
  text-align: center;
}
</style>
