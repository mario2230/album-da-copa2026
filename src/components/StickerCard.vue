<template>
  <ion-card>

    <ion-img
      :src="sticker.foto"
      alt="Jogador"
    />

    <ion-card-header>

      <div class="header-linha">

        <ion-card-title>
          {{ sticker.nome }}
        </ion-card-title>

        <ion-icon
          :icon="sticker.favorito ? heart : heartOutline"
          :color="sticker.favorito ? 'danger' : 'medium'"
          class="icone-favorito"
          @click="toggleFavorito"
        />

      </div>

      <ion-card-subtitle>
        {{ sticker.selecao }}
      </ion-card-subtitle>

      <ion-card-subtitle>
        {{ sticker.raridade }}
      </ion-card-subtitle>

    </ion-card-header>

    <ion-card-content>

      <ion-badge
        :color="sticker.coletada ? 'success' : 'danger'"
      >
        {{
          sticker.coletada
            ? 'Coletada'
            : 'Pendente'
        }}
      </ion-badge>

      <ion-chip
        v-if="sticker.favorito"
        color="danger"
        outline
        class="ion-margin-start"
      >
        <ion-icon :icon="heart" color="danger" />
        <ion-label>Favorita</ion-label>
      </ion-chip>

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="toggleColetada"
      >
        {{
          sticker.coletada
            ? 'Remover da coleção'
            : 'Coletar figurinha'
        }}
      </ion-button>

      <ion-button
        expand="block"
        fill="outline"
        :color="sticker.favorito ? 'danger' : 'medium'"
        class="ion-margin-top"
        @click="toggleFavorito"
      >
        {{
          sticker.favorito
            ? 'Remover dos favoritos'
            : 'Adicionar aos favoritos'
        }}
      </ion-button>

    </ion-card-content>

  </ion-card>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  IonChip,
  IonLabel
} from "@ionic/vue"

import { heart, heartOutline } from "ionicons/icons"

const props = defineProps<{
  sticker: {
    id: number
    nome: string
    selecao: string
    foto: string
    coletada: boolean
    favorito: boolean
    raridade: string
  }
}>()

const emit = defineEmits<{
  toggle: [id: number]
  "toggle-favorito": [id: number]
}>()

function toggleColetada() {
  emit("toggle", props.sticker.id)
}

function toggleFavorito() {
  emit("toggle-favorito", props.sticker.id)
}
</script>

<style scoped>
.header-linha {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.icone-favorito {
  font-size: 22px;
  cursor: pointer;
  flex-shrink: 0;
}
</style>