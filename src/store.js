import createKandy from '../kandy.link.js'

export default {
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
};

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
      this.navigator.commit('SET_CONNECTED', true)
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
    store.commit('REFRESH_DIRECTORY', params.contacts)
    // store.dispatch ('refresh', params.contacts)
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