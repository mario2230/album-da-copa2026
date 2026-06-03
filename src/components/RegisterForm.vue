<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        Criar Conta
      </ion-card-title>
    </ion-card-header>

    <ion-card-content>

      <ion-input
        label="Nome completo"
        label-placement="floating"
        v-model="nome"
      />

      <ion-input
        class="ion-margin-top"
        label="E-mail"
        label-placement="floating"
        type="email"
        v-model="email"
      />

      <ion-input
        class="ion-margin-top"
        label="Senha"
        label-placement="floating"
        type="password"
        v-model="senha"
      />

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="fazerCadastro"
      >
        Cadastrar
      </ion-button>

      <ion-text
        color="danger"
        v-if="erro"
      >
        <p>{{ erro }}</p>
      </ion-text>

    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from "vue"

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonText
} from "@ionic/vue"

const emit = defineEmits<{
  register: [
    nome: string,
    email: string,
    senha: string
  ]
}>()

const nome = ref("")
const email = ref("")
const senha = ref("")
const erro = ref("")

function fazerCadastro() {

  erro.value = ""

  if (
    !nome.value ||
    !email.value ||
    !senha.value
  ) {
    erro.value =
      "Preencha todos os campos"

    return
  }

  emit(
    "register",
    nome.value,
    email.value,
    senha.value
  )
}
</script>