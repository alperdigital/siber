"use strict";

const stateNames = {
  new: "Yeni",
  progress: "İşlemde",
  done: "Tamamlandı"
};
const filters = Array.from(document.querySelectorAll("[data-filter]"));
const notice = document.getElementById("bildirim");
const resetButton = document.getElementById("sifirla");
let activeFilter = "all";

const requests = Array.from(document.querySelectorAll(".request"), (row) => {
  const number = row.querySelector(".number").textContent;
  const label = document.createElement("label");
  label.textContent = "Talep durumu";
  const select = document.createElement("select");
  select.setAttribute("aria-label", number + " talebinin durumu");
  for (const [value, name] of Object.entries(stateNames)) {
    select.add(new Option(name, value));
  }
  select.value = row.dataset.state;
  label.append(select);
  row.querySelector(".body").append(label);
  select.addEventListener("change", () => {
    row.dataset.state = select.value;
    row.querySelector(".status").textContent = stateNames[select.value];
    renderQueue();
    notice.textContent = number + " talebinin yeni durumu " + stateNames[select.value] + ".";
    if (row.hidden) {
      filters.find((button) => button.dataset.filter === activeFilter).focus();
    }
  });
  return { row, select, initialState: row.dataset.state, initiallyOpen: row.open };
});

function renderQueue() {
  const counts = { new: 0, progress: 0, done: 0 };
  let visible = 0;
  for (const { row } of requests) {
    counts[row.dataset.state] += 1;
    row.hidden = activeFilter !== "all" && row.dataset.state !== activeFilter;
    if (row.hidden) row.open = false;
    else visible += 1;
  }
  for (const counter of document.querySelectorAll("[data-count]")) {
    counter.textContent = counts[counter.dataset.count];
  }
  for (const button of filters) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
  }
  document.getElementById("bos").hidden = visible > 0;
  return visible;
}

for (const button of filters) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    const visible = renderQueue();
    notice.textContent = button.textContent + " filtresinde " + visible + " talep gösteriliyor.";
  });
}

resetButton.addEventListener("click", () => {
  activeFilter = "all";
  for (const { row, select, initialState, initiallyOpen } of requests) {
    select.value = initialState;
    row.dataset.state = initialState;
    row.querySelector(".status").textContent = stateNames[initialState];
    row.open = initiallyOpen;
  }
  renderQueue();
  notice.textContent = "Örnek kayıtlar başlangıç durumuna getirildi.";
});

renderQueue();
document.getElementById("filtreler").hidden = false;
document.getElementById("gecici").hidden = false;
resetButton.hidden = false;
