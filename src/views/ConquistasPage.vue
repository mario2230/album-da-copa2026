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

                    <ion-card-title>

                        {{ achievement.icone }}

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

                        Data:
                        {{ achievement.data_desbloqueio }}

                    </p>
                    <p>
                        {{ totalDesbloqueadas }}
                        de
                        {{ totalAchievements }}
                        conquistas desbloqueadas
                    </p>
                </ion-card-content>

            </ion-card>
            <ion-progress-bar :value="progresso" />
        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import { onIonViewWillEnter } from "@ionic/vue"
import { useAchievements } from "@/composables/useAchievementes"

const {
    achievements,
    progresso,
    totalAchievements,
    totalDesbloqueadas,
    carregarAchievements
} = useAchievements()

onIonViewWillEnter(() => {
    carregarAchievements()
})
</script>