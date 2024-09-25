<!-- src/components/ProgressBar.vue -->
<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">{{ initials }}</span>
        <span>{{ description }}</span>
      </div>
      <div class="text-right">
        <p class="text-sm text-gray-600">{{ progress }}% complete</p>
        <p class="text-sm text-gray-600">{{ current }}/{{ target }}</p>
      </div>
      <button @click="openModal" class="text-blue-500 underline">Edit</button>
    </div>
    <div class="w-full bg-gray-200 h-2 rounded-full mt-2">
      <div class="h-2 rounded-full" :class="progressColor" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="text-sm text-gray-600 mt-2">Last updated {{ lastUpdated }}</p>
    <Modal
        v-if="isModalOpen"
        :isOpen="isModalOpen"
        :initialValue="current"
        @close="closeModal"
        @update="updateCurrent"
    />
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'ProgressBar',
  components: {
    Modal
  },
  props: {
    initials: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    lastUpdated: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  computed: {
    progress() {
      return Math.min((this.current / this.target) * 100, 100).toFixed(2);
    },
    progressColor() {
      if (this.progress < 50) return 'bg-red-500';
      if (this.progress < 75) return 'bg-yellow-500';
      return 'bg-green-500';
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateCurrent(newCurrent) {
      this.$emit('update-current', newCurrent);
    }
  }
};
</script>
