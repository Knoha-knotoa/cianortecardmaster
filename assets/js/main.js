const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

// CCM Accordion / expandable panels
// Reutilizável em guias, FAQ, classes, deck techs e blocos rápidos.
(function () {
  function setPanelState(item, open) {
    const trigger = item.querySelector('.ccm-accordion__trigger');
    const content = item.querySelector('.ccm-accordion__content');

    item.classList.toggle('is-open', open);

    if (trigger) {
      trigger.setAttribute('aria-expanded', String(open));
    }

    if (content) {
      content.style.maxHeight = open ? content.scrollHeight + 'px' : '0px';
    }
  }

  function closeSiblings(accordion, currentItem) {
    if (accordion.hasAttribute('data-accordion-multiple')) return;

    accordion.querySelectorAll('.ccm-accordion__item.is-open').forEach((item) => {
      if (item !== currentItem) {
        setPanelState(item, false);
      }
    });
  }

  function openItemFromHash(hash) {
    if (!hash || hash.length < 2) return;

    const target = document.querySelector(hash);
    if (!target || !target.classList.contains('ccm-accordion__item')) return;

    const accordion = target.closest('[data-accordion]');
    if (!accordion) return;

    closeSiblings(accordion, target);
    setPanelState(target, true);
  }

  function initAccordion(accordion) {
    const items = accordion.querySelectorAll('.ccm-accordion__item');

    items.forEach((item) => {
      const trigger = item.querySelector('.ccm-accordion__trigger');
      const content = item.querySelector('.ccm-accordion__content');
      if (!trigger || !content) return;

      setPanelState(item, item.classList.contains('is-open'));

      trigger.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        closeSiblings(accordion, item);
        setPanelState(item, willOpen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('[data-accordion]');

    accordions.forEach(initAccordion);
    openItemFromHash(window.location.hash);

    window.addEventListener('hashchange', () => {
      openItemFromHash(window.location.hash);
    });

    window.addEventListener('resize', () => {
      document.querySelectorAll('.ccm-accordion__item.is-open .ccm-accordion__content').forEach((content) => {
        content.style.maxHeight = content.scrollHeight + 'px';
      });
    });
  });
})();

