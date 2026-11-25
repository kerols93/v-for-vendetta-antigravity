const SKILLS = [
  { name: "HTML5 & Semantic Web", cat: "web", level: 92 },
  { name: "CSS3 & Responsive UI", cat: "web", level: 88 },
  { name: "JavaScript (ES6+)", cat: "web", level: 80 },
  { name: "C++ Programming", cat: "cs", level: 85 },
  { name: "Python & Scripting", cat: "cs", level: 82 },
  { name: "Git & Antigravity AI", cat: "cs", level: 90 }
];

const skillsGrid = document.getElementById("skills-grid");
const tabButtons = document.querySelectorAll(".tab-btn");
const copyEmailBtn = document.getElementById("copy-email-btn");
const contactCopyBtn = document.getElementById("contact-copy-btn");
const copyToast = document.getElementById("copy-toast");
const emailText = document.getElementById("email-text").textContent;

function renderSkills(cat = "all") {
  const list = cat === "all" ? SKILLS : SKILLS.filter((s) => s.cat === cat);
  skillsGrid.innerHTML = "";
  list.forEach((s) => {
    const div = document.createElement("div");
    div.className = "skill-item";
    div.innerHTML = `
      <div class="skill-top"><span>${s.name}</span><span style="color:#38bdf8">${s.level}%</span></div>
      <div class="skill-bar"><div class="skill-fill" style="width:${s.level}%"></div></div>
    `;
    skillsGrid.appendChild(div);
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderSkills(btn.dataset.cat);
  });
});

function handleCopy() {
  navigator.clipboard?.writeText(emailText).catch(() => {});
  copyToast.textContent = "Email copied! ✓";
  contactCopyBtn.textContent = "Copied ✓";
  setTimeout(() => {
    copyToast.textContent = "";
    contactCopyBtn.textContent = "Copy";
  }, 2200);
}

copyEmailBtn.addEventListener("click", handleCopy);
contactCopyBtn.addEventListener("click", handleCopy);

renderSkills("all");
