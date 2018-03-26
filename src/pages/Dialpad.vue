<template>
 <v-ons-page>
  <div id='dialpad'>

    <div class='modal-container1'>
      <div class='input-group flex1' v-show="activeCall.state !== 'RINGING'">
        <label class="center">
          <v-ons-input float maxlength="20"
            placeholder="Enter a name or Number..."
            v-model="name"
          >
          </v-ons-input>
        </label>

        <span class='input-group-btn'>
          <button class='backspace-button' type='button' @click="callee = ''">
            <i class='material-icons'></i>
                    <img slot="icon" src="../assets/demo/backspace_blue.png">

          </button>
        </span>
      </div>      
      <div class='modal-container2'>
        </div>
    <div class='modal-container' display='none'>


      <div align='center' class='h3' v-show="activeCall.state !== 'RINGING'">
        <h3>
          {{activeCallState}}
        </h3>

        <img class='media-object pull-center' :src='user'/>
      </div>
      <div class='keypad' >
        <div class='keypad-container' v-show="activeCall.state !== 'RINGING'">
          <div>
            <button class='button' @click='press(1)'>
              <div class='keypad-button-number'>1</div>
              <div class='keypad-button-text'></div>
            </button>
            <button class='button' @click='press(2)'>
              <div class='keypad-button-number'>2</div>
              <div class='keypad-button-text'>
                ABC
              </div>
            </button>
            <button class='button' @click='press(3)'>
              <div class='keypad-button-number'>3</div>
              <div class='keypad-button-text'>
                DEF
              </div>
            </button>
          </div>
          <div>
            <button @click='press(4)'>
              <div class='keypad-button-number'>4</div>
              <div class='keypad-button-text'>
                GHI
              </div>
            </button>
            <button @click='press(5)'>
              <div class='keypad-button-number'>5</div>
              <div class='keypad-button-text'>
                JKL
              </div>
            </button>
            <button class='button' @click='press(6)'>
              <div class='keypad-button-number'>6</div>
              <div class='keypad-button-text'>
                MNO
              </div>
            </button>
          </div>
          <div>
            <button class='button' @click='press(7)'>
              <div class='keypad-button-number'>7</div>
              <div class='keypad-button-text'>
                PQRS
              </div>
            </button>
            <button class='button' @click='press(8)'>
              <div class='keypad-button-number'>8</div>
              <div class='keypad-button-text'>
                TUV
              </div>
            </button>
            <button class='button' @click='press(9)'>
              <div class='keypad-button-number'>9</div>
              <div class='keypad-button-text'>
                WXYZ
              </div>
            </button>
          </div>
          <div>
            <button class='button' @click="press('*')">
              *
            </button>
            <button class='button' @click='press(0)'>
              0
            </button>
            <button class='button' @click="press('#')">
              #
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

   </div>
 </v-ons-page>  
</template>

<script>
import { mapState } from 'vuex'

// import KandyJs from '../kandy'
// import { mapActions, mapGetters } from 'vuex
// import { activeCall } from '../store/getters'

