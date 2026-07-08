import {
  ref,
  computed,
  onMounted
} from "vue"

import {
  listAchievements
} from "@/services/database"

import {
  usuarioLogado
} from "@/composables/useAuth"

export function useAchievements() {

  const achievements = ref<any[]>([])

  async function carregarAchievements() {

    if (!usuarioLogado.value) {
      return
    }

    achievements.value =
      await listAchievements(
        usuarioLogado.value.id
      )

  }

  const totalAchievements = computed(() =>
    achievements.value.length
  )

  const totalDesbloqueadas = computed(() =>
    achievements.value.filter(
      achievement => Boolean(achievement.desbloqueada)
    ).length
  )

  const progresso = computed(() => {

    if (totalAchievements.value === 0) {
      return 0
    }

    return (
      totalDesbloqueadas.value /
      totalAchievements.value
    )

  })

  const achievementsBloqueadas = computed(() =>
    achievements.value.filter(
      achievement => !achievement.desbloqueada
    )
  )

  const achievementsDesbloqueadas = computed(() =>
    achievements.value.filter(
      achievement => Boolean(achievement.desbloqueada)
    )
  )

  onMounted(() => {
    carregarAchievements()
  })

return {
  achievements,
  carregarAchievements,
  totalAchievements,
  totalDesbloqueadas,
  progresso,
  achievementsBloqueadas,
  achievementsDesbloqueadas
}

}