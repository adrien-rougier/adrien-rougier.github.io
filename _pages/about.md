---
layout: about
title: Home
permalink: /
---

<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">
<div class="row">
  <div class="col-12">
    <p class="lead">
      I am a postdoctoral researcher at the
      <a href="https://crest.science">Center for Research in Economics and Statistics (CREST)</a> &amp;
      <a href="https://www.ip-paris.fr/">Institut Polytechnique de Paris</a>, where I am part of the
      <a href="https://www.css.cnrs.fr/team/">Computational Social Science (CSS) team</a>.
    </p>
    <p class="lead">
      Together with <a href="https://emmabonuttidagostini.github.io/" target="_blank" rel="noopener noreferrer">Emma Bonutti</a> and <a href="https://ollion.cnrs.fr/english/" target="_blank" rel="noopener noreferrer">Étienne Ollion</a>, I'm co-organizing the <em>IP-Paris AI &amp; Social Science seminar</em>.
      Here is the <a href="https://www.css.cnrs.fr/ai-social-sciences-seminar-2/" target="_blank" rel="noopener noreferrer">2026-2027 program</a>.
    </p>
  </div>
</div>

<div class="row align-items-center hero-row">
  <div class="col-md-8">
    <p class="lead">
      One great project I'm involved in is
      <a href="https://activetigger.com/" target="_blank" rel="noopener noreferrer">ActiveTigger</a>,
     an open-source annotation and classification tool for text and images, designed for social science research. Check out the
      poster we just made for <a href="https://mashs2026.sciencesconf.org/?forward-action=index&forward-controller=index&lang=en" target="_blank" rel="noopener noreferrer">MASHS 2026</a>.
    </p>
  </div>
  <div class="col-md-4 hero-row-media">
    <button type="button" class="poster-thumb-btn" id="poster-thumb-btn" aria-haspopup="dialog">
      {% include figure.liquid loading="eager" path="assets/img/poster_activetigger_thumb.png" class="poster-thumb" alt="ActiveTigger poster" %}
    </button>
  </div>
</div>

<div class="row align-items-center hero-row">
  <div class="col-md-8">
    <p class="lead">
      From <strong>December 2026 to March 2027</strong>, I will be a visiting researcher at the
      <a href="https://yuikofujita.com/" target="_blank" rel="noopener noreferrer">I-Ethnography Lab</a>,
      within the Interfaculty Initiative in Information Studies (iii) at the University of Tokyo. If
      you're around, feel free to reach out!
    </p>
  </div>
  <div class="col-md-4 hero-row-media">
    {% include figure.liquid loading="eager" path="assets/img/logo_tokyo.png" class="tokyo-logo" alt="University of Tokyo" %}
  </div>
</div>

<hr>

<h2>Contact</h2>
<p class="lead">
  <a href="mailto:adrien.rougier@ensae.fr">adrien.rougier@ensae.fr</a>
</p>

<div id="poster-lightbox" class="poster-lightbox" hidden>
  <button type="button" class="poster-lightbox-close" id="poster-lightbox-close" aria-label="Close">&times;</button>
  <img id="poster-lightbox-img" src="{{ '/assets/img/poster_activetigger_large.png' | relative_url }}" alt="ActiveTigger poster (large)">
  <div class="poster-lightbox-hint">Scroll or click to zoom, drag to pan</div>
</div>

<script src="{{ '/assets/js/home.js' | relative_url }}"></script>
