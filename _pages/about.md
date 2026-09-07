---
layout: about
title: Home
permalink: /
---

<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<p class="lead">
  I am a postdoctoral researcher at the
  <a href="https://crest.science">Center for Research in Economics and Statistics (CREST)</a>,
  <a href="https://www.ip-paris.fr/">Institut Polytechnique de Paris</a>, where I am part of the
  <a href="https://www.css.cnrs.fr/team/">Computational Social Science (CSS) team</a>.
</p>

<p class="lead">
  One project we work on is
  <a href="https://activetigger.com/" target="_blank" rel="noopener noreferrer">ActiveTigger</a>, an
  open-source, no-code annotation and classification tool for social science research. Check out the
  poster we just made
  <button type="button" class="poster-thumb-btn" id="poster-thumb-btn" aria-haspopup="dialog">
    &rarr;
    {% include figure.liquid loading="eager" path="assets/img/poster_activetigger_thumb.png" class="poster-thumb" alt="ActiveTigger poster" %}
  </button>
</p>

<p class="lead">
  From <strong>December 2026 to March 2027</strong>, I will be a visiting researcher at the
  <a href="https://yuikofujita.com/" target="_blank" rel="noopener noreferrer">I-Ethnography Lab</a>, part
  of the Interfaculty Initiative in Information Studies (iii) at The University of Tokyo. If you're
  around, feel free to reach out!
</p>

<div class="tokyo-logo-wrap">
  {% include figure.liquid loading="eager" path="assets/img/logo_tokyo.png" class="tokyo-logo" alt="University of Tokyo" %}
</div>

<hr>

<h2>Contact</h2>
<p class="lead">
  <a href="mailto:adrien.rougier@ensae.fr">adrien.rougier@ensae.fr</a>
</p>

<div id="poster-lightbox" class="poster-lightbox" hidden>
  <button type="button" class="poster-lightbox-close" id="poster-lightbox-close" aria-label="Close">&times;</button>
  <img src="{{ '/assets/img/poster_activetigger_large.png' | relative_url }}" alt="ActiveTigger poster (large)">
</div>

<script src="{{ '/assets/js/home.js' | relative_url }}"></script>
