document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Efecto Scroll en el Header y Link Activo
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Menú Móvil (Hamburguesa)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const hamburgerIcon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('fa-bars');
        hamburgerIcon.classList.toggle('fa-xmark');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerIcon.classList.add('fa-bars');
            hamburgerIcon.classList.remove('fa-xmark');
        });
    });

    // 4. Galería Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const highResSrc = item.getAttribute('data-src');
            lightboxImg.src = highResSrc;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 5. Cotizador Interactivo + Envío a WhatsApp Oficial (56 6945 1916)
    const qPlan = document.getElementById('q-plan');
    const qPeople = document.getElementById('q-people');
    const calcPlanName = document.getElementById('calc-plan-name');
    const calcPeopleCount = document.getElementById('calc-people-count');
    const calcTotalPrice = document.getElementById('calc-total-price');
    const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
    const quoteForm = document.getElementById('quote-form');

    function updateQuoteCalculator() {
        const selectedOption = qPlan.options[qPlan.selectedIndex];
        const unitPrice = parseFloat(selectedOption.value);
        const planLabel = selectedOption.getAttribute('data-label');
        const people = parseInt(qPeople.value, 10);

        calcPlanName.textContent = planLabel;
        calcPeopleCount.textContent = people === 1 ? '1 Persona' : `${people} Personas`;

        if (unitPrice === 0) {
            calcTotalPrice.textContent = 'A confirmar en recepción';
        } else {
            const total = unitPrice * people;
            calcTotalPrice.textContent = `$${total.toLocaleString('es-MX')} MXN`;
        }
    }

    qPlan.addEventListener('change', updateQuoteCalculator);
    qPeople.addEventListener('change', updateQuoteCalculator);

    // Preseleccionar plan al dar clic en las tarjetas de precios
    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPlan = btn.getAttribute('data-plan');
            for (let i = 0; i < qPlan.options.length; i++) {
                if (qPlan.options[i].getAttribute('data-label').includes(targetPlan.split(' ')[0])) {
                    qPlan.selectedIndex = i;
                    break;
                }
            }
            updateQuoteCalculator();
        });
    });

    // Enviar formulario directo a WhatsApp de Valkoor.Gym
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('q-name').value.trim();
        const phone = document.getElementById('q-phone').value.trim();
        const goal = document.getElementById('q-goal').value;
        const planText = calcPlanName.textContent;
        const peopleText = calcPeopleCount.textContent;
        const totalText = calcTotalPrice.textContent;

        const whatsappNumber = '525669451916';
        const message = `Hola *Valkoor.Gym* 💪, me gustaría solicitar una cotización:%0A%0A` +
            `👤 *Nombre:* ${name}%0A` +
            `📱 *Teléfono:* ${phone}%0A` +
            `🏋️ *Plan:* ${planText}%0A` +
            `👥 *Cantidad:* ${peopleText}%0A` +
            `🎯 *Objetivo:* ${goal}%0A` +
            `💰 *Estimado:* ${totalText}`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    });
});