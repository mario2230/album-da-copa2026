<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Cadastro
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <RegisterForm
        @register="realizarCadastro"
      />

      <ion-button
        expand="block"
        fill="clear"
        @click="voltarLogin"
      >
        Voltar ao Login
      </ion-button>

      <ion-text
        color="danger"
        v-if="mensagem"
      >
        <p>{{ mensagem }}</p>
      </ion-text>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText
} from "@ionic/vue"

import RegisterForm from "@/components/RegisterForm.vue"

import { useAuth } from "@/composables/useAuth"

const router = useRouter()

const { cadastrar } =
  useAuth()

const mensagem = ref("")

function realizarCadastro(
  nome: string,
  email: string,
  senha: string
) {

  mensagem.value = ""

  const resultado =
    cadastrar(
      nome,
      email,
      senha
    )

  mensagem.value =
    resultado.mensagem

  if (resultado.sucesso) {

    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }
}

function voltarLogin() {
  router.push("/")
}
</script>