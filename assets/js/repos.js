// Lists the public repositories of the GitHub account on the Projects page.
// The section stays hidden when there is none (or when the API is unreachable).
(function () {
  var USER = 'AnicetNzeu';
  var SKIP = [(USER + '.github.io').toLowerCase()];
  var section = document.getElementById('public-repos');
  var grid = document.getElementById('repo-grid');
  if (!section || !grid) return;

  fetch('https://api.github.com/users/' + USER + '/repos?per_page=100&sort=updated')
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (repos) {
      repos = repos.filter(function (r) {
        return !r.fork && !r.archived && SKIP.indexOf(r.name.toLowerCase()) < 0;
      });
      if (!repos.length) return;
      repos.forEach(function (r) {
        var card = document.createElement('div');
        card.className = 'project-card';
        var h = document.createElement('h3');
        var a = document.createElement('a');
        a.href = r.html_url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = r.name;
        h.appendChild(a);
        card.appendChild(h);
        if (r.description) {
          var p = document.createElement('p');
          p.textContent = r.description;
          card.appendChild(p);
        }
        if (r.language) {
          var tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = r.language;
          card.appendChild(tag);
        }
        grid.appendChild(card);
      });
      section.hidden = false;
    })
    .catch(function () {});
})();
