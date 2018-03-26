import objectAssign from 'object-assign'

import Vue from 'vue'

import App from './App'

import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import createKandy from '../kandy.link.js'
import IMService from 'index.js'
import _ from 'lodash'

Vue.use(VueRouter)
Vue.use(Vuex)

require('es6-promise').polyfill()

/** i18n **/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

const vuxLocales = require('json-loader!yaml-loader!./locales/all.yml')
const componentsLocales = require('json-loader!yaml-loader!./locales/components.yml')

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'es': objectAssign(vuxLocales['es'], componentsLocales['es']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

import { DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

Vue.use(LocalePlugin)
const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else if (/es/.test(nowLocale)) {
  Vue.i18n.set('es')
} else {
  Vue.i18n.set('en')
}

// let callId
let local = document.getElementById('local-container')
let remote = document.getElementById('remote-container')
const myVideoResolution = {
  height: 640,
  width: 480
}

const options = {
  isAudioEnabled: true, // document.getElementById ('isAudioEnabled').checked,
  isVideoEnabled: false, // document.getElementById ('isVideoEnabled').checked,
  sendInitialVideo: false, // document.getElementById ('sendInitialVideo').checked,
  sendScreenShare: false, // document.getElementById ('sendScreenShare').checked,
  videoResolution: myVideoResolution,
  // localVideoContainer: this.$ref.local-container, // document.getElementById('local-container'),
  // remoteVideoContainer: this.$ref.remote-container //document.getElementById('remote-container')
  localVideoContainer: local, // document.getElementById ('local-container'), //olmadi this.$refs.container1, //
  remoteVideoContainer: remote // document.getElementById ('remote-container'),
}

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    joinStarted: false,
    direction: 'forward',
    showPlacement: 'left',
    currentPage: 'main',
    activeCallRinging: '',
    activeCallExist: '',
    activeCallInCall: '',
    activeCallOnHold: '',
    activeCallEnded: '',
    activeCallState: '',
    callstart: '',
    activeCall: { state: '', id: '',mediaState: '',muted: '' },
    user: {},
    calls: [],
    history: [],
    contacts: [],
    conversations: [],
    conversations2: [],
    currentPageAddContact: false,
    historyFilterSelection: 'All Call',
    callPageInitialAction: '',
    isConnected: false
  },

  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    updateShowPlacement (state, payload) {
      console.log('mutated with ' + payload.top)
      state.showPlacement = payload.top
    },
    updateCurrentPage (state, payload) {
      console.log('mutated with ' + payload.top)
      state.currentPage = payload.top
    },

    SET_CALLPAGE_INITIAL_ACTION (state, payload) {
      console.log('mutated with ' + payload.top)
      state.callPageInitialAction = payload.top
    },
    SET_USER_WITHID ({commit}, top) {
      console.log('dispatching with ' + top)
    },
    INITIALIZE_ACTIVE_CALL (state) {
      state.activeCall.state = ''
      state.activeCall.mediaSate = ''
      state.activeCall.muted = ''
      state.activeCall.state = ''
    },
    SET_ACTIVECALL_STATE  (state, top) {
      state.activeCall.state = top
      state.activeCallState = top
    },
    SET_ACTIVECALL_ID  (state, top) {
      state.activeCall.id = top
      // state.activeCallState = top
    },
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
    SET_PRESENCE (state, args) {
      const params = {
        status: '',
        activity: '',
        note: args[1]
      }
      console.log('Peer: setPresence state.. : ' + args[0])

      switch (args[0]) {
        case '0':
          params.status = 'open'
          params.activity = 'unknown'
          break
        case '1':
          params.status = 'closed'
          params.activity = 'unknown'
          break
        case '2':
          params.status = 'open'
          params.activity = 'away'
          break
        case '3':
          params.status = 'open'
          params.activity = 'lunch'
          break
        case '4':
          params.status = 'closed'
          params.activity = 'busy'
          break
        case '5':
          params.status = 'closed'
          params.activity = 'vacation'
          break
        case '6':
          params.status = 'open'
          params.activity = 'other'
          params.note = 'be right Back'
          break
        default:
          break
      }
    },
    UPDATE_JOIN_STARTED (state, payload) {
      console.log('mutated with ' + payload.top)
      state.joinStarted = true
    },
    UPDATE_ADDCONTACT (state, payload) {
      console.log('mutated with ' + payload.top)
      state.currentPageAddContact = true
    },
    UPDATE_HISTORYFILTER (state, payload) {
      console.log('mutate historyFilterSelection ' + payload.top)
      state.historyFilterSelection = payload.top
    },
    REFRESH_DIRECTORY (state, data) {
      console.log('data refreshed')
      if (data) state.contacts = data
    },
    SET_CONVERSATIONS (state, conversations) {
      state.conversations = conversations
      state.conversations2 = state.conversations[1]
    },
    ADD_CONVERSATION (state, conversation) {
      state.conversations.push(conversation)
      state.conversations2.push(state.conversations[1])
    },
    UPDATE_CALLS (state, calls) {
      console.log('add call if not exist')
      state.calls = calls
      calls.forEach(function (call) {
        if (call.id === state.activeCall.id) {
          state.activeCall = call
        }
      })
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
      commit({type: 'INITIALIZE_ACTIVE_CALL'})
    },
    disconnect ({ commit }) {
      kandy.disconnect()
    },
    updateShowPlacement ({commit}, top) {
      console.log('dispatching updateShowPlacement with ' + top)
      commit({type: 'updateShowPlacement', top: top})
    },
    updateCurrentPage ({commit}, top) {
      console.log('dispatching updateCurrentPage with ' + top)
      commit({type: 'updateCurrentPage', top: top})
    },
    setCallPageInitialAction ({commit}, top) {
      console.log('dispatching setCallPageInitialAction with ' + top)
      commit({type: 'SET_CALLPAGE_INITIAL_ACTION', top: top})
    },
    updateAddContact ({commit}, top) {
      console.log('dispatching with ' + top)
      commit({type: 'UPDATE_ADDCONTACT', top: true})
    },
    updateHistoryFilter ({commit}, top) {
      console.log('dispatching UPDATE_HISTORYFILTER with ' + top)
      commit({type: 'UPDATE_HISTORYFILTER', top: top})
    },
    selectContactToAddCall ({commit}, top) {
      console.log('selecting contact to add call ' + top)
      commit({type: 'UPDATE_JOIN_STARTED', top: true})
    },
    call ({commit}, params) {
      console.log('call to:' + params.callee)
      params.callee = 'saynaci@genband.com'
      options.isVideoEnabled = true // params.mode
      options.sendInitialVideo = params.mode
      options.localVideoContainer = params.localVideoContainer
      options.remoteVideoContainer = params.remoteVideoContainer
      kandy.call.make(params.callee, options)
      commit('SET_ACTIVECALL_STATE', 'IN_CALL')
      commit('SET_ACTIVECALL', params)
    },
    end ({commit}, callee) {
      kandy.call.end(this.state.vux.activeCall.id)
      // const calls = kandy.call.getAll()
      // calls.forEach(function (call) {
      //   if (call.id === this.state.vux.activeCall.id) {
      //     kandy.call.end(this.state.vux.activeCall.id)
      //   }
      // })
    },
    reject ({ context }) {
    //   context.commit(types.CALL_REJECT)
    },
    ignore ({ context }) {
    // context.commit(types.CALL_IGNORE)
    },
    hold (context) {
      kandy.call.hold(this.state.vux.activeCall.id)
    },
    unhold (context) {
      kandy.call.unhold(this.state.vux.activeCall.id)
    },
    mute (context) {
      kandy.call.mute(this.state.vux.activeCall.id)
    },
    unmute (context) {
      kandy.call.unmute(this.state.vux.activeCall.id)
    },
    startVideo (context) {
      kandy.call.startVideo(this.state.vux.activeCall.id)
    },
    stopVideo (context) {
      kandy.call.stopVideo(this.state.vux.activeCall.id)
    },
    getMessages: ({ commit }) => {
      let messages = IMService.getMessages()
      let conversations = _.cloneDeep(messages)
      commit({type: 'SET_CONVERSATIONS', conversations})
      // store.dispatch('setConversations', _.cloneDeep(messages))
    },
    sendMessage: ({ commit }, messageToSend) => {
      console.log('console sends message' + messageToSend.text)
      let conv = kandy.conversation.get(messageToSend.userId)
      let part = {
        type: messageToSend.type,
        text: messageToSend.text
      }
      let message = conv.createMessage(part)
      message.send()
    }
  },
  getters: {
  //  mystate: state => return state.vux.currentPageAddContact
  }
})

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}

