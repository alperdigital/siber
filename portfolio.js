const platformControls = document.querySelector('.guide-platforms');
const platformButtons = [...platformControls.querySelectorAll('[data-platform]')];
const platformPanels = [...document.querySelectorAll('.guide-platform')];

function selectPlatform(platform) {
  for (const button of platformButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.platform === platform));
  }
  for (const panel of platformPanels) {
    panel.hidden = panel.id !== 'rehber-' + platform;
  }
}

for (const button of platformButtons) {
  button.addEventListener('click', () => selectPlatform(button.dataset.platform));
}
selectPlatform(platformButtons[0].dataset.platform);
platformControls.hidden = false;

const proposal = document.querySelector('#teklif');
const projectType = document.querySelector('#teklif-alani');
const projectIdea = document.querySelector('#teklif-detay');

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    projectType.value = link.dataset.service;
    proposal.scrollIntoView({ block: 'start' });
    projectIdea.focus({ preventScroll: true });
  });
});

proposal.addEventListener('submit', event => {
  event.preventDefault();
  projectIdea.setCustomValidity(projectIdea.value.trim() ? '' : 'Proje fikrinizi kısaca yazın.');
  if (!proposal.reportValidity()) return;

  const message = ['Merhaba, bir proje için MVP fiyat teklifi almak istiyorum.'];
  if (projectType.value) message.push('Proje türü: ' + projectType.value);
  message.push('Proje fikri: ' + projectIdea.value.trim());
  const subject = proposal.elements.subject.value;
  const body = message.join('\r\n\r\n');
  const draft = proposal.action + '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
  window.location.assign(draft);
});

projectIdea.addEventListener('input', () => projectIdea.setCustomValidity(''));
