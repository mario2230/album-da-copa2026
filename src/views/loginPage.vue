<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Login
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <LoginForm
        @login="realizarLogin"
      />

      <ion-button
        expand="block"
        fill="clear"
        @click="irCadastro"
      >
        Criar conta
      </ion-button>

      <ion-button
        expand="block"
        fill="clear"
        @click="esqueciSenha"
      >
        Esqueci minha senha
      </ion-button>

      <ion-text
        color="danger"
        v-if="mensagemErro"
      >
        <p>{{ mensagemErro }}</p>
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

import LoginForm from "@/components/LoginForm.vue"

import { useAuth } from "@/composables/useAuth"

const router = useRouter()

const { login } = useAuth()

const mensagemErro = ref("")

function realizarLogin(
  email: string,
  senha: string
) {

  mensagemErro.value = ""

  const resultado =
    login(email, senha)

  if (resultado.sucesso) {

    router.push("/pages/album")

    return
  }

  mensagemErro.value =
    resultado.mensagem
}

function irCadastro() {
  router.push("/cadastro")
}

function esqueciSenha() {
  alert(
    "Tela de recuperação apenas ilustrativa"
  )
  setTimeout(() => {
     router.push("/resetpass")
  }, 1000)
 
}
</script>