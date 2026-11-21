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
const offerStatus = document.querySelector('#teklif-durum');
const manualCopy = document.querySelector('#teklif-elle');
const copyText = document.querySelector('#teklif-metin');
const whatsappLink = document.querySelector('#teklif-whatsapp');

function clearFeedback() {
  offerStatus.textContent = '';
  manualCopy.hidden = true;
  copyText.value = '';
  projectIdea.setCustomValidity('');
}

function readBrief() {
  const detail = projectIdea.value.trim();
  projectIdea.setCustomValidity(detail ? '' : 'Projenizi birkaç kelimeyle anlatın.');
  if (!proposal.reportValidity()) return '';

  const lines = ['Merhaba Alper Bey, projem için teklif almak istiyorum.'];
  if (projectType.value) lines.push('Hizmet: ' + projectType.value);
  lines.push(detail);
  return lines.join('\r\n\r\n');
}

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    projectType.value = link.dataset.service;
    clearFeedback();
    if (window.location.hash !== link.hash) window.location.hash = link.hash;
    proposal.scrollIntoView({ block: 'start' });
    projectType.focus({ preventScroll: true });
  });
});

proposal.addEventListener('submit', event => {
  event.preventDefault();
  const body = readBrief();
  if (!body) return;

  if (event.submitter?.value === 'email') {
    const subject = projectType.value ? projectType.value + ' için teklif' : 'Yazılım projesi için teklif';
    const query = new URLSearchParams({ subject, body }).toString().replace(/\+/g, '%20');
    offerStatus.textContent = 'E-posta uygulamanız açılmazsa özeti kopyalayıp alperdigital@icloud.com adresine yazabilirsiniz.';
    window.location.assign(proposal.action + '?' + query);
    return;
  }

  const destination = new URL(whatsappLink.href);
  destination.searchParams.set('text', body);
  window.location.assign(destination.href);
});

document.querySelector('#teklif-kopyala').addEventListener('click', async () => {
  const body = readBrief();
  if (!body) return;
  try {
    await navigator.clipboard.writeText(body);
    manualCopy.hidden = true;
    offerStatus.textContent = 'Proje özetiniz kopyalandı.';
  } catch {
    manualCopy.hidden = false;
    copyText.value = body;
    copyText.focus();
    copyText.select();
    offerStatus.textContent = 'Seçili metni cihazınızın kopyalama komutuyla kopyalayabilirsiniz.';
  }
});

proposal.addEventListener('input', clearFeedback);
document.querySelector('#teklif-alanlari').hidden = false;
document.querySelector('#teklif-dogrudan').hidden = true;
