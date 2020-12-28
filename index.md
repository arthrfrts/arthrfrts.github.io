---
layout: page
---

Olá! Eu sou um desenvolvedor web há mais de dez anos. Eu faço adoráveis sites à mão para pessoas bacanas.

Dê uma olhada em alguns dos sites que fiz nos últimos tempos:

{% assign sorted_projects = site.projects | sort: "title" %}

{% for project in sorted_projects %}
  <details>
    <summary>{{ project.title }}</summary>
    
    {{ project.content }}
  </details>
{% endfor %}
