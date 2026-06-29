(function () {
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const modals = document.querySelectorAll(".modal");
  let activeModal = null;
  let previousFocus = null;

  function openModal(modal) {
    previousFocus = document.activeElement;
    activeModal = modal;
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    const closeButton = modal.querySelector("[data-modal-close]");
    if (closeButton) {
      closeButton.focus();
    }
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";

    if (activeModal === modal) {
      activeModal = null;
    }

    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  document.querySelectorAll("[data-modal-open]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const modalId = trigger.getAttribute("data-modal-open");
      const modal = document.getElementById(modalId);
      if (modal) {
        openModal(modal);
      }
    });
  });

  modals.forEach(function (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (closer) {
      closer.addEventListener("click", function () {
        closeModal(modal);
      });
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (activeModal) {
        closeModal(activeModal);
        return;
      }

      if (mobileNav && mobileNav.classList.contains("is-open") && toggle) {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        toggle.focus();
      }
    }
  });
})();
