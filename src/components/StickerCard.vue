<template>
  <ion-card>

    <ion-img
      :src="sticker.foto"
      alt="Jogador"
    ></ion-img>

    <ion-card-header>
      <ion-card-title>
        {{ sticker.nome }}
      </ion-card-title>

      <ion-card-subtitle>
        {{ sticker.selecao }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>

      <ion-badge
        :color="sticker.coletada ? 'success' : 'danger'"
      >
        {{ sticker.coletada
          ? 'Coletada'
          : 'Pendente'
        }}
      </ion-badge>

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

    </ion-card-content>

  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonBadge
} from "@ionic/vue"

const props = defineProps({
  sticker: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  "toggle"
])

function toggleColetada() {
  emit("toggle", props.sticker.id)
}
</script>