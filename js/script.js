// GANTI NOMOR INI DENGAN NOMOR WHATSAPP LAUNDRYKITA
const WHATSAPP_NUMBER = "6281234567890";

const PRICES = {
    "Cuci Kering": 7000,
    "Cuci Setrika": 10000,
    "Setrika": 5000,
    "Laundry Sepatu": 20000
};

const UNITS = {
    "Cuci Kering": "kg",
    "Cuci Setrika": "kg",
    "Setrika": "kg",
    "Laundry Sepatu": "pasang"
};

function formatRupiah(num) {
    return 'Rp' + num.toLocaleString('id-ID');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('hamburgerBtn');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
        line1.style.transform = 'rotate(45deg) translate(4px, 4px)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';
    }
}

function calculatePrice() {
    const serviceSelect = document.getElementById('service');
    const quantityInput = document.getElementById('quantity');
    const estimateBox = document.getElementById('estimateBox');
    const breakdownEl = document.getElementById('priceBreakdown');
    const totalEl = document.getElementById('totalPrice');

    if (!serviceSelect || !quantityInput || !estimateBox) return;

    const service = serviceSelect.value;
    const quantity = parseInt(quantityInput.value) || 0;

    if (service && quantity > 0) {
        const unitPrice = PRICES[service];
        const unit = UNITS[service];
        const total = unitPrice * quantity;
        breakdownEl.textContent = formatRupiah(unitPrice) + ' x ' + quantity + ' ' + unit;
        totalEl.textContent = formatRupiah(total);
        estimateBox.classList.remove('hidden');
    } else {
        estimateBox.classList.add('hidden');
    }
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(function(el) { el.remove(); });
    document.querySelectorAll('.input-error').forEach(function(el) { el.classList.remove('input-error'); });
}

function showError(inputEl, message) {
    inputEl.classList.add('input-error');
    var err = document.createElement('p');
    err.className = 'field-error text-red-500 text-xs mt-1.5';
    err.textContent = message;
    inputEl.parentNode.appendChild(err);
}

function validateForm() {
    clearErrors();
    var valid = true;

    var name = document.getElementById('fullName');
    var whatsapp = document.getElementById('whatsapp');
    var service = document.getElementById('service');
    var quantity = document.getElementById('quantity');

    if (!name.value.trim()) {
        showError(name, 'Nama wajib diisi');
        valid = false;
    }

    if (!whatsapp.value.trim()) {
        showError(whatsapp, 'Nomor WhatsApp wajib diisi');
        valid = false;
    } else if (!/^[0-9]{10,13}$/.test(whatsapp.value.replace(/\s/g, ''))) {
        showError(whatsapp, 'Nomor WhatsApp tidak valid');
        valid = false;
    }

    if (!service.value) {
        showError(service, 'Pilih layanan');
        valid = false;
    }

    if (!quantity.value || parseInt(quantity.value) < 1) {
        showError(quantity, 'Jumlah minimal 1');
        valid = false;
    }

    return valid;
}

function sendWhatsApp() {
    if (!validateForm()) return;

    var name = document.getElementById('fullName').value.trim();
    var whatsapp = document.getElementById('whatsapp').value.trim();
    var service = document.getElementById('service').value;
    var quantity = document.getElementById('quantity').value;
    var notes = document.getElementById('notes') ? document.getElementById('notes').value.trim() : '';
    var total = PRICES[service] * parseInt(quantity);
    var unit = UNITS[service];

    var msg = 'Halo LaundryKita,\n\n';
    msg += 'Saya ingin melakukan pemesanan laundry.\n\n';
    msg += 'Nama: ' + name + '\n';
    msg += 'No. WhatsApp: ' + whatsapp + '\n';
    msg += 'Layanan: ' + service + '\n';
    msg += 'Jumlah: ' + quantity + ' ' + unit + '\n';
    if (notes) msg += 'Catatan: ' + notes + '\n';
    msg += '\nEstimasi Total: ' + formatRupiah(total) + '\n\n';
    msg += 'Terima kasih.';

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
}

function initAnimations() {
    var elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(function(el) { observer.observe(el); });
}

function initNavScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initNavScroll();

    var serviceSelect = document.getElementById('service');
    var quantityInput = document.getElementById('quantity');
    if (serviceSelect) serviceSelect.addEventListener('change', calculatePrice);
    if (quantityInput) quantityInput.addEventListener('input', calculatePrice);
});
