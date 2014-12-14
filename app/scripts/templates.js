define(['twig'], function (twig) {
  'use strict'

  var templates = {
'home': twig.twig({
          data: '<div class="header">  <a href="/journey/test">Journey</a></div>'
}),
'journey': twig.twig({
          data: '<div class="journey-background" style="background: url({{ journey.background }});"></div>{{ child("journey/timeline", timeline, "timeline") }}{{ child("journey/stories", journey) }}'
}),
'journey/stories': twig.twig({
          data: '<div class="journey-stories">  {% for story in stories %}    <article class="story part" data-slug="{{ story.slug }}">      <h2 class="story--title">{{ story.title }}</h2>      <div class="story--body">{{ story.content }}</div>    </article>  {% endfor %}</div>'
}),
'journey/timeline': twig.twig({
          data: '<div class="journey-timeline">  <div id="journey-timeline-dragdealer" class="journey-timeline-dragdealer">    <div class="handle">      <div class="handle-fixed-wrapper">        <div class="timeline--titles in-handle">          {{ child("journey/titles", timeline, "timeline") }}        </div>      </div>    </div>  </div>  <div class="timeline--titles standard">    {{ child("journey/titles", timeline, "timeline") }}  </div></div>'
}),
'journey/titles': twig.twig({
          data: '{% for part in timeline %}  {% if part.type == "icon" %}    <a class="timeline--entree" href="{{ part.story.slug }}">      <div class="timeline--icon" data-slug="{{ part.story.slug }}"></div>      <h2 class="timeline--title">{{ part.story.title }}</h2>    </a>  {% else %}    <div class="timeline--path"></div>  {% endif %}{% endfor %}'
}),


  }

  return templates
})
