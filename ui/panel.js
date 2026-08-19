var textarea = document.getElementById("note");
var charCount = document.getElementById("char-count");
var saveStatus = document.getElementById("save-status");
var saveTimeout = null;

function updateCharCount() {
    var len = textarea.value.length;
    charCount.textContent = len + (len === 1 ? " char" : " chars");
}

function showSaved() {
    saveStatus.textContent = "saved";
    saveStatus.classList.add("visible");
    setTimeout(function () {
        saveStatus.classList.remove("visible");
    }, 1500);
}

function scheduleSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function () {
        window.panel.post("save", { text: textarea.value });
        showSaved();
    }, 500);
}

textarea.addEventListener("input", function () {
    updateCharCount();
    scheduleSave();
});

window.panel.on("content", function (data) {
    textarea.value = data.text || "";
    updateCharCount();
});

window.panel.post("ready", {});
