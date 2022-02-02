# Meu Jardim Digital 🌱

Olá, eu sou o Arthur e esse é o meu [jardim digital](https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/).

Meu jardim digital é meio blog, meio wiki. Você pode conferir ele como um blog clássico, com organização cronológica, através dos feeds [JSON](https://arthr.me/feed.json) e [RSS](https://arthr.me/feed.xml), mas você pode explorar ele livremente como uma wiki visitando o início do [jardim](https://arthr.me/jardim).

Ele é feito com [Jekyll](https://jekyllrb.com), que é um gerador de blogs, e usa o [modelo de jardins digitais de Maxime Vaillancourt](https://github.com/maximevaillancourt/digital-garden-jekyll-template), que transforma o site em uma wiki com links bi-direcionais e um mapa de anotações. Eu adaptei os plugins de Maxime para interpretar rascunhos e posts como notas, e organizo elas por tags.

## Instalação

Você precisa ter o Jekyll instalado. Veja como seguindo [essas instruções](http://jekyllrb.com/docs/installation/).

Depois de clonar esse repositório, você precisa instalar as dependências que eu uso para executar o Jekyll e construir o site. Para isso, execute no terminal:

```zsh
bundle install
```

Pode demorar um pouco, principalmente se você está instalando as dependências no Windows. Depois que tudo terminar, você pode executar o site localmente, para fazer modificações antes de publicá-lo:


```zsh
bundle exec jekyll serve
```

E para criar a versão final, pronta para publicação, você pode executar esse comando:

```zsh
bundle exec jekyll build
```

O arquivo `_config.yml` já configura como esses comandos devem funcionar, então você não precisa se preocupar com opções como `--drafts` ou `--future`.

## Copy-it-right

O código desse site está sob a [licença MIT](LICENSE). Você pode copiar e reutilizá-lo livremente. O conteúdo está disponível sob a licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
