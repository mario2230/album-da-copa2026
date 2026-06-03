import { ref } from "vue"

interface Usuario {
  nome: string
  email: string
  senha: string
}

// Estado global
const usuarios = ref<Usuario[]>([
  {
    nome: "Administrador",
    email: "admin@email.com",
    senha: "123456"
  }
])

const usuarioLogado =
  ref<Usuario | null>(null)

export function useAuth() {

  function login(
    email: string,
    senha: string
  ) {

    const usuario =
      usuarios.value.find(
        user =>
          user.email.trim()
            .toLowerCase() ===
          email.trim()
            .toLowerCase()

          &&
          user.senha === senha
      )

    if (usuario) {

      usuarioLogado.value =
        usuario

      return {
        sucesso: true,
        mensagem:
          "Login realizado"
      }
    }

    return {
      sucesso: false,
      mensagem:
        "E-mail ou senha inválidos"
    }
  }

  function cadastrar(
    nome: string,
    email: string,
    senha: string
  ) {

    const emailLimpo =
      email.trim().toLowerCase()

    const usuarioExiste =
      usuarios.value.find(
        user =>
          user.email
            .toLowerCase() ===
          emailLimpo
      )

    if (usuarioExiste) {
      return {
        sucesso: false,
        mensagem:
          "E-mail já cadastrado"
      }
    }

    if (senha.length < 6) {
      return {
        sucesso: false,
        mensagem:
          "Senha fraca (mínimo 6 caracteres)"
      }
    }

    const novoUsuario = {
      nome,
      email: emailLimpo,
      senha
    }

    usuarios.value.push(
      novoUsuario
    )

    console.log(
      "Usuários:",
      usuarios.value
    )

    return {
      sucesso: true,
      mensagem:
        "Cadastro realizado!"
    }
  }

  function logout() {
    usuarioLogado.value = null
  }

  function resetarSenha(
    email: string
  ) {

    const usuario =
      usuarios.value.find(
        user =>
          user.email ===
          email.trim()
            .toLowerCase()
      )

    if (!usuario) {
      return {
        sucesso: false,
        mensagem:
          "E-mail não encontrado"
      }
    }

    return {
      sucesso: true,
      mensagem:
        "Link enviado"
    }
  }

  return {
    usuarioLogado,
    usuarios,
    login,
    cadastrar,
    logout,
    resetarSenha
  }
}