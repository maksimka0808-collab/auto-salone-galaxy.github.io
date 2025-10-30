// ===== Плавная прокрутка к якорям =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // немного отступа от верха
        behavior: 'smooth'
      });
    }
  });
});


// ====== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ ======
const revealElements = document.querySelectorAll('section, .car-card, .about-gallery img, .faq-item');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== PARALLAX SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const parallaxSections = document.querySelectorAll(".parallax-bg");
  parallaxSections.forEach(section => {
    const speed = 0.4; // скорость эффекта (0.3–0.6 оптимально)
    const offset = window.scrollY * speed;
    section.style.backgroundPositionY = `${offset}px`;
  });
});


// ===== Sticky Header Scroll Effect =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== Анимация логотипа при загрузке =====
window.addEventListener("load", () => {
  const logo = document.querySelector(".logo h1");
  if (logo) {
    logo.style.opacity = "1";
  }
});


// ===== Поддержка активных labels при автозаполнении =====
window.addEventListener("load", () => {
  document.querySelectorAll(".contact-form input, .contact-form textarea").forEach((field) => {
    if (field.value.trim() !== "") {
      field.classList.add("filled");
    }
    field.addEventListener("input", () => {
      if (field.value.trim() !== "") field.classList.add("filled");
      else field.classList.remove("filled");
    });
  });
});


// ===== АККОРДЕОН ДЛЯ FAQ =====
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const allItems = document.querySelectorAll(".faq-item");

    // Если хотим, чтобы только один был открыт — закрываем остальные
    allItems.forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    // Переключаем текущее
    item.classList.toggle("active");
  });
});


// ===== ЭФФЕКТ ПЕЧАТАЮЩЕЙСЯ МАШИНКИ =====
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("typing-text");
  const text = "AutoGalaxy — скорость, стиль и инновации.";
  let index = 0;

  function type() {
    if (index < text.length) {
      textElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 80); // Скорость печати (чем меньше — тем быстрее)
    }
  }

  type();
});


const showMoreBtn = document.querySelector('.show-more');
const hiddenCars = document.querySelectorAll('.hidden-car');
let expanded = false;

showMoreBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!expanded) {
    // показать карточки
    hiddenCars.forEach((card, i) => {
      setTimeout(() => {
        card.style.display = 'block';
        setTimeout(() => card.classList.add('show'), 50);
      }, i * 200);
    });
    showMoreBtn.textContent = 'Скрыть';
    expanded = true;
  } else {
    // скрыть карточки
    hiddenCars.forEach((card, i) => {
      setTimeout(() => {
        card.classList.remove('show');
        setTimeout(() => (card.style.display = 'none'), 500);
      }, i * 100);
    });
    showMoreBtn.textContent = 'Показать больше';
    expanded = false;
  }
});


const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navbar.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navbar.classList.remove('active');
  });
});

// ===== DYNAMIC PROGRESS (scroll + programmatic API) =====
(function () {
  const container = document.getElementById('page-progress');
  const bar = document.getElementById('page-progress__bar');

  if (!container || !bar) return;

  // обновляет aria и стиль
  function applyProgress(percent) {
    const p = Math.max(0, Math.min(100, Math.round(percent)));
    bar.style.width = p + '%';
    bar.setAttribute('aria-valuenow', p);
    container.setAttribute('aria-valuenow', p);
    // пометка полного завершения
    if (p >= 100) {
      bar.classList.add('complete');
      // через 700ms можно скрывать, если нужно:
      setTimeout(() => {
        // bar.style.opacity = '0'; // раскомментировать если нужно авто-скрытие
      }, 700);
    } else {
      bar.classList.remove('complete');
      // bar.style.opacity = '1';
    }
  }

  // -------- Scroll progress --------
  let ticking = false;
  function updateScrollProgress() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const scrollable = Math.max(1, docHeight - winH);
    const percent = (scrollTop / scrollable) * 100;
    applyProgress(percent);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }, { passive: true });

  // инициализация сразу
  updateScrollProgress();

  // -------- Programmatic API --------
  // Позволяет программно устанавливать прогресс: setProgress(percent)
  window.setProgress = function (percent) {
    // percent: 0..100
    applyProgress(percent);
  };

  // Пример использования для имитации загрузки:
  // window.simulateLoad = function() {
  //   let v = 0;
  //   const t = setInterval(()=> {
  //     v += Math.random()*12;
  //     window.setProgress(Math.min(100, v));
  //     if (v >= 100) clearInterval(t);
  //   }, 250);
  // };
})();

// ===== PRELOADER SCRIPT =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide"); // плавно скрываем
    setTimeout(() => preloader.remove(), 1200); // полностью удаляем из DOM
  }
});
