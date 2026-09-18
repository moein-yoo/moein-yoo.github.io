/* =========================================================
   Reveal on scroll
========================================================= */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));



/* =========================================================
   Scroll progress bar
========================================================= */

const progress = document.getElementById("progress");


window.addEventListener("scroll", () => {

  const page = document.documentElement;

  const scrollableHeight =
    page.scrollHeight - page.clientHeight;


  if (scrollableHeight <= 0) {
    progress.style.width = "0%";
    return;
  }


  const percentage =
    (page.scrollTop / scrollableHeight) * 100;


  progress.style.width =
    `${percentage}%`;

});



/* =========================================================
   Theme Toggle
========================================================= */

const root =
  document.documentElement;


const themeToggle =
  document.getElementById("themeToggle");


const themeIcon =
  document.getElementById("themeIcon");



const sunIcon = `
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
`;


const moonIcon = `
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
`;



function applyTheme(theme) {

  root.setAttribute(
    "data-theme",
    theme
  );


  themeIcon.innerHTML =
    theme === "light"
      ? sunIcon
      : moonIcon;


  const themeMeta =
    document.querySelector(
      'meta[name="theme-color"]'
    );


  if (themeMeta) {

    themeMeta.setAttribute(
      "content",
      theme === "light"
        ? "#f7f7fb"
        : "#0a0a0f"
    );

  }


  localStorage.setItem(
    "theme",
    theme
  );

}



const storedTheme =
  localStorage.getItem("theme");


const preferredTheme =
  window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches
    ? "light"
    : "dark";


applyTheme(
  storedTheme || preferredTheme
);



themeToggle.addEventListener(
  "click",

  () => {

    const currentTheme =
      root.getAttribute("data-theme");


    applyTheme(
      currentTheme === "light"
        ? "dark"
        : "light"
    );

  }
);



/* =========================================================
   Copy email
========================================================= */

const copyButton =
  document.getElementById("copyBtn");


const copyLabel =
  document.getElementById("copyLabel");


const emailText =
  document.getElementById("emailText");



copyButton.addEventListener(
  "click",

  async () => {

    const email =
      emailText.textContent.trim();


    try {

      await navigator.clipboard.writeText(
        email
      );


      copyButton.classList.add("done");

      copyLabel.textContent =
        "Copied!";


      setTimeout(
        () => {

          copyButton
            .classList
            .remove("done");


          copyLabel.textContent =
            "Copy";

        },

        1800
      );

    }

    catch (error) {

      copyLabel.textContent =
        "Press Ctrl+C";

    }

  }
);