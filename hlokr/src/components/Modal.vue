<!-- src/components/Modal.vue -->
<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-semibold mb-4">Update Current Value</h2>
      <label class="block mb-2">New Current Value</label>
      <input
          type="number"
          v-model="newValue"
          class="border rounded px-3 py-2 w-full mb-4"
          min="0"
      />
      <div class="flex justify-end space-x-4">
        <button @click="close" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        <button @click="updateValue" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    initialValue: {
      type: Number,
      required: true
    }
  },
  emits: ['close', 'update'],
  data() {
    return {
      newValue: this.initialValue
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    updateValue() {
      this.$emit('update', this.newValue);
      this.close();
    }
  }
};
</script>