const wx = Vue.wechat
const http = Vue.http

/**
* -------------------------- WeChat to share ----------------------
* Please do not copy the following code directly
*/

if (process.env.NODE_ENV === 'production') {
  wx.ready(() => {
    console.log('wechat ready')
    wx.onMenuShareAppMessage({
      title: 'VUX', // Share title
      desc: 'Mobile UI component library based on WeUI and Vue',
      link: 'https://vux.li?x-page=wechat_share_message',
      imgUrl: 'https://static.vux.li/logo_520.png'
    })

    wx.onMenuShareTimeline({
      title: 'VUX', // Share title
      desc: 'Mobile UI component library based on WeUI and Vue',
      link: 'https://vux.li?x-page=wechat_share_timeline',
      imgUrl: 'https://static.vux.li/logo_520.png'
    })
  })

  const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage'])
  const url = document.location.href
  http.post('https://vux.li/jssdk?url=' + encodeURIComponent(url.split('#')[0]) + '&jsApiList=' + permissions).then(res => {
    wx.config(res.data.data)
  })
}

const FastClick = require('fastclick')
FastClick.attach(document.body)

// The following line will be replaced with by vux-loader with routes in ./demo_list.json
const routes = []

const router = new VueRouter({
  routes
})

Vue.use(CloseDialogsPlugin, router)

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // Judge whether ios left slide back
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// This line is used to create a new instans of Kandy
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

