<script setup>
import ContactUs from 'src/components/ContactUs.vue';
import OurInformation from 'src/components/OurInformation.vue';
import ServiceIntroduction from 'src/components/ServiceIntroduction.vue';
import CustomerPersuasion from 'src/components/CustomerPersuasion.vue';
import CommentSlider from 'src/components/CommentSlider.vue';
</script>

<template>
  <q-page class="q-pa-sm">
    <div>
      <OurInformation />
      <div>
        <div class="q-mt-xl q-mr-md-lg q-mr-xs-none">
          <ServiceIntroduction />
        </div>
          <CommentSlider/>

        <div
          class="q-mr-md-xl q-mr-xs-none q-pr-md-xl q-pr-xs-none q-mt-xl q-pt-md row justify-around items-center"
        >
          <CustomerPersuasion />
          <ContactUs class="q-mt-xs-lg q-mt-md-none" />
        </div>
      </div>
    </div>
  </q-page>
</template>
