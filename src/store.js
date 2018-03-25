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
        activeCall: { state: '', id: '' },
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