function addEventListeners () {
  kandy.on('auth:change', data => {
    console.log('auth:change Event Data: ' + JSON.stringify(data))
    if (kandy.getConnection().isConnected === true) {
      store.commit('SET_CONNECTED', true)
      //  store.dispatch ('refresh')
      kandy.contacts.refresh()
      kandy.call.history.fetch()
      store.dispatch('getMessages')
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

  kandy.on('call:start', params => {
    // commit('SET_ACTIVECALL_ID', params.callId)
    store.commit({type: 'SET_ACTIVECALL_ID', top: params.callId})
    const calls = kandy.call.getAll()
    calls.forEach(function (call) {
      console.log('all call ids currently : ' + params.callId)
      // change activeCall
      if (call.id === params.callId) {
        store.commit('SET_ACTIVE_CALL', call)
        // store.dispatch('toggleActiveCall')
        // store.commit (types.SET_ACTIVE_CALL, call)
      }
    })
  })

  kandy.on('callHistory:change', params => {
    let logs = kandy.call.history.get()
    store.commit('REFRESH_CALLLOGS', logs)
  })

  kandy.on('contacts:change', params => {
    store.commit('REFRESH_DIRECTORY', params.contacts)
    // store.dispatch ('refresh', params.contacts)
  })

  kandy.on('conversations:change', res => {
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    store.dispatch('getMessages')
  })

  kandy.on('conversations:new', params => {
    console.log('new conversation' + params.conversation)
    store.commit('ADD_CONVERSATION', params.conversation)
  })

  kandy.on('messages:change', res => {
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    store.dispatch('getMessages')
  })

  kandy.on('messages:error', res => {
    console.log(res)
  })

  kandy.on('call:stateChange', function (call) {
    // store.commit('SET_ACTIVECALL_STATE', call.state)
    // store.commit('SET_ACTIVECALL', call)
    // store.commit('SET_ACTIVE_CALL', call)
    const calls = kandy.call.getAll()
    store.commit('UPDATE_CALLS', calls)
    kandy.call.getAll().filter(function (call) {
      // if (call.state === 'IN_CALL') {
      //   store.dispatch('setActiveCallId', { callId: call.id })
      // } else if (call.state === 'ENDED') {
      //   store.dispatch('toggleActiveCall')
      // }
    })
      // kandy.contacts.search(state.lastCallee, 'USERNAME')
  })
}

createKandy()
kandy.connect('ravci@genband.com')

function isEmpty (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
