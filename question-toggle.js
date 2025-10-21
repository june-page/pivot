document.addEventListener('DOMContentLoaded', () => {
  const questions = new Map();

  const activateByHash = () => {
    const id = window.location.hash.slice(1);
    const entry = questions.get(id);
    if (!entry) return;
    entry.open();
  };

  document.querySelectorAll('.research-question').forEach((question) => {
    const toggle = question.querySelector('.question-toggle');
    const content = question.querySelector('.question-content');
    if (!toggle || !content || !question.id) return;

    const close = () => {
      question.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      content.hidden = true;
    };

    const open = () => {
      question.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      content.hidden = false;
    };

    close();
    questions.set(question.id, { open, close, toggle, question });

    if (question.id === 'imagenet' || question.id === 'gradcam' || question.id === 'segmentation') {
      open(); 
    }

    toggle.addEventListener('click', () => {
      question.classList.contains('is-open') ? close() : open();
      if (question.classList.contains('is-open')) {
        history.replaceState(null, '', `#${question.id}`);
      }
    });
  });

  activateByHash();
  window.addEventListener('hashchange', activateByHash, false);

  document.querySelectorAll('.custom-nav-pills .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.hash.slice(1);
      const entry = questions.get(id);
      if (!entry) return;
      entry.open();
    });
  });
});
