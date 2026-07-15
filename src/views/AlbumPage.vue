<template>
  <ion-page>

    <AppHeader titulo="Álbum da Copa" />

    <ion-content class="ion-padding">

      <ion-card>

        <ion-card-header>
          <ion-card-title>
            Meu Álbum
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>

          <p>
            Total de figurinhas:
            {{ totalFigurinhas }}
          </p>

          <p>
            Coletadas:
            {{ totalColetadas }}
          </p>

        </ion-card-content>

      </ion-card>

      <ion-searchbar
        v-model="pesquisa"
        placeholder="Pesquisar jogador ou seleção"
      />

      <ion-segment v-model="filtro">
        <ion-segment-button value="todas">
          <ion-label>Todas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="coletadas">
          <ion-label>Coletadas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="pendentes">
          <ion-label>Pendentes</ion-label>
        </ion-segment-button>
        <ion-segment-button value="favoritas">
          <ion-label>Favoritas</ion-label>
        </ion-segment-button>
      </ion-segment>

      <StickerList
        :stickers="stickersFiltradas"
        @toggle="marcarColetada"
        @toggle-favorito="marcarFavorito"
      />

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  onIonViewWillEnter
} from "@ionic/vue"

import AppHeader from "@/components/AppHeader.vue"
import StickerList from "@/components/StickerList.vue"

import { useAlbum } from "@/composables/useAlbum"

const {
  pesquisa,
  filtro,
  marcarColetada,
  marcarFavorito,
  stickersFiltradas,
  totalFigurinhas,
  totalColetadas,
  carregarAlbum
} = useAlbum()

onIonViewWillEnter(() => {
  carregarAlbum().catch(e =>
    console.error("[AlbumPage] erro ao recarregar álbum", e)
  )
})
</script>