export default {
  name: 'modalNewCall',
  created: function () {
    console.log('showPlacement value ')
    this.$store.dispatch('navigator/updateCurrentPage', 'dialpad')
    // this.$store.dispatch('updateShowPlacement', 'right')
  },
  data () {
    return {
      myText: 'de',
      textAreaVisible1: false,
      textAreaVisible: false,
      hasCollaborationService: false,
      isShowKeypad: true,
      callee: '',
      joinClicked: false,
      activeNote: '',
      filterByStatus: '',
      filterToggle: false,
      target: '',
      show: 'all',
      options: [
        {
          label: 'Personal Address Book',
          value: 1
        },
        {
          label: 'Global Address Book',
          value: 2
        }
      ]
    }
  },

  computed: mapState({
    user: state => state.navigator.user,
    activeCall: state => state.navigator.activeCall,
    callstart: state => state.navigator.callstart,
    // callState: state => { if(callState === 'RINGING') { return true } else {return false}},
    isloadingComplete: state => state.navigator.isloadingComplete,
    busy: state => state.navigator.busy
  }),
  components: {
  },
  /*
  computed: {
    getState () {
      if (this.$store.state.activeCall.state === 'Ringing'){
        console.log('active call state ' + this.$store.state.activeCall.state)
        return true
      } else {
        return false
      }
    }
  },
  */
  /*
  computed: {
    ...mapGetters(['newCallModal', 'calls', 'history', 'activeCall', 'activeVideoCall', 'incomingCall', 'activeCallId']),
    getContacts () {
      if (this.show === 'all'){
        console.log(this.history)
        return state.calls
      } else if (this.show === 'favorites') {
        return this.calls.filter(call => call.state !== 'ENDED')
      }
    },
   getState: function () {
     if(this.activeCall){
       return this.activeCall.state
     } else{
        return this.calls[0].state
      }
    }
  },
  */
  methods: {
    // ...mapActions(['hold','unhold','mute','unmute','call','join','directTransfer','end','updateActiveCall', 'toggleActiveVideoCall', 'toggleActiveCall', 'setIncomingCall']),
    getState1: function () {
      if (this.$store.state.activeCall.state === 'Ringing') {
        console.log('active call state ' + this.$store.state.activeCall.state)
        return true
      } else {
        return false
      }
    },
    connect: function (progress) {
      this.$store.dispatch('connect', {
        username: 'oztemur@genband.com',
        password: 'Genband.1234'
      })
    },
    press (character) {
      this.callee = this.callee + character
      // vm.dialValue = vm.dialValue + '6'
    },
    openNewCallModal () {
      this.toggleNewCallModal()
    },
    changed (selected) {
      console.log(selected)
    },
    updateCall (call) {
      if (this.joinClicked) {
        this.join(call.id)
        this.joinClicked = false
        console.log(
          'call to join selected: ' + this.activeCall.id + ' with ' + call.id
        )
      } else {
        this.updateActiveCall(call)
        console.log('update active call')
      }
    },
    goCallPage (mode) {
      this.$store.dispatch('setCallPageInitialAction', mode)
      this.$router.push('call')
  //   this.$store.commit('SET_USER_WITHID', 'saynaci@genband.com')
    //   console.log('activeCall State ' + this.activeCallState)
    //   console.log('activeCall State ' + this.activeCall.state)
    //   //     this.$store.dispatch('call', 'bkocak@genband.com')
    //   if (this.activeCallState === 'ENDED' || this.activeCallState === '') {
    //     const params = {
    //       callee: 'saynaci@genband.com',
    //       mode: mode
    //     }

    //     //  this.SET_CALL_OPTIONS(options)
    //     //    let incomingCallData = {
    //     //      callId: this.incomingCall.callId,
    //     //      active: false
    //     //    }
    //     // this.setIncomingCall(incomingCallData)
    //     this.$store.dispatch('call', options)
    //     //  this.$store.dispatch.answer(this.incomingCall.callId)
    //   // } else {
    //   //   this.$store.dispatch('end')
    //   } else {
    //     // debugger
    //     // this.toggleActiveCall()
    //     // debugger
    //     this.$store.dispatch('end')
    //   }
    //   console.log('make call started')
    },
    makeCall2 () {
      // this.$router.push('call')
      // this.$store.dispatch('call', 'saynaci@genband.com')
    },
    sendMessage () {
      let messageToSend = {
        type: 'IM',
        text: this.myText, // 'deneme', // this.callee
        userId: this.callee // 'bkocak@genband.com'
      }
      console.log('send clicked')
      this.$store.dispatch('sendMessage', messageToSend)
    },
    sendMessage2 () {
      const messageObject = {
        participant: 'oztemur@genband.com',
        message: this.callee
      }
      this.$store.dispatch('send', messageObject)
    },
    getPresence () {
      console.log('presence clicked')
      this.$store.dispatch('presenceUpdate', '')
    },
    presenceSubscribe () {
      console.log('presence clicked')
      this.$store.dispatch('presenceSubscribe', '')
    },

    toggleHold () {
      if (this.$store.state.activeCall.state !== 'Call on Hold') {
        console.log('hold call')
        this.$store.dispatch('hold')
      } else {
        console.log('unhold call')
        this.$store.dispatch('unhold')
      }
    },
    toggleVideo () {
      console.log('try' + this.$store.state.activeCall.state)
      if (!this.$store.state.activeCall.state || this.$store.state.activeCall.state === 'Call ended') {
        this.$store.dispatch('callVideo', 'saynaci@genband.com')
      } else if (this.$store.state.activeCall.sendingVideo) {
        // this.toggleActiveVideoCall()
        console.log('stop video')
        this.$store.dispatch('stopVideo')
      } else {
        // this.toggleActiveVideoCall()
        console.log('start video')
        this.$store.dispatch('startVideo')
      }
    },
    toggleMute () {
      if (this.$store.state.activeCall.muted) {
        this.$store.dispatch('unmute')
      } else {
        this.$store.dispatch('mute')
        console.log('mute call')
      }
    },
    joinCall () {
      this.joinClicked = true
      console.log('select a cal to merge with ' + this.activeCall.id)
    },
    toggleCall (state) {
      if (state === 'ENDED') {
        this.$store.dispatch.call('bkocak@genband.com')
      } else {
        this.$store.dispatch.end()
        console.log('unhold call')
      }
    },
    toggleScreenshare (isScreensharing) {
      if (isScreensharing) {
        this.$store.dispatch.stopScreenshare()
      } else {
        this.$store.dispatch.startScreenshare()
        console.log('start Screenshare')
      }
    },
    transferCall () {
      this.$store.dispatch.directTransfer(this.target)
      console.log('started transfer call to ' + this.target)
    },
    endCall () {
      this.$store.dispatch('end')
      console.log('end call')
    },
    showActiveCallRinging () {
      console.log('activeCall state ' + this.$store.state.activeCall.state)
    },
    closeModal () {
      if (event.target.id === 'ModalNewCall') {
        this.callee = ''
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
.btn-group button {
    background-color: #4CAF50; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */
}

.h3 {
  color: #1abc9c;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container1 {
  width: 430px;
  height: 930px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container2 {
  padding-top: 470px;
}


.modal-container {
  width: 430px;
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0;
}

.keypad {
  text-align: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 0px solid black;
}

.input-number {
  width: 100%;
  margin: 0 auto;
  /* margin-top: 5px; */
  border: 0;
  background-color: #eceff0;
  height: 50px;
  font-size: 1.5em;
  text-align: center;
}

.keypad-container {
  overflow: hidden;
  border: 0px
}

.keypad-container div {
  width: 100%;
  border: 0px
}

.keypad-container div button {
  width: 33.33%;
  padding: 0;
  margin: 0;
  display: block;
  float: left;
  height: 70px;
  border: 1px solid gray;
  background: white;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  font-size: 1.5em;
  margin: 5px 0;
}


.keypad-button-number {
  font-size: 28px;
  display: block;
  margin: 18px auto 5px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 22px;
  text-align: center;
}

.keypad-button-text {
  font-size: 12px;
  display: block;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.5);
  line-height: 12px;
  text-align: center;
  height: 12px;
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  height: 50px;
  width: 10px;
}

.dialpad-button {
  width: 84px;
  height: 72px;
  border-bottom: 1px solid;
  float: left;
}

.keypad-menu {
  text-align: center;
}

.keypad-menu button {
  width: 64px;
  height: 64px;
  margin: 10px;
  border-radius: 32px;
  background-color: gray;
  padding: 0;
}

.keypad-menu button:hover {
  background-color: #1E90FF;
}

.keypad-menu myhover {
  background-color: #1abc9c;
}

.dialpad-button:hover {
  background-color: blue;
}

.dialpad-button .number {
  font-size: 28px;
  display: block;
  margin: 18px auto 5px;
  color: black;
  line-height: 22px;
  text-align: center;
}

.dialpad-button .letters {
  font-size: 12px;
  display: block;
  margin: 0 auto;
  color: darkgray;
  line-height: 12px;
  text-align: center;
}

.hide-keypad {
  max-height: 0px;
  transition: max-height 0.25s ease-in;
}

.backspace-button {
  background: white;
  border: 0px;
}
.keypad-container button{
  border: none !important;
  border-radius: 0px !important;
  color: #1E90FF !important;
}

.keypad-container button div{
  color: #1E90FF !important;
}

.keypad-container button:hover {
  background-color: #1abc9c;
}
.keypad-container button:hover div {
  /* background-color: #1abc9c; */
  color: white !important;
}

#block_container
{
    text-align:center;
}

#bloc1
{
    position: absolute;
    bottom: 0;
}

#bloc2
{
    display:inline;
    float:right;
}

#localVideoContainer, #remoteVideoContainer{
  height: 200px;
}

.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.flex1 {
  border: 0px solid black;
}

</style>
