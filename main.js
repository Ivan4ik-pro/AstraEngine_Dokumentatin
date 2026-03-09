function toggleNote(header) {
  header.parentElement.classList.toggle('open');
}

function toggleNavGroup(header) {
  const group = header.parentElement;
  group.classList.toggle('open');
}

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
      if (active) {
        active.classList.add('active');
        let parent = active.closest('.nav-group-body');
        while (parent) {
          const group = parent.parentElement;
          if (group && group.classList.contains('nav-group')) {
            group.classList.add('open');
          }
          parent = group ? group.closest('.nav-group-body') : null;
        }
      }
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

navLinks.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});
