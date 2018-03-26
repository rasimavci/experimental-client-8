<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <section style="margin: 16px">
      <br><br>

      <v-ons-button modifier="large" class="button-margin" disabled>START COLLABORATION</v-ons-button>
    </section>

    <v-ons-fab position="top right">
      <v-ons-icon icon="md-face"></v-ons-icon>
    </v-ons-fab>

    <v-ons-fab position="bottom left">
      <v-ons-icon icon="md-car"></v-ons-icon>
    </v-ons-fab>

    <v-ons-speed-dial position="bottom right" direction="up"
      :open.sync="spdOpen"
    >
      <v-ons-fab>
        <v-ons-icon icon="md-share"></v-ons-icon>
      </v-ons-fab>

      <v-ons-speed-dial-item v-for="(icon, name) in shareItems" :key="name"
        @click="$ons.notification.confirm(`Share on ${name}?`)"
      >
        <v-ons-icon :icon="icon"></v-ons-icon>
      </v-ons-speed-dial-item>

    </v-ons-speed-dial>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      spdOpen: false,
      shareItems: {
        'Twitter': 'md-twitter',
        'Facebook': 'md-facebook',
        'Google+': 'md-google-plus'
      }
    };
  }
};
</script>

<style scoped>
.button-margin {
  margin: 6px 0;
}
</style>
