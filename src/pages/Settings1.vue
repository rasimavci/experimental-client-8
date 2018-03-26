<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>Application Settings</v-ons-list-header>
      <v-ons-list-item v-for="animation in animations" :key="animation"
        modifier="chevron"
        @click="transition(animation)"
      >
        {{ animation }}
      </v-ons-list-item>
    </v-ons-list>

      <v-ons-list-header>Media Settings</v-ons-list-header>
      <v-ons-list-item>
        Adjust the volume:
        <v-ons-row>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon icon="md-volume-down"></v-ons-icon>
          </v-ons-col>   
        </v-ons-row>
        Volume: {{ volume }} <span v-show="Number(volume) > 80">&nbsp;(careful, that's loud)</span>
      </v-ons-list-item>
        
  </v-ons-page>
</template>

<script>
const transitionPage = {
  template: `
    <v-ons-page>
      <custom-toolbar backLabel="Back">
        {{ animation }}
      </custom-toolbar>
      <p style="text-align: center">
        Use the VOnsBackButton
      </p>
    </v-ons-page>
    `
};

const transitionPage2 = {
  template: `
    <v-ons-page>
      <custom-toolbar backLabel="Back">
        {{ animation }}
      </custom-toolbar>    
      <v-ons-list-header>PREFERRED SETTINGS</v-ons-list-header>
      <v-ons-list-item v-for="item in VibrationSettings" :key="item.id">
        {{ item }}
      </v-ons-list-item>
    </v-ons-list>
    </v-ons-page>
    `
};

const LanguageSetting = {
  template: `
    <v-ons-page>
      <custom-toolbar backLabel="Back">
        {{ animation }}
      </custom-toolbar>    
      <v-ons-list-header>PREFERRED LANGUAGE</v-ons-list-header>
      <v-ons-list-item v-for="item in LanguageSettings" :key="item.id">
        {{ item }}
      </v-ons-list-item>
    </v-ons-list>
    </v-ons-page>
    `
};

const LogSetting = {
  template: `
    <v-ons-page>
      <custom-toolbar backLabel="Back">
        {{ animation }}
      </custom-toolbar>    
      <v-ons-list-header>PREFERRED LOG</v-ons-list-header>
      <v-ons-list-item v-for="item in LogSettings" :key="item.id">
        {{ item }}
      </v-ons-list-item>
    </v-ons-list>
    </v-ons-page>
    `
};

export default {
  data() {
    return {
      animations: ['Language Settings', 'Vibration Settings', 'Log Settings', 'Bettery Settings'],
      VibrationSettings: ['CALL Mode','IM Mode'],
      volume: 25
    };
  },
  methods: {
     transition(name) {
if (name === 'Vibration Settings') {
    name = 'lift-md'
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });
        name = 'Vibration Settings'
      this.$store.commit('navigator/push', {
        extends: transitionPage2,
        data() {
          return {
            animation: name,
            VibrationSettings: ['CALL Mode','IM Mode']
          }
        }
      });
}    else if (name === 'Language Settings') {
        name = 'lift-md'    
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });
        name = 'Language Settings'
      this.$store.commit('navigator/push', {
        extends: LanguageSetting,
        data() {
          return {
            animation: name,
            LanguageSettings: ['Preferred Language']
          }
        }
      });
} else if (name === 'Log Settings') {
        name = 'lift-md'    
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });
        name = 'Log Settings'
      this.$store.commit('navigator/push', {
        extends: LogSetting,
        data() {
          return {
            animation: name,
            LogSettings: ['Log Level WARN']
          }
        }
      });
}            
    }
  }
};
</script>
