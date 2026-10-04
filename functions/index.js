/**
 * Negociação de idioma da raiz (/) — Cloudflare Pages Function.
 *
 * Só roda em "/": /en/, /estilo.css e o resto continuam estáticos,
 * sem gastar invocações de Function.
 *
 * Ordem de decisão:
 *   1. ?idioma=pt|en  → grava o cookie e redireciona para a URL limpa
 *   2. cookie idioma  → respeita a escolha feita no seletor
 *   3. Accept-Language → primeira língua do navegador entre pt e en
 *   4. sem cabeçalho (robôs, curl) → português, que é o x-default
 */

const PAGINAS = { pt: "/", en: "/en/" };
const COOKIE = "idioma";
const UM_ANO = 60 * 60 * 24 * 365;
const valido = (codigo) => Object.hasOwn(PAGINAS, codigo ?? "");

// Se o navegador pede outra língua (fr, es, de…), quem não fala
// português provavelmente lê melhor em inglês.
const PARA_OUTRAS_LINGUAS = "en";

export async function onRequest({ request, next }) {
  if (request.method !== "GET" && request.method !== "HEAD") return next();

  const url = new URL(request.url);

  // 1. Escolha explícita, vinda do seletor de idioma
  const escolha = url.searchParams.get("idioma");
  if (valido(escolha)) {
    return redirecionar(new URL(PAGINAS[escolha], url), {
      "Set-Cookie": `${COOKIE}=${escolha}; Path=/; Max-Age=${UM_ANO}; SameSite=Lax; Secure`,
    });
  }

  // 2 a 4
  const idioma = lerCookie(request, COOKIE) ?? negociar(request.headers.get("Accept-Language"));

  if (idioma === "en") return redirecionar(new URL(PAGINAS.en, url));

  // Português: serve o index.html estático, avisando os caches
  // de que a resposta depende desses cabeçalhos.
  const resposta = await next();
  const final = new Response(resposta.body, resposta);
  final.headers.append("Vary", "Accept-Language, Cookie");
  return final;
}

function negociar(cabecalho) {
  if (!cabecalho) return "pt";

  const preferencias = cabecalho
    .split(",")
    .map((parte, ordem) => {
      const [tag, ...params] = parte.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lingua: tag.split("-")[0], q: q ? Number(q.slice(2)) || 0 : 1, ordem };
    })
    .filter((p) => p.lingua && p.q > 0)
    .sort((a, b) => b.q - a.q || a.ordem - b.ordem);

  for (const { lingua } of preferencias) {
    if (valido(lingua)) return lingua;
  }
  return PARA_OUTRAS_LINGUAS;
}

function lerCookie(request, nome) {
  const cookies = request.headers.get("Cookie") ?? "";
  for (const par of cookies.split(";")) {
    const [chave, valor] = par.trim().split("=");
    if (chave === nome && valido(valor)) return valor;
  }
  return null;
}

function redirecionar(destino, extras = {}) {
  return new Response(null, {
    status: 302, // nunca 301: a resposta varia por visitante
    headers: {
      Location: destino.toString(),
      Vary: "Accept-Language, Cookie",
      "Cache-Control": "private, no-store",
      ...extras,
    },
  });
}
