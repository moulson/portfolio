(function () {
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const header = document.querySelector("[data-site-header]");

  const HIGHLIGHT_DEFAULTS = {
    "#contact": ["contact-email", "contact-phone"],
    "#pricing": ["pricing-featured"],
    "#work": ["work-showcase"],
    "#services": ["services-grid"],
  };

  let activeModal = null;
  let previousFocus = null;
  let highlightTimeout = null;
  let closeModalTimeout = null;

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

  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function clearHighlights() {
    document.querySelectorAll(".is-highlighted").forEach(function (el) {
      el.classList.remove("is-highlighted");
    });
  }

  function applyHighlights(targetIds) {
    clearHighlights();

    targetIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add("is-highlighted");
      }
    });

    if (targetIds.some(function (id) { return id.indexOf("contact-") === 0; })) {
      const panel = document.querySelector(".contact-panel");
      if (panel) {
        panel.classList.add("is-highlighted");
      }
    }

    window.clearTimeout(highlightTimeout);
    highlightTimeout = window.setTimeout(clearHighlights, 2800);
  }

  function getHighlightTargets(link, hash) {
    const custom = link.getAttribute("data-highlight");
    if (custom) {
      return custom.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    }
    if (hash && HIGHLIGHT_DEFAULTS[hash]) {
      return HIGHLIGHT_DEFAULTS[hash].slice();
    }
    return [];
  }

  function waitForScrollEnd(callback) {
    let called = false;
    const run = function () {
      if (called) return;
      called = true;
      callback();
    };

    window.addEventListener("scrollend", run, { once: true });
    window.setTimeout(run, 900);
  }

  function runHighlightAction(link) {
    const href = link.getAttribute("href") || "";
    const isMailto = href.indexOf("mailto:") === 0;
    const isTel = href.indexOf("tel:") === 0;
    const hash = href.charAt(0) === "#" && href.length > 1 ? href : null;
    const targets = getHighlightTargets(link, hash);
    const scrollTarget = hash
      ? document.querySelector(hash)
      : (isMailto || isTel) && targets.length
        ? document.getElementById("contact")
        : null;

    const highlight = function () {
      if (targets.length) {
        applyHighlights(targets);
      }
    };

    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      waitForScrollEnd(highlight);
    } else if (targets.length) {
      highlight();
    }

    return { href: href, isMailto: isMailto, isTel: isTel };
  }

  document.addEventListener("click", function (event) {
    const opener = event.target.closest("[data-modal-open]");
    if (opener) {
      event.preventDefault();
      const modalId = opener.getAttribute("data-modal-open");
      const modal = modalId ? document.getElementById(modalId) : null;
      if (modal) {
        openModal(modal);
      }
      return;
    }

    const closer = event.target.closest("[data-modal-close]");
    if (closer) {
      const modal = closer.closest(".modal");
      if (modal) {
        event.preventDefault();
        closeModal(modal);
      }
      return;
    }

    const link = event.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    const hasHighlight = link.hasAttribute("data-highlight");
    const isHashLink = href.charAt(0) === "#" && href.length > 1;
    const isMailto = href.indexOf("mailto:") === 0;
    const isTel = href.indexOf("tel:") === 0;
    const hasDefaultHighlight = isHashLink && HIGHLIGHT_DEFAULTS[href];
    const targets = getHighlightTargets(
      link,
      isHashLink ? href : isMailto || isTel ? "#contact" : null
    );

    if (!targets.length && !isHashLink) return;
    if (!hasHighlight && !hasDefaultHighlight && !isMailto && !isTel) return;

    if (isHashLink || hasHighlight || hasDefaultHighlight) {
      event.preventDefault();
      const result = runHighlightAction(link);

      if (isHashLink) {
        history.pushState(null, "", href);
      }

      if (result.isMailto || result.isTel) {
        window.setTimeout(function () {
          window.location.href = result.href;
        }, 850);
      }
    }
  });

  function openModal(modal) {
    if (!modal || activeModal === modal) return;

    window.clearTimeout(closeModalTimeout);
    previousFocus = document.activeElement;
    activeModal = modal;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(function () {
      modal.classList.add("is-open");
    });

    const closeButton = modal.querySelector(".modal__close");
    if (closeButton) {
      window.setTimeout(function () {
        closeButton.focus();
      }, 100);
    }
  }

  function closeModal(modal) {
    if (!modal || !modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    const dialog = modal.querySelector(".modal__dialog");
    const finishClose = function () {
      document.body.style.overflow = "";
      if (activeModal === modal) {
        activeModal = null;
      }
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
        previousFocus = null;
      }
    };

    if (dialog) {
      dialog.addEventListener("transitionend", function onEnd(e) {
        if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
        dialog.removeEventListener("transitionend", onEnd);
        finishClose();
      });
    }

    closeModalTimeout = window.setTimeout(finishClose, 400);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

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
  });

  document.querySelectorAll(".hero .reveal").forEach(function (el) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add("is-visible");
      });
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      if (!el.closest(".hero")) {
        revealObserver.observe(el);
      }
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
