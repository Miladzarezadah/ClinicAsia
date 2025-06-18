<script setup>
import NormalInput from 'src/components/Inputs/InputComponent.vue';
import { reactive } from 'vue';
const prop = defineProps({
  form: {
    type: Object,
  },
});

const emit = defineEmits(['update:form']);

const updateField = (field, value) => {
  const updatedForm = { ...prop.form, [field]: value };
  emit('update:form', updatedForm);
};

const Inputs = reactive([
  {
    id: 1,
    label: 'نام کاربری',
    model: prop.form.username,
    type: 'text',
    update: (value) => updateField('username', value),
  },
  {
    id: 2,
    label: 'نام و نام خانوادگی',
    model: prop.form.name,
    class: 'fullName',
    type: 'text',
    update: (value) => updateField('name', value),
  },
  {
    id: 3,
    label: 'رمز عبور',
    model: prop.form.password,
    type: 'password',
    update: (value) => updateField('password', value),
  },
  {
    id: 4,
    label: 'شماره تماس',
    model: prop.form.phone,
    type: 'number',
    update: (value) => updateField('phone', value),
  },
  {
    id: 5,
    label: 'email',
    model: prop.form.email,
    type: 'email',
    update: (value) => updateField('email', value),
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
      <h3>ثبت نام</h3>
      <div class="q-gutter-y-lg q-mt-xs" style="width: 100%">
        <NormalInput :input="Inputs" @update:input="findEmit" />
        <div class="q-mt-lg q-mb-xs">
          <router-link to="/auth">در سامانه ثبت نام کردید؟</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.authForm .fullName .q-field__native {
  direction: rtl;
  width: 100%;
}
</style>
