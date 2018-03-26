import 'onsenui/css/onsenui.css'; // Onsen UI basic CSS
// import 'onsenui/css/onsen-css-components.css'; // Default Onsen UI CSS components
import './onsen-css-components.css'; // Onsen UI CSS components source for custom themes (requires cssnext)
import createKandy from '../kandy.link.js'
import Vue from 'vue';
import Vuex from 'vuex';
import VueOnsen from 'vue-onsenui'; // For UMD
// import VueOnsen from 'vue-onsenui/esm'; // For ESM
// import * as OnsenComponents from './onsen-components'; // For ESM
import storeLike from './store.js';
import CustomToolbar from './partials/CustomToolbar.vue';
import AppNavigator from './AppNavigator.vue';

Vue.use(Vuex);
Vue.use(VueOnsen);

// Register components globally
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

var store = new Vuex.Store({
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {},
        currentPage: 'main',
        callstart: '',
        activeCall: { state: '', id: '',mediaState: '',muted: '' },
        user: {},
        calls: [],
        history: [],
        contacts: [],
        conversations: [],
        currentPageAddContact: false,
        historyFilterSelection: 'All Call',
        callPageInitialAction: '',
        isConnected: false        
      },
      mutations: {
        SET_ACTIVE_CALL (state, call) {
          console.log('set chat participant as ' + call)
          state.activeCall = call
        },
        SET_CONNECTED (state, connected) {
          console.log('set isConnected to ' + connected)
          state.isConnected = connected
        },
        REFRESH_CALLLOGS (state, logs) {
          console.log('refresh call logs')
          state.history = logs
          console.log(logs)
        },
        REFRESH_DIRECTORY (state, data) {
          console.log('data refreshed')
          if (data) state.contacts = data
        },
        UPDATE_CALLS (state, calls) {
          console.log('add call if not exist')
          state.calls = calls
          calls.forEach(function (call) {
            if (call.id === state.activeCall.id) {
              state.activeCall = call
            }
          })
        },                        
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      },
      actions: {
        updateDemoPosition ({commit}, top) {
          commit({type: 'updateDemoPosition', top: top})
        },
        connect ({ commit }, credentials) {
         // addEventListeners()
          console.log(
          'credentials' + credentials.username + ' ' + credentials.password
        )
          kandy.connect(credentials)
          addEventListeners()
          // commit({type: 'INITIALIZE_ACTIVE_CALL'})
        },
        disconnect ({ commit }) {
          kandy.disconnect()
        },
        call (params) {
          const options = {
            isAudioEnabled: true, // document.getElementById ('isAudioEnabled').checked,
            isVideoEnabled: false, // document.getElementById ('isVideoEnabled').checked,
            sendInitialVideo: false, // document.getElementById ('sendInitialVideo').checked,
            sendScreenShare: false, // document.getElementById ('sendScreenShare').checked,
            // localVideoContainer: this.$ref.local-container, // document.getElementById('local-container'),
            // remoteVideoContainer: this.$ref.remote-container //document.getElementById('remote-container')
            localVideoContainer: document.getElementById('local-container'),
            remoteVideoContainer: document.getElementById('remote-container')
          }

          console.log('call to:' + params.callee)
          params.callee = 'saynaci@genband.com'
          kandy.call.make(params.callee, options)
          // commit('SET_ACTIVECALL_STATE', 'IN_CALL')
          // commit('SET_ACTIVECALL', params)
        },
        end ({commit}, callee) {
          kandy.call.end(this.state.activeCall.id)
          // const calls = kandy.call.getAll()
          // calls.forEach(function (call) {
          //   if (call.id === this.state.vux.activeCall.id) {
          //     kandy.call.end(this.state.vux.activeCall.id)
          //   }
          // })
        },        
      }      
    },

    splitter: {
      strict: true,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: true,
      namespaced: true,
      state: {
        index: 1
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    }
  }
})


new Vue({
  el: '#app',
  render: h => h(AppNavigator),
  store: store,
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
  }
});

const kandy = createKandy({
  authentication: {
    subscription: {
      expires: 3600,
      service: ['IM', 'Presence', 'call'],
      protocol: 'https',
      server: 'spidr-ucc.genband.com',
      version: '1',
      port: '443'
    },
    websocket: {
      protocol: 'wss',
      server: 'spidr-ucc.genband.com',
      port: '443'
    }
  },
  logs: {
    logLevel: 'debug',
    enableFcsLogs: true
  },
  call: {
    chromeExtensionId: 'put real extension ID here',
    serverProvidedTurnCredentials: true,
    iceserver: [
      {
        url: 'stun:turn-ucc-1.genband.com:3478?transport=udp'
      },
      {
        url: 'stun:turn-ucc-2.genband.com:3478?transport=udp'
      },
      {
        url: 'turns:turn-ucc-1.genband.com:443?transport=tcp',
        credential: ''
      },
      {
        url: 'turns:turn-ucc-2.genband.com:443?transport=tcp',
        credential: ''
      }
    ]
  }
})

createKandy()

function addEventListeners () {
  kandy.on('auth:change', data => {
    console.log('auth:change Event Data: ' + JSON.stringify(data))
    if (kandy.getConnection().isConnected === true) {
      store.commit('navigator/SET_CONNECTED', true)
      //  store.dispatch ('refresh')
      kandy.contacts.refresh()
      kandy.call.history.fetch()
      // store.dispatch('getMessages')
      // this.refreshContacts ()
      // retrieveCallLogs ()
      // Kandyjs.getCallLogs ()
      // Kandyjs.fetchConversations ()
      // Kandyjs.searchDirectory ()
    }
    if (isEmpty(data)) {
      // store.commit('SET_CONNECTED', false)
    }
  })

  kandy.on('contacts:change', params => {
    store.commit('navigator/REFRESH_DIRECTORY', params.contacts)
  })  

  kandy.on('callHistory:change', params => {
    let logs = kandy.call.history.get()
    store.commit('REFRESH_CALLLOGS', logs)
  })

}
function isEmpty (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}