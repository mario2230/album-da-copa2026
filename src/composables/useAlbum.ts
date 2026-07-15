import {
  ref,
  computed,
  onMounted
} from "vue"

import {
  listJogadores,
  atualizarColetada,
  verificarConquistas,
  favoritarJogador
} from "@/services/database"

import {
  usuarioLogado
} from "@/composables/useAuth"

export function useAlbum() {

  const stickers = ref<any[]>([])
  const pesquisa = ref("")
  const filtro = ref("todas")

  async function carregarAlbum() {
    if (!usuarioLogado.value) {
      return
    }
    stickers.value = await listJogadores(usuarioLogado.value.id)
  }

  async function marcarColetada(id: number) {

    const figurinha = stickers.value.find(sticker => sticker.id === id)
    if (!figurinha) return

    const novoStatus = !figurinha.coletada

    try {
      await atualizarColetada(usuarioLogado.value.id, id, novoStatus)
      figurinha.coletada = novoStatus
      await verificarConquistas(usuarioLogado.value.id)
    } catch (e) {
      console.error("[useAlbum] erro ao marcar coletada", e)
    }
  }

  async function marcarFavorito(id: number) {

    const figurinha = stickers.value.find(sticker => sticker.id === id)
    if (!figurinha) return

    const novoStatus = !figurinha.favorito

    try {
      await favoritarJogador(usuarioLogado.value.id, id, novoStatus)
      figurinha.favorito = novoStatus
    } catch (e) {
      console.error("[useAlbum] erro ao marcar favorito", e)
    }
  }

  const stickersFiltradas = computed(() => {

    let resultado = stickers.value

    if (pesquisa.value) {
      resultado = resultado.filter(sticker =>
        sticker.nome.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
        sticker.selecao.toLowerCase().includes(pesquisa.value.toLowerCase())
      )
    }

    if (filtro.value === "coletadas") {
      resultado = resultado.filter(sticker => sticker.coletada)
    }

    if (filtro.value === "pendentes") {
      resultado = resultado.filter(sticker => !sticker.coletada)
    }

    if (filtro.value === "favoritas") {
      resultado = resultado.filter(sticker => sticker.favorito)
    }

    return resultado

  })

  const totalFigurinhas = computed(() => stickers.value.length)

  const totalColetadas = computed(() =>
    stickers.value.filter(sticker => Boolean(sticker.coletada)).length
  )

  onMounted(() => {
    carregarAlbum()
  })

  return {
    pesquisa,
    filtro,
    marcarColetada,
    marcarFavorito,
    stickersFiltradas,
    totalFigurinhas,
    totalColetadas,
    carregarAlbum
  }

}