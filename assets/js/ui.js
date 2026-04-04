(function () {
  const t = (key, fallback) => (window.SiteI18n && typeof window.SiteI18n.getText === 'function')
    ? window.SiteI18n.getText(key, fallback)
    : fallback;
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');

  function toggleLanguageMenu(forceState) {
    if (!langToggle || !langMenu) return;
    const open = typeof forceState === 'boolean' ? forceState : !langMenu.classList.contains('open');
    langMenu.classList.toggle('open', open);
    langToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('lang-menu-open', open);
  }

  window.closeLanguageMenu = function () {
    toggleLanguageMenu(false);
  };

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const mobileToggleRef = document.getElementById('mobile-toggle');
      const mainNavRef = document.querySelector('.nav-shell');
      if (mobileToggleRef && mainNavRef && mainNavRef.classList.contains('active')) {
        mobileToggleRef.classList.remove('active');
        mobileToggleRef.setAttribute('aria-expanded', 'false');
        mainNavRef.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
      toggleLanguageMenu();
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.lang-switcher')) {
        toggleLanguageMenu(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        toggleLanguageMenu(false);
      }
    });
  }

  // current page marker
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .footer-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const normalized = href.split('#')[0];
    if (normalized === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // tabs
  document.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
    const buttons = tabsRoot.querySelectorAll('[data-tab-target]');
    const panels = tabsRoot.querySelectorAll('.tab-panel');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-tab-target');
        buttons.forEach((btn) => {
          btn.classList.toggle('active', btn === button);
          btn.setAttribute('aria-selected', String(btn === button));
        });
        panels.forEach((panel) => {
          panel.classList.toggle('active', panel.id === targetId);
        });
      });
    });
  });

  // mobile menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.querySelector('.nav-shell');

  if (mobileToggle && mainNav) {
    const closeMobileMenu = () => {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    const openMobileMenu = () => {
      toggleLanguageMenu(false);
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mainNav.classList.add('active');
      document.body.classList.add('menu-open');
    };

    mobileToggle.setAttribute('aria-expanded', 'false');

    mobileToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (mainNav.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mainNav.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    document.querySelectorAll('.nav-shell .nav-link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (event) => {
      if (!mainNav.classList.contains('active')) return;
      if (mainNav.contains(event.target) || mobileToggle.contains(event.target)) return;
      closeMobileMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  // static site config
  const siteConfig = {
    bookingUrl: 'https://calendly.com/vadymshved/triallesson/',
    contactEmail: 'shvedvadym@gmail.com',
    travelProjectUrl: 'https://www.instagram.com/vadymtravels/',
    cvFile: 'assets/docs/CV.pdf',
    resourceLinks: {
      schoolChemistry: 'resources.html',
      chemistryMaterials: 'resources.html',
      interactiveTools: 'resources.html'
    },
    institutionLinks: [
      { key: 'institution_taras_shevchenko_national_university_of_kyiv', fallback: 'Taras Shevchenko National University of Kyiv', url: 'https://knu.ua/' },
      { key: 'institution_institute_of_high_technologies', fallback: 'Institute of High Technologies', url: 'https://iht.knu.ua/' },
      { key: 'institution_ecole_centrale_de_lyon', fallback: 'École Centrale de Lyon', url: 'https://www.ec-lyon.fr/' },
      { key: 'institution_phbern', fallback: 'PHBern', url: 'https://www.phbern.ch/' },
      { key: 'institution_university_of_basel', fallback: 'University of Basel', url: 'https://www.unibas.ch/' },
      { key: 'institution_institut_lumiere_matiere', fallback: 'Institut Lumière Matière', url: 'https://ilm.univ-lyon1.fr/' },
      { key: 'institution_iflab', fallback: 'I.F.LAB', url: 'https://iflab.com/' },
      { key: 'institution_life_chemicals', fallback: 'Life Chemicals', url: 'https://lifechemicals.com/' },
      { key: 'institution_enamine', fallback: 'Enamine', url: 'https://enamine.net/' },
      { key: 'institution_institute_of_organic_chemistry_nas', fallback: 'Institute of Organic Chemistry NAS', url: 'https://ioch.org.ua/en/' },
      { key: 'institution_swiss_chem_olymp', fallback: 'Swiss Chem Olymp', url: 'https://chemistry.olympiad.ch/en/' },
      { key: 'institution_ukr_chem_olymp', fallback: 'Ukr Chem Olymp', url: 'https://www.ukrchemolimp.com/' },
      { key: 'institution_brobots', fallback: '#brobots', url: 'https://brobots.org.ua/' },
      { key: 'institution_campus_muristalden', fallback: 'Campus Muristalden', url: 'https://www.muristalden.ch/' },
      { key: 'institution_gymnasium_neufeld', fallback: 'Gymnasium Neufeld', url: 'https://gymneufeld.ch/' },
      { key: 'institution_standort_manuel', fallback: 'Standort Manuel', url: 'https://kirchenfeld-schosshalde.ch/manuel/' },
      { key: 'institution_sekundarschule_hochfeld_1', fallback: 'Sekundarschule Hochfeld 1', url: 'https://laenggasse-felsenau.ch/hochfeld_1/' },
      { key: 'institution_oberstufenschule_buchholz', fallback: 'Oberstufenschule Buchholz', url: 'https://www.buchholz.ch/' },
      { key: 'institution_vadymtravels', fallback: '@vadymtravels', url: 'https://www.instagram.com/vadymtravels/' }
    ]
  };

  function applySiteConfig() {
    const bookingUrl = siteConfig.bookingUrl || '#';
    const contactEmail = siteConfig.contactEmail || 'your.email@example.com';
    const mailtoHref = `mailto:${contactEmail}`;

    document.querySelectorAll('[data-booking-link]').forEach((link) => {
      link.setAttribute('href', bookingUrl);
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noreferrer');
      }
    });

    document.querySelectorAll('[data-contact-email-link]').forEach((link) => {
      link.setAttribute('href', mailtoHref);
    });

    document.querySelectorAll('[data-contact-email-text]').forEach((node) => {
      node.textContent = contactEmail;
    });

    document.querySelectorAll('[data-cv-link]').forEach((link) => {
      link.setAttribute('href', siteConfig.cvFile);
    });

    document.querySelectorAll('[data-travel-link]').forEach((link) => {
      link.setAttribute('href', siteConfig.travelProjectUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noreferrer');
    });

    document.querySelectorAll('[data-resource-link]').forEach((link) => {
      const key = link.getAttribute('data-resource-link');
      const href = (siteConfig.resourceLinks && siteConfig.resourceLinks[key]) || 'resources.html';
      link.setAttribute('href', href);
    });

    const rail = document.getElementById('homeInstitutionLinks');
    if (rail) {
      rail.innerHTML = '';
      siteConfig.institutionLinks.forEach((item) => {
        const a = document.createElement('a');
        a.className = 'institution-link-chip';
        a.href = item.url;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.textContent = t(item.key, item.fallback);
        rail.appendChild(a);
      });
    }
  }
  applySiteConfig();

  // accordions
  document.querySelectorAll('.skills-accordion, .bio-accordion, .teaching-focus-accordion').forEach((details) => {
    details.removeAttribute('open');
    const summary = details.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      details.toggleAttribute('open');
    });
  });

  // Resource library interactions
  (function () {
    const libraryRoot = document.querySelector('.page-library');
    if (!libraryRoot) return;
    const searchInput = document.getElementById('librarySearch');
    const sortSelect = document.getElementById('librarySort');
    const cards = Array.from(document.querySelectorAll('.library-book-card'));
    const resultTitle = document.getElementById('libraryResultTitle');
    const resultMeta = document.getElementById('libraryResultMeta');
    const emptyState = document.getElementById('libraryEmptyState');

    const detail = {
      cover: document.getElementById('libraryDetailCover'),
      title: document.getElementById('libraryModalTitle'),
      subtitle: document.getElementById('libraryDetailSubtitle'),
      description: document.getElementById('libraryDetailDescription'),
      type: document.getElementById('libraryDetailType'),
      level: document.getElementById('libraryDetailLevel'),
      language: document.getElementById('libraryDetailLanguage'),
      country: document.getElementById('libraryDetailCountry'),
      badges: document.getElementById('libraryDetailBadges'),
      keywords: document.getElementById('libraryDetailKeywords'),
      downloadBtn: document.getElementById('libraryDownloadBtn'),
      externalBtn: document.getElementById('libraryExternalBtn'),
      use: document.getElementById('libraryDetailUse')
    };

    const modal = document.getElementById('libraryModalBackdrop');
    const modalClose = document.getElementById('libraryModalClose');
    const sidebar = document.getElementById('librarySidebar');
    const drawerToggle = document.getElementById('libraryFilterDrawerToggle');

    let activeQuick = 'all';
    let activeGroupFilter = '';
    let activeGroupType = '';

    const labels = {
      all: ['ui_library_label_all_resources', 'All Resources'],
      book: ['ui_library_label_books', 'Books'],
      pdf: ['ui_library_label_pdfs', 'PDFs'],
      guide: ['ui_library_label_guides', 'Guides'],
      'interactive-tool': ['ui_library_label_interactive_tools', 'Interactive Tools'],
      'comparative-resource': ['ui_library_label_comparative_materials', 'Comparative Materials'],
      'school-chemistry': ['ui_library_label_school_chemistry', 'School Chemistry'],
      'ib-advanced': ['ui_library_label_ib_advanced', 'IB / Advanced'],
      'university-beginners': ['ui_library_label_university_beginners', 'University Beginners'],
      'german-learning': ['ui_library_label_german_learning', 'German Learning'],
      'study-support': ['ui_library_label_study_support', 'Study Support'],
      'didactics-pedagogy': ['ui_library_label_didactics_pedagogy', 'Didactics & Pedagogy'],
      'frequently-used': ['ui_library_label_frequently_used', 'Frequently Used'],
      favorite: ['ui_library_label_favorite_books', 'Favorite Books'],
      recommended: ['ui_library_label_recommended', 'Recommended'],
      'core-teaching-materials': ['ui_library_label_core_teaching_materials', 'Core Teaching Materials'],
      'comparative-curriculum': ['ui_library_label_comparative_curriculum', 'Comparative Curriculum'],
      english: ['ui_library_label_english', 'English'],
      german: ['ui_library_label_german', 'German'],
      french: ['ui_library_label_french', 'French'],
      spanish: ['ui_library_label_spanish', 'Spanish'],
      ukrainian: ['ui_library_label_ukrainian', 'Ukrainian'],
      russian: ['ui_library_label_russian', 'Russian'],
      switzerland: ['ui_library_label_switzerland', 'Switzerland'],
      germany: ['ui_library_label_germany', 'Germany'],
      france: ['ui_library_label_france', 'France'],
      poland: ['ui_library_label_poland', 'Poland'],
      ukraine: ['ui_library_label_ukraine', 'Ukraine'],
      'usa-canada': ['ui_library_label_usa_canada', 'USA / Canada'],
      downloadable: ['ui_library_label_downloadable', 'Downloadable']
    };

    const closeModal = () => {
      if (!modal) return;
      modal.hidden = true;
      document.body.classList.remove('menu-open');
    };
    const openModal = () => {
      if (!modal) return;
      modal.hidden = false;
      document.body.classList.add('menu-open');
    };

    const matches = (card, filter, group) => {
      if (!filter || filter === 'all') return true;
      const data = card.dataset;
      if (filter === 'downloadable') return !!data.download && data.download !== '#';
      if (group === 'quick') return data.type === filter || (data.tags || '').includes(filter);
      if (group === 'category') return data.type === filter;
      if (group === 'collection') return data.collection === filter;
      if (group === 'tag') return (data.tags || '').includes(filter);
      if (group === 'language') return data.language === filter;
      if (group === 'country') return data.country === filter;
      return true;
    };

    const renderDetail = (card) => {
      cards.forEach((item) => item.classList.toggle('selected', item === card));
      const cover = card.querySelector('.library-cover');
      if (detail.cover && cover) {
        detail.cover.className = 'library-detail-cover compact ' + cover.className.split(' ').slice(1).join(' ');
        detail.cover.innerHTML = cover.innerHTML;
      }
      if (detail.title) detail.title.textContent = card.dataset.title || '';
      if (detail.subtitle) detail.subtitle.textContent = card.dataset.subtitle || '';
      if (detail.description) detail.description.textContent = card.dataset.description || '';
      if (detail.use) detail.use.textContent = card.dataset.description || '';
      if (detail.type) detail.type.textContent = (card.dataset.type || '').replace(/-/g, ' ');
      if (detail.level) detail.level.textContent = card.dataset.level || '';
      if (detail.language) detail.language.textContent = card.dataset.language || '';
      if (detail.country) detail.country.textContent = card.dataset.country || '';

      if (detail.badges) {
        detail.badges.innerHTML = '';
        (card.dataset.tags || '').split(' ').slice(0, 4).forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'tag';
          const labelRef = labels[tag];
          span.textContent = labelRef ? t(labelRef[0], labelRef[1]) : tag.replace(/-/g, ' ');
          detail.badges.appendChild(span);
        });
      }

      if (detail.keywords) {
        detail.keywords.innerHTML = '';
        (card.dataset.keywords || '').split(' ').slice(0, 8).forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tag;
          detail.keywords.appendChild(span);
        });
      }

      if (detail.downloadBtn) detail.downloadBtn.href = card.dataset.download || '#';
      if (detail.externalBtn) detail.externalBtn.href = card.dataset.external || '#';
    };

    const applyFilters = () => {
      const q = (searchInput?.value || '').trim().toLowerCase();
      let visibleCount = 0;
      cards.forEach((card) => {
        const hay = [
          card.dataset.title, card.dataset.subtitle, card.dataset.description,
          card.dataset.keywords, card.dataset.tags, card.dataset.language,
          card.dataset.country, card.dataset.collection, card.dataset.type
        ].join(' ').toLowerCase();
        const visible = matches(card, activeQuick, 'quick') && matches(card, activeGroupFilter, activeGroupType) && (!q || hay.includes(q));
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      const grid = document.getElementById('libraryGrid');
      const value = sortSelect?.value || 'manual';
      const sorted = [...cards];
      if (value === 'title') sorted.sort((a,b)=> (a.dataset.title||'').localeCompare(b.dataset.title||''));
      if (value === 'language') sorted.sort((a,b)=> (a.dataset.language||'').localeCompare(b.dataset.language||''));
      if (value === 'country') sorted.sort((a,b)=> (a.dataset.country||'').localeCompare(b.dataset.country||''));
      sorted.forEach((card)=>grid?.appendChild(card));

      const firstVisible = sorted.find((card)=> !card.hidden);
      if (firstVisible) renderDetail(firstVisible);
      if (emptyState) emptyState.hidden = visibleCount !== 0;
      if (resultTitle) {
        const titleRef = labels[activeGroupFilter || activeQuick];
        resultTitle.textContent = titleRef ? t(titleRef[0], titleRef[1]) : 'All Resources';
      }
      if (resultMeta) {
        const suffix = visibleCount === 1
          ? t('ui_library_result_singular', 'resource in the current selection.')
          : t('ui_library_result_plural', 'resources in the current selection.');
        resultMeta.textContent = `${visibleCount} ${suffix}`;
      }
    };

    cards.forEach((card) => {
      card.addEventListener('click', () => { renderDetail(card); openModal(); });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          renderDetail(card);
          openModal();
        }
      });
    });

    document.querySelectorAll('[data-library-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.libraryFilter || 'all';
        const group = button.dataset.filterGroup || 'quick';
        if (group === 'quick') {
          activeQuick = filter;
          document.querySelectorAll('.library-filter-pill').forEach((pill)=>pill.classList.toggle('active', pill === button));
        } else {
          activeGroupFilter = filter;
          activeGroupType = group;
          document.querySelectorAll(`.page-library [data-filter-group="${group}"]`).forEach((item)=>item.classList.toggle('active', item === button));
        }
        applyFilters();
        if (sidebar && sidebar.classList.contains('is-open') && window.innerWidth <= 820) {
          sidebar.classList.remove('is-open');
        }
      });
    });

    searchInput?.addEventListener('input', applyFilters);
    sortSelect?.addEventListener('change', applyFilters);
    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
        sidebar?.classList.remove('is-open');
      }
    });
    drawerToggle?.addEventListener('click', () => sidebar?.classList.toggle('is-open'));

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const target = document.querySelector(`[data-library-filter="${hash}"]`);
      if (target) target.click();
      else applyFilters();
    } else {
      applyFilters();
    }
  })();

  // Portfolio filters
  (function () {
    const page = document.getElementById('research-portfolio');
    if (!page) return;
    const buttons = Array.from(page.querySelectorAll('.portfolio-pill[data-filter]'));
    const cards = Array.from(page.querySelectorAll('.portfolio-filter-card'));
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        cards.forEach((card) => {
          const cat = card.getAttribute('data-cat') || '';
          card.hidden = !(filter === 'all' || cat === filter);
        });
      });
    });
  })();

  // Gallery interactions
  (function () {
    const page = document.getElementById('gallery-page');
    if (!page) return;

    const pills = Array.from(page.querySelectorAll('.gallery-filter-pill'));
    const albumCards = Array.from(page.querySelectorAll('.gallery-album-card'));
    const photoCards = Array.from(page.querySelectorAll('.gallery-photo-card'));
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('gallery-lightbox-image');
    const lightboxCaption = document.getElementById('gallery-lightbox-caption');
    const closeButton = page.parentElement.querySelector('.gallery-lightbox-close') || document.querySelector('.gallery-lightbox-close');

    const applyFilter = (filter) => {
      pills.forEach((pill) => pill.classList.toggle('active', pill.getAttribute('data-gallery-filter') === filter));
      photoCards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        card.hidden = !(filter === 'all' || cat === filter);
      });
    };

    pills.forEach((pill) => {
      pill.addEventListener('click', () => applyFilter(pill.getAttribute('data-gallery-filter')));
    });

    albumCards.forEach((card) => {
      card.addEventListener('click', () => {
        const filter = card.getAttribute('data-gallery-filter');
        applyFilter(filter);
        document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const hash = window.location.hash.replace('#', '');
    if (['teaching', 'science', 'life'].includes(hash)) applyFilter(hash);

    photoCards.forEach((card) => {
      card.addEventListener('click', () => {
        if (!lightbox || !lightboxImg || !lightboxCaption) return;
        lightboxImg.src = card.getAttribute('data-src') || '';
        lightboxImg.alt = card.getAttribute('data-caption') || '';
        lightboxCaption.textContent = card.getAttribute('data-caption') || '';
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };

    closeButton?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });
  })();

  // Home image binding
  (function () {
    const heroTarget = document.querySelector('[data-site-media-target="homeHeroPortrait"]');
    const homeTiles = document.querySelectorAll('[data-gallery-preview-home]');
    if (!heroTarget && !homeTiles.length) return;

    const applyHomeImages = (data) => {
      try {
        const hero = data?.homeHeroPortrait?.src || data?.heroPortrait;
        if (hero && heroTarget) {
          let img = heroTarget.querySelector('.portrait-box-image');
          if (!img) {
            img = document.createElement('img');
            img.className = 'portrait-box-image';
            heroTarget.appendChild(img);
          }
          img.src = hero;
          img.alt = data?.homeHeroPortrait?.alt || 'Professional portrait of Vadym Shved';
        }

        const cards = Array.isArray(data?.homeCards) ? data.homeCards : [];
        if (cards.length) {
          const map = {};
          cards.forEach((card) => {
            if (card?.title) map[String(card.title).toLowerCase()] = card.image;
          });

          homeTiles.forEach((tile) => {
            const key = (tile.getAttribute('data-gallery-preview-home') || '').toLowerCase();
            const img = tile.querySelector('img');
            if (img && map[key]) img.src = map[key];
          });
        }
      } catch (err) {}
    };

    fetch('assets/data/site-media.json')
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('site-media.json not found')))
      .then((siteMedia) => {
        return fetch('assets/data/images-home.json')
          .then((r) => r.ok ? r.json() : ({ heroPortrait: siteMedia?.homeHeroPortrait?.src || '', homeCards: [] }))
          .then((homeImages) => {
            applyHomeImages({
              homeHeroPortrait: siteMedia?.homeHeroPortrait,
              heroPortrait: homeImages?.heroPortrait,
              homeCards: homeImages?.homeCards || []
            });
          });
      })
      .catch(() => {
        applyHomeImages({
          homeHeroPortrait: {
            src: 'assets/images/gallery/portrait/hero-portrait.jpg',
            alt: t('ui_professional_portrait_alt', 'Professional portrait of Vadym Shved')
          },
          homeCards: [
            { title: 'Teaching', image: 'assets/images/gallery/teaching/teaching-1.jpg' },
            { title: 'Science', image: 'assets/images/gallery/science/science-1.jpg' },
            { title: 'Life', image: 'assets/images/gallery/life/life-1.jpg' }
          ]
        });
      });
  })();
})();
