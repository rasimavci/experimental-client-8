<template>
  <v-ons-page>
      <v-ons-list-header>Media Settings</v-ons-list-header>
      <v-ons-list-item>
        Adjust speakerphone:
        <v-ons-row>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon icon="md-volume-down"></v-ons-icon>
          </v-ons-col>
          <v-ons-col>

            <v-ons-range v-model="volume" style="width: 100%;"></v-ons-range>

          </v-ons-col>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon icon="md-volume-up"></v-ons-icon>
          </v-ons-col>
        </v-ons-row>
        Volume: {{ volume }} <span v-show="Number(volume) > 80">&nbsp;(careful, that's loud)</span>
      </v-ons-list-item>

      <v-ons-list-header>Video</v-ons-list-header>
      <ons-list-item>
        <label class="center" for="switch1">
          Video Enabled ({{ switchOn ? 'on' : 'off' }})
        </label>
        <div class="right">
          <v-ons-switch input-id="switch1" v-model="switchOn">
          </v-ons-switch>
        </div>
      </ons-list-item>
      <ons-list-item>
        <label class="center" for="switch2">
          {{ switchOn ? 'Send InitialVideo' : 'Disabled switch' }}
        </label>
        <div class="right">
          <v-ons-switch input-id="switch2" :disabled="!switchOn">
          </v-ons-switch>
        </div>
      </ons-list-item>

      <v-ons-list-header>Select</v-ons-list-header>
      <ons-list-item>
        <div class="center">
          <v-ons-select style="width: 120px" v-model="selectedItem">
            <option v-for="item in items" :value="item.value">
              {{ item.text }}
            </option>
          </v-ons-select>

        </div>
        <div class="right right-label">
          <s v-show="selectedItem !== 'Vue'">{{ selectedItem }}</s> Vue is awesome!
        </div>
      </ons-list-item>

      <v-ons-list-header>Radio buttons</v-ons-list-header>
      <v-ons-list-item v-for="(vegetable, $index) in vegetables" :key="vegetable"
        tappable
        :modifier="($index === vegetables.length - 1) ? 'longdivider' : ''"
      >
        <label class="left">
          <v-ons-radio
            :input-id="'radio-' + $index"
            :value="vegetable"
            v-model=" selectedVegetable"
          >
          </v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">
          {{ vegetable }}
        </label>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          I love {{ selectedVegetable }}!
        </div>
      </v-ons-list-item>

      <v-ons-list-header>Checkboxes - {{checkedColors}}</v-ons-list-header>
      <v-ons-list-item v-for="(color, $index) in colors" :key="color" tappable>
        <label class="left">
          <v-ons-checkbox
            :input-id="'checkbox-' + $index"
            :value="color"
            v-model="checkedColors"
          >
          </v-ons-checkbox>
        </label>
        <label class="center" :for="'checkbox-' + $index">
          {{ color }}
        </label>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      switchOn: true,
      items: [
        { text: 'Vue', value: 'Vue' },
        { text: 'React', value: 'React' },
        { text: 'Angular', value: 'Angular' }
      ],
      selectedItem: 'Vue',
      vegetables: ['Apples', 'Bananas', 'Oranges'],
      selectedVegetable: 'Bananas',
      colors: ['Red', 'Green', 'Blue'],
      checkedColors: ['Green', 'Blue'],
      volume: 25
    };
  }
};
</script>

<style scoped>
.right-icon {
  margin-left: 10px;
}
.right-label {
  color: #666;
}
</style>
