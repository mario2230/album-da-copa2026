<template>
    <ion-page>

        <AppHeader titulo="Conquistas" />

        <ion-content class="ion-padding">

            <ion-card>

                <ion-card-header>

                    <ion-card-title>
                        Minhas Conquistas
                    </ion-card-title>

                </ion-card-header>

                <ion-card-content>

                    <ion-progress-bar :value="progresso" />

                    <p>
                        {{ totalDesbloqueadas }}
                        /
                        {{ totalAchievements }}
                        desbloqueadas
                    </p>

                </ion-card-content>

            </ion-card>

            <ion-card v-for="achievement in achievements" :key="achievement.id">

                <ion-card-header>

                    <ion-card-title class="conquista-titulo">

                        <ion-icon
                            :icon="getIcon(achievement.icone)"
                            :color="achievement.desbloqueada ? 'success' : 'medium'"
                            class="conquista-icone"
                        />

                        {{ achievement.nome }}

                    </ion-card-title>

                    <ion-card-subtitle>

                        {{ achievement.descricao }}

                    </ion-card-subtitle>

                </ion-card-header>

                <ion-card-content>

                    <ion-badge :color="achievement.desbloqueada
                        ? 'success'
                        : 'medium'
                        ">

                        {{
                            achievement.desbloqueada
                                ? 'Desbloqueada'
                                : 'Bloqueada'
                        }}

                    </ion-badge>

                    <p v-if="achievement.data_desbloqueio" class="ion-margin-top">

                        Desbloqueada em:
                        {{ formatarData(achievement.data_desbloqueio) }}

                    </p>

                </ion-card-content>

            </ion-card>

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
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonProgressBar,
    IonIcon,
    onIonViewWillEnter
} from "@ionic/vue"

import * as ionicons from "ionicons/icons"

import AppHeader from "@/components/AppHeader.vue"
import { useAchievements } from "@/composables/useAchievementes"

const {
    achievements,
    progresso,
    totalAchievements,
    totalDesbloqueadas,
    carregarAchievements
} = useAchievements()

function kebabToCamel(str: string) {
    return str.replace(/-([a-z])/g, (_, letra) => letra.toUpperCase())
}

function getIcon(nomeIcone: string) {
    const chave = kebabToCamel(nomeIcone) as keyof typeof ionicons
    return ionicons[chave] ?? ionicons.helpCircleOutline
}

function formatarData(data: string) {
    return new Date(data).toLocaleString("pt-BR")
}

onIonViewWillEnter(() => {
    carregarAchievements().catch(e =>
        console.error("[ConquistasPage] erro ao carregar conquistas", e)
    )
})
</script>

<style scoped>
.conquista-titulo {
    display: flex;
    align-items: center;
    gap: 8px;
}

.conquista-icone {
    font-size: 24px;
}
</style>