<script setup>
import ContactUs from 'src/components/ContactUs.vue';
import OurInformation from 'src/components/OurInformation.vue';
import ServiceIntroduction from 'src/components/ServiceIntroduction.vue';
import CustomerPersuasion from 'src/components/CustomerPersuasion.vue';
import CommentSlider from 'src/components/CommentSlider.vue';
import { ref } from 'vue';
const ourInformation = ref(null);
const serviceIntroduction = ref(null);
const commentSlider = ref(null);
const customerPersuasion = ref(null);
const contactUs = ref(null);
defineExpose({
  ourInformation,
  serviceIntroduction,
  commentSlider,
  customerPersuasion,
  contactUs,
});
</script>

<template>
  <q-page class="q-pa-sm">
    <div>
      <OurInformation ref="ourInformation" />
      <div>
        <div class="q-mt-xl q-mr-md-lg q-mr-xs-none">
          <ServiceIntroduction ref="serviceIntroduction" />
        </div>
        <CommentSlider ref="commentSlider" />

        <div
          class="q-mr-md-xl q-mr-xs-none q-pr-md-xl q-pr-xs-none q-mt-xl q-pt-md row justify-around items-center"
        >
          <CustomerPersuasion ref="customerPersuasion" />
          <ContactUs class="q-mt-xs-lg q-mt-md-none" ref="contactUs" />
        </div>
      </div>
    </div>
  </q-page>
</template>
