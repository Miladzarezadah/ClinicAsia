<script setup>
import NormalInput from "src/components/Inputs/InputComponent.vue";
import { computed, reactive } from "vue";
const prop = defineProps({
  form: {
    type: Object,
  },
});
const emit = defineEmits(["update:form"]);

const updateField = (field, value) => {
  const updatedForm = { ...prop.form, [field]: value };
  emit("update:form", updatedForm);
};

const Inputs = reactive([
  {
    id: 1,
    label: "نام کاربری",
    model: computed(() => prop.form.username),
    type: "text",
    update: (value) => updateField("username", value),
  },
  {
    id: 2,
    label: "رمز عبور",
    model: computed(() => prop.form.password),
    type: "password",
    update: (value) => updateField("password", value),
  },
]);

function findEmit(Input) {
  const inputItem = Inputs.find((item) => item.id === Input.id);
  if (inputItem) inputItem.update(Input.value);
}
</script>

<template>
  <q-page padding>
    <div class="column items-center q-gutter-y-xl" dir="rtl">
      <h4>ورود</h4>
      <div class="q-gutter-y-lg q-mt-xs" style="width: 100%">
        <NormalInput :input="Inputs" @update:input="findEmit" />
        <div class="q-mt-lg">
          <router-link to="/auth/signup"
            >هنوز حساب ندارید؟</router-link
          >
        </div>
      </div>
    </div>
  </q-page>
</template>
