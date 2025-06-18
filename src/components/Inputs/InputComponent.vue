<script setup>
import { computed, ref } from "vue";

const prop = defineProps({
  input: {
    type: [Object, Array],
    required: true,
  },
});
const showIcon = ref(false);
const isPwd = ref(false);
const inputType = computed(() => {
  return isPwd.value === false ? "password" : "text";
});

const localInput = ref([]);
if (Array.isArray(prop.input)) {
  localInput.value = prop.input.map((item) => ({ ...item }));
}

defineEmits(["update:input"]);
</script>

<template>
  <div v-for="item in localInput" :key="item.id">
    <q-input
      v-model="item.model"
      :type="item.type || 'text'"
      v-if="item.type !== 'password'"
      :label="item.label"
      :class="item.class"
      outlined
      @update:model-value="
        $emit('update:input', {
          id: item.id,
          label: item.label,
          value: item.model,
        })
      "
      :style="item.style"
    />
    <q-input
      v-model="item.model"
      :type="inputType"
      v-else
      :label="item.label"
      outlined
      @focus="showIcon = true"
      @blur="showIcon = false"
      @update:model-value="
        $emit('update:input', {
          id: item.id,
          label: item.label,
          value: item.model,
        })
      "
      :style="item.style"
    >
      <template v-slot:append>
        <q-icon
          v-if="showIcon"
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer icon"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </div>
</template>
