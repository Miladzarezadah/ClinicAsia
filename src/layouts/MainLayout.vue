<script setup>
import { ref } from 'vue';
const drawer = ref(false);

const drawerList = ref([
  { id: 1, label: 'معرفی', name: 'Introduction', icon: 'contact_mail', iconColor: 'info' },
  {
    id: 2,
    label: 'معرفی خدمات',
    name: 'ServiceIntroduction',
    icon: 'construction',
    iconColor: 'primary',
  },
  {
    id: 3,
    label: 'نظرات',
    name: 'Comments',
    icon: 'diversity_1',
    iconColor: 'red',
  },
  {
    id: 4,
    label: 'تماس با ما',
    name: 'ContactUs',
    icon: 'connect_without_contact',
    iconColor: 'secondary',
  },
]);
</script>
<template>
  <q-layout view="lhr lpr lfr">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title align="center">تعمیرات تخصصی تلویزیون آسیا</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="right" :width="250" :breakpoint="700" show-if-above bordered>
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item clickable v-ripple v-for="item in drawerList" :key="item.id">
            <q-item-section avatar>
              <q-icon :name="item.icon" :color="item.iconColor" />
            </q-item-section>

            <q-item-section> {{ item.label }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
