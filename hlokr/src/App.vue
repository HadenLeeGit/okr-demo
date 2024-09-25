<template>
  <div class="flex h-screen">
    <aside class="w-1/4 bg-gray-100 p-6">
      <div class="mb-8">
        <h1 class="text-xl font-bold">Michael Scott</h1>
        <p class="text-sm text-gray-600">demo+1@stepwisemethods.com</p>
      </div>
      <div class="mb-8">
        <h2 class="text-lg font-semibold">My Teams</h2>
        <ul class="mt-2 space-y-2">
          <li>Leadership Team</li>
          <li>People Team</li>
        </ul>
      </div>
      <div>
        <h2 class="text-lg font-semibold">My Direct Reports</h2>
        <ul class="mt-2 space-y-2">
          <li class="flex items-center space-x-2">
            <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">DS</span>
            <span>Dwight Schrute</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">JH</span>
            <span>Jim Halpert</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">RH</span>
            <span>Ryan Howard</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">TF</span>
            <span>Toby Flenderson</span>
          </li>
        </ul>
      </div>
    </aside>
    <main class="w-3/4 p-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">My Objectives</h2>
        <div class="flex space-x-4">
          <select class="border rounded px-3 py-2">
            <option>2019 Q1</option>
            <option>2019 Q2</option>
          </select>
          <button class="border rounded px-3 py-2">OBJECTIVES</button>
          <button class="border rounded px-3 py-2">KEY RESULTS</button>
        </div>
      </div>
      <div class="bg-blue-500 text-white p-6 rounded-lg mb-6">
        <div class="flex justify-between items-center">
          <div class="flex space-x-2">
            <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">MS</span>
            <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">DS</span>
            <span class="bg-gray-300 text-gray-700 px-2 py-1 rounded">Company</span>
          </div>
          <div class="text-right">
            <h3 class="text-xl font-semibold">Improve internal employee engagement</h3>
            <p class="text-sm">Progress</p>
            <p class="text-2xl font-bold">43%</p>
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <ProgressBar
            initials="TF"
            description="Conduct 3 monthly 'Fun Friday' all hands meetings with motivations speakers"
            :current="current1"
            :target="3"
            lastUpdated="9 months ago"
            @update-current="updateCurrent1"
        />
        <ProgressBar
            initials="TF"
            description="Interview 48 employees on their needs for improving our work culture."
            :current="current2"
            :target="48"
            lastUpdated="9 months ago"
            @update-current="updateCurrent2"
        />
        <ProgressBar
            initials="TF"
            description="Reach weekly employee satisfaction score of at least 4.7 points"
            :current="current3"
            :target="4.7"
            lastUpdated="9 months ago"
            @update-current="updateCurrent3"
        />
      </div>
    </main>
  </div>
</template>

<script>
import {ref} from 'vue';
import ProgressBar from './components/ProgressBar.vue';

export default {
  name: 'App',
  components: {
    ProgressBar
  },
  setup() {
    const current1 = ref(1);
    const current2 = ref(35);
    const current3 = ref(1);

    const updateCurrent1 = (newCurrent) => {
      current1.value = newCurrent;
    };

    const updateCurrent2 = (newCurrent) => {
      current2.value = newCurrent;
    };

    const updateCurrent3 = (newCurrent) => {
      current3.value = newCurrent;
    };

    return {
      current1,
      current2,
      current3,
      updateCurrent1,
      updateCurrent2,
      updateCurrent3
    };
  }
};
</script>

<style>
@import './style.css';
</style>
