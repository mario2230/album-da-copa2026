<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/pages/album">
          <ion-icon aria-hidden="true" :icon="bookOutline" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>



        <ion-tab-button tab="tab2" href="/pages/termos">
          <ion-icon aria-hidden="true" :icon="informationCircleOutline" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/pages/conquistas">
          <ion-icon aria-hidden="true" :icon="trophyOutline" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/pages/estatisticas">
          <ion-icon aria-hidden="true" :icon="statsChartOutline" />
          <ion-label>Tab 4</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/pages/perfil">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Tab 5</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { bookOutline, personOutline, informationCircleOutline, trophyOutline, statsChartOutline } from 'ionicons/icons';
</script>
