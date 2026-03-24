jQuery(document).ready(function () {


    // toggle search form
    const searchTrigger = document.querySelector('.search-icon'),
        searchForm = document.querySelector('.search-form-wrapper');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            searchForm.classList.toggle('active');
        })
    }

    // nested nav mobile
    if (jQuery(window).width() <= 992) {
        jQuery(".menu-item-has-children").click(function (e) {
            // Only prevent default and toggle if click is outside the sub-menu
            if (jQuery(e.target).closest(".sub-menu").length > 0) {
                return;
            }
            e.preventDefault();
            const $this = jQuery(this);
            $this.children(".sub-menu").slideToggle(300);
            $this.children("a").toggleClass("icon-rotate");
            jQuery(".menu-item-has-children").not($this).children(".sub-menu").slideUp(300);
            jQuery(".menu-item-has-children").not($this).children("a").removeClass("icon-rotate");
        });
    }

    // ************************************************************************************************
    // open and close sidebar

    jQuery(".bars").on("click", function () {
        jQuery(".line1").toggleClass("rotate-line1");
        jQuery(".line2").toggleClass("hide-line2");
        jQuery(".line3").toggleClass("rotate-line3");
        jQuery(".navigation").toggleClass("open-sidebar");
        jQuery("body").toggleClass("overflow-hidden");
    });


    // ************************************************************************************************
    // show and hide to top button

    jQuery(window).on("scroll", function () {
        if (jQuery(window).scrollTop() > 100) {
            jQuery(".up-btn").addClass("show");
        }
        if (jQuery(window).scrollTop() == 0) {
            jQuery(".up-btn").removeClass("show");
        }
    });

    jQuery(".up-btn").on("click", function () {
        jQuery("html , body").animate({ scrollTop: 0 }, 0);
    });



    // ************************************************************************************************
    // swiper slider

    // first check if the page has .swiper class
    if (jQuery(".swiper").length > 0) {
        const specialitiesSlider = new Swiper(".specialities-slider", {
            loop: true,
            draggable: true,
            autoplay: true,
            spaceBetween: 45,
            // navigation: {
            //     nextEl: ".specialities-slider .swiper-button-next",
            //     prevEl: ".specialities-slider .swiper-button-prev",
            // },
            pagination: {
                el: ".specialities-slider .swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                350: {
                    slidesPerView: 2,
                    spaceBetween: 15,

                },
                500: {
                    slidesPerView: 2,
                    spaceBetween: 20,

                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },

        });
        const teachersSlider = new Swiper(".teachers-slider", {
            loop: true,
            draggable: true,
            autoplay: true,
            spaceBetween: 45,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                350: {
                    slidesPerView: 1,
                    spaceBetween: 15,

                },
                500: {
                    slidesPerView: 1,
                    spaceBetween: 20,

                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },


        });
    }





    /*Faq Accordion*/

    $(".faq-title").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const $this = $(this);
        const $content = $this.next('.faq-content');
        const isCurrentlyActive = $this.hasClass("active");

        // Close all other FAQ items first
        $(".faq-title").not($this).removeClass("active");
        $(".faq-content").not($content).slideUp(300);

        // Toggle current item
        if (!isCurrentlyActive) {
            $this.addClass("active");
            $content.slideDown(300);
        } else {
            $this.removeClass("active");
            $content.slideUp(300);
        }

        return false;
    });

    // Footer Accordion
    $(".footer-title").on("click", function () {
        if ($(window).width() <= 767) {
            const $this = $(this);
            $this.toggleClass("active");
            $this.next("ul").slideToggle(300);
        }
    });

    $(window).on("resize", function () {
        if ($(window).width() > 767) {
            $(".footer-title").removeClass("active");
            $(".footer-title").next("ul").removeAttr("style");
        }
    });

    // User Menu Toggle for Mobile
    $(".user-menu-toggle").on("click", function () {
        if ($(window).width() <= 991) {
            const $this = $(this);
            $this.toggleClass("active");
            $this.closest(".user-menu").find(".menu-list").slideToggle(300);
        }
    });

    $(window).on("resize", function () {
        if ($(window).width() > 991) {
            $(".user-menu-toggle").removeClass("active");
            $(".menu-list").removeAttr("style");
        }
    });

    // OTP Modal Logic
    const registerForm = document.getElementById('registerForm');
    const otpModalElement = document.getElementById('otpModal');
    const registerBtn = document.getElementById('registerSubmitBtn');

    if (otpModalElement) {
        const openOtpModal = () => {
            const emailInput = document.getElementById('registerEmail');
            const displayEmail = document.querySelector('.otp-user-email');
            if (emailInput && displayEmail) {
                displayEmail.textContent = emailInput.value || 'user@example.com';
            }

            if (typeof bootstrap !== 'undefined') {
                const bsModal = bootstrap.Modal.getOrCreateInstance(otpModalElement);
                bsModal.show();
            }
        };

        if (registerForm) {
            registerForm.addEventListener('submit', function (e) {
                e.preventDefault();
                openOtpModal();
            });
        }

        if (registerBtn) {
            registerBtn.addEventListener('click', function (e) {
                // If the button is not type="submit", we trigger it manually
                // If it is submit, the form listener will handle it
                if (this.getAttribute('type') !== 'submit') {
                    e.preventDefault();
                    openOtpModal();
                }
            });
        }

        // Handle "Verify" button click
        const verifyBtn = document.getElementById('verifyBtn');
        const successModalElement = document.getElementById('successModal');

        if (verifyBtn && successModalElement) {
            verifyBtn.addEventListener('click', function () {
                // Hide current modal
                const otpModal = bootstrap.Modal.getInstance(otpModalElement);
                if (otpModal) otpModal.hide();

                // Show success modal after a short delay
                setTimeout(() => {
                    const successModal = bootstrap.Modal.getOrCreateInstance(successModalElement);
                    successModal.show();
                    
                    // Start 3-second redirection timer
                    let timeLeft = 3;
                    const timerEl = document.getElementById('redirect-timer');
                    const countdown = setInterval(() => {
                        timeLeft--;
                        if (timerEl) timerEl.textContent = timeLeft;

                        if (timeLeft <= 0) {
                            clearInterval(countdown);
                            // If we are on the recovery flow, go to reset-password
                            if (window.location.pathname.includes('otp-recovery')) {
                                window.location.href = 'reset-password.html';
                            } else {
                                window.location.href = 'index.html';
                            }
                        }
                    }, 1000);
                }, 400);
            });
        }
    }

    // Standalone OTP Page Logic
    const verifyOtpBtnPage = document.getElementById('verifyOtpBtnPage');
    if (verifyOtpBtnPage) {
        const successModalElement = document.getElementById('successModal');

        // Logic for the verification button on OTP page
        verifyOtpBtnPage.addEventListener('click', function () {
            if (successModalElement) {
                const successModal = bootstrap.Modal.getOrCreateInstance(successModalElement);
                successModal.show();

                // Start 3-second redirection timer (reusing the same logic)
                let timeLeft = 3;
                const timerEl = document.getElementById('redirect-timer');
                const countdown = setInterval(() => {
                    timeLeft--;
                    if (timerEl) timerEl.textContent = timeLeft;

                    if (timeLeft <= 0) {
                        clearInterval(countdown);
                        // If we are on the recovery flow, go to reset-password
                        if (window.location.pathname.includes('otp-recovery')) {
                            window.location.href = 'reset-password.html';
                        } else {
                            window.location.href = 'index.html';
                        }
                    }
                }, 1000);
            }
        });
    }

    // Reset Password Page Logic
    const resetPassBtn = document.getElementById('resetPassBtn');
    if (resetPassBtn) {
        resetPassBtn.addEventListener('click', function () {
            const successModalElement = document.getElementById('successModal');
            if (successModalElement) {
                // Update success text for password reset
                const successText = successModalElement.querySelector('.success-modal-text');
                if (successText) {
                    successText.innerHTML = 'تم تغيير كلمة المرور بنجاح وسيتم تحويلك تلقائياً خلال <span id="redirect-timer">3</span> ثواني';
                }

                const successModal = bootstrap.Modal.getOrCreateInstance(successModalElement);
                successModal.show();

                // Redirection timer
                let timeLeft = 3;
                const timerEl = document.getElementById('redirect-timer');
                const countdown = setInterval(() => {
                    timeLeft--;
                    if (timerEl) timerEl.textContent = timeLeft;
                    if (timeLeft <= 0) {
                        clearInterval(countdown);
                        window.location.href = 'login.html'; // Go to login after reset
                    }
                }, 1000);
            }
        });
    }

    // OTP Input Auto-focus & Numeric constraint
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function (e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');

            if (this.value.length === this.maxLength && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        // Handle backspace to focus previous input
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });


    // Multi-select Logic
    const multiSelectWrappers = document.querySelectorAll('.multi-select-wrapper');
    if (multiSelectWrappers.length > 0) {
        multiSelectWrappers.forEach(wrapper => {
            const trigger = wrapper.querySelector('.multi-select-trigger');
            const display = wrapper.querySelector('.multi-select-display');
            const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');

            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Close all other open wrappers
                    multiSelectWrappers.forEach(w => {
                        if (w !== wrapper) w.classList.remove('active');
                    });
                    wrapper.classList.toggle('active');
                });
            }

            // Update display text whenever a checkbox changes
            const updateDisplay = () => {
                const selectedValues = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                if (display) {
                    display.textContent = selectedValues.length > 0
                        ? selectedValues.join(' ، ')
                        : 'اختر اللغات';
                }
            };

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateDisplay);
            });

            // Run once on load to set correct initial state
            updateDisplay();
        });

        // Close all dropdowns when clicking outside
        document.addEventListener('click', () => {
            multiSelectWrappers.forEach(w => w.classList.remove('active'));
        });
    }

    // ==========================================
    // Counter Animation Logic
    // ==========================================
    const counterValues = document.querySelectorAll('.counter-value');
    if (counterValues.length > 0) {
        const animateCounter = (el) => {
            const targetStr = el.getAttribute('data-target');
            // Extract the numeric part (ignoring commas, but keeping digits)
            const numericPart = targetStr.replace(/,/g, '').match(/\d+/);
            if (!numericPart) return;

            const targetValue = parseInt(numericPart[0]);
            const duration = 2000; // 2 seconds
            const startTimestamp = performance.now();

            const step = (now) => {
                const progress = Math.min((now - startTimestamp) / duration, 1);
                // Simple easeOutQuad: t * (2 - t)
                const easedProgress = progress * (2 - progress);
                const currentValue = Math.floor(easedProgress * targetValue);

                // Format the number back with commas if it had them initially
                let formattedValue = currentValue.toString();
                if (targetStr.includes(',')) {
                    formattedValue = currentValue.toLocaleString('en-US');
                }

                // Re-insert the numeric part into the original string
                // We use replace with a regex to target ONLY the first numeric occurrence
                // This preserves symbols like + or %
                el.innerText = targetStr.replace(/\d[0-9,]*/, formattedValue);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counterValues.forEach(el => observer.observe(el));
    }
});
// wow animation
document.addEventListener("DOMContentLoaded", function () {

    const singleElements = document.querySelectorAll('section ,h1');
    singleElements.forEach(el => {
        el.classList.add('wow', 'fadeInUp');
    });


    const staggeredItems = document.querySelectorAll('.single-faq-item,.single-blog-card,.single-testimonial-card');

    staggeredItems.forEach((el, index) => {
        el.classList.add('wow', 'fadeInUp');

        let delayMultiplier = index % 3;

        if (delayMultiplier > 0) {
            el.setAttribute('data-wow-delay', `${delayMultiplier * 0.2}s`);
        }
    });

    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            offset: 50,
            mobile: true,
            live: true
        }).init();
    }
});

// ==========================================
// Open Media Modal
// ==========================================
function openMediaModal(type, src) {
    const modalBody = document.getElementById('mediaModalBody');

    // Detect Content Type
    if (type === 'image') {
        modalBody.innerHTML = `<img src="${src}" class="img-fluid rounded shadow-lg" style="max-height: 80vh; object-fit: contain;">`;
    } else if (type === 'video') {
        modalBody.innerHTML = `<video src="${src}" class="w-100 rounded shadow-lg" style="max-height: 80vh;" controls autoplay></video>`;
    }

    const modalElement = document.getElementById('mediaModal');
    const mediaModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    mediaModal.show();
}

// Clean the modal and stop the video when it is closed (with confirmation that it exists first)
const mediaModalElement = document.getElementById('mediaModal');
if (mediaModalElement) {
    mediaModalElement.addEventListener('hidden.bs.modal', function () {
        const modalBody = document.getElementById('mediaModalBody');
        if (modalBody) {
            modalBody.innerHTML = '';
        }
    });
}


// ==========================================
// Play and Stop Audio (Dynamically without ID)
// ==========================================
function toggleAudio(btn) {
    // Search for the audio file for this specific button
    let audio = btn.parentElement.querySelector('audio') ||
        btn.parentElement.parentElement.querySelector('audio') ||
        btn.closest('.audio-player-wrapper')?.querySelector('audio') ||
        btn.closest('.vocabulary-col')?.querySelector('audio');

    let icon = btn.querySelector('i');

    if (!audio) return;

    // Stop any other audio playing on the page so they don't interfere
    document.querySelectorAll('audio').forEach(a => {
        if (a !== audio) {
            a.pause();
            let otherBtn = a.parentElement.querySelector('.play-audio-btn') ||
                a.parentElement.parentElement.querySelector('.play-audio-btn') ||
                a.closest('.audio-player-wrapper')?.querySelector('.play-audio-btn') ||
                a.closest('.vocabulary-col')?.querySelector('.play-audio-btn');

            if (otherBtn) {
                let otherIcon = otherBtn.querySelector('i');
                otherBtn.classList.remove('playing');
                if (otherIcon && otherIcon.classList.contains('fa-pause')) {
                    otherIcon.classList.remove('fa-pause');
                    // Check if it should be volume or play
                    if (otherBtn.closest('.vocabulary-col')) {
                        otherIcon.classList.add('fa-volume-high');
                    } else {
                        otherIcon.classList.add('fa-play');
                    }
                }
            }
        }
    });

    // Play or Stop Current Audio
    if (audio.paused) {
        audio.play();
        btn.classList.add('playing');
        if (icon.classList.contains('fa-play')) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else if (icon.classList.contains('fa-volume-high')) {
            icon.classList.remove('fa-volume-high');
            icon.classList.add('fa-pause');
        }
    } else {
        audio.pause();
        btn.classList.remove('playing');
        if (icon.classList.contains('fa-pause')) {
            icon.classList.remove('fa-pause');
            if (btn.closest('.vocabulary-col')) {
                icon.classList.add('fa-volume-high');
            } else {
                icon.classList.add('fa-play');
            }
        }
    }
}

// Return the icon to the Play shape when the sound ends
function resetAudio(audio) {
    let btn = audio.parentElement.querySelector('.play-audio-btn') ||
        audio.parentElement.parentElement.querySelector('.play-audio-btn') ||
        audio.closest('.audio-player-wrapper')?.querySelector('.play-audio-btn') ||
        audio.closest('.vocabulary-col')?.querySelector('.play-audio-btn');

    if (btn) {
        let icon = btn.querySelector('i');
        btn.classList.remove('playing');
        if (icon && icon.classList.contains('fa-pause')) {
            icon.classList.remove('fa-pause');
            if (btn.closest('.vocabulary-col')) {
                icon.classList.add('fa-volume-high');
            } else {
                icon.classList.add('fa-play');
            }
        }
    }
}



// Add to fav active classs
const addToFavBtn = document.querySelectorAll('.add-to-fav');
if (addToFavBtn) {
    addToFavBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
        });
    });
}

// Scheduling Calendar Logic
const timeSlots = document.querySelectorAll('.time-slot');
if (timeSlots.length > 0) {
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            if (!this.disabled) {
                // Remove selected class from all
                timeSlots.forEach(s => s.classList.remove('selected'));
                // Add to clicked
                this.classList.add('selected');
            }
        });
    });
}
// =========================================================================
// ⚠️ تنبيه هام لفريق الباك إند (BACKEND TEAM) ⚠️
// الكود التالي هو داتا وهمية (Mock Data) لغرض المعاينة (Demo) فقط للتستر والعميل.
// يرجى مسح هذا الجزء واستبداله بـ API Calls الحقيقية لجلب المواعيد المتاحة
// وتحديث الـ DOM بناءً على التواريخ الراجعة من قاعدة البيانات.
// =========================================================================

const calendarPrev = document.querySelector('.calendar-prev');
const calendarNext = document.querySelector('.calendar-next');
const calendarTitle = document.querySelector('.calendar-title');
const dayDates = document.querySelectorAll('.day-date');
const timeSlotsContainers = document.querySelectorAll('.time-slots-container');

// تحديد تاريخ البداية بناءً على التصميم (9 مارس 2026)
let currentStartDate = new Date('2026-03-09');

function updateCalendarDemo(baseDate) {
    // جلب اسم الشهر بالعربي
    const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long' }).format(baseDate);
    const year = baseDate.getFullYear();

    // حساب تاريخ نهاية الأسبوع (بعد 6 أيام)
    const endDate = new Date(baseDate);
    endDate.setDate(baseDate.getDate() + 6);

    // تحديث العنوان الرئيسي
    if (calendarTitle) {
        calendarTitle.textContent = `${baseDate.getDate()} - ${endDate.getDate()} ${monthName} _ ${year}`;
    }

    // تحديث أرقام الأيام وتغيير حالة المواعيد عشوائياً
    dayDates.forEach((dayElement, index) => {
        const dayDate = new Date(baseDate);
        dayDate.setDate(baseDate.getDate() + index);

        // تحديث الرقم المعروض لليوم
        dayElement.textContent = dayDate.getDate();

        // تحديث الـ data-date
        const formattedDate = dayDate.toISOString().split('T')[0];

        if (timeSlotsContainers[index]) {
            const buttons = timeSlotsContainers[index].querySelectorAll('.time-slot');
            buttons.forEach(btn => {
                // 1. تحديث التاريخ في الداتا أتريبيوت للباك إند
                btn.setAttribute('data-date', formattedDate);

                // 2. إزالة أي تحديد (Active State) من الأسابيع اللي فاتت
                btn.classList.remove('selected');

                // 3. عشوائية المواعيد (تغيير المتاح والمحجوز بنسبة 40% تقريباً)
                // ده بيدي إيحاء واقعي جداً إن المواعيد بتتغير
                const isBookedRandomly = Math.random() < 0.4;
                btn.disabled = isBookedRandomly;
            });
        }
    });
}

if (calendarPrev) {
    calendarPrev.addEventListener('click', function () {
        currentStartDate.setDate(currentStartDate.getDate() - 7);
        updateCalendarDemo(currentStartDate);
    });
}

if (calendarNext) {
    calendarNext.addEventListener('click', function () {
        currentStartDate.setDate(currentStartDate.getDate() + 7);
        updateCalendarDemo(currentStartDate);
    });
}
// ======================= نهاية كود المعاينة الوهمي =======================




// =========================================================================
// Toggle More Slots
const showMoreSlotsBtn = document.querySelector('.show-more-slots-btn');
const calendarBody = document.querySelector('.calendar-body');

if (showMoreSlotsBtn) {
    showMoreSlotsBtn.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('active');
        calendarBody.classList.toggle('show');
        if (calendarBody.classList.contains('show')) {
            showMoreSlotsBtn.innerHTML = 'عرض أقل <i class="fa-solid fa-chevron-up"></i>';
        } else {
            showMoreSlotsBtn.innerHTML = 'عرض المزيد من المواعيد <i class="fa-solid fa-chevron-down"></i>';
        }
    });
}


// Reusable link-copy button logic
const copyLinkBtns = document.querySelectorAll('.copy-link-btn');
if (copyLinkBtns.length > 0) {
    copyLinkBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            // Try to get text from data-link attribute
            const link = this.getAttribute('data-link');
            if (link) {
                navigator.clipboard.writeText(link).then(() => {
                    const icon = this.querySelector('i');
                    const originalClass = icon.classList.contains('fa-copy') ? 'fa-copy' :
                        icon.classList.contains('fa-clone') ? 'fa-clone' :
                            'fa-link';

                    icon.classList.remove(originalClass);
                    icon.classList.add('fa-check');
                    setTimeout(() => {
                        icon.classList.remove('fa-check');
                        icon.classList.add(originalClass);
                    }, 2000);
                });
            }
        });
    });
}


// ==========================================
// Booking Duration & Pricing Toggle
// ==========================================
const durationBtns = document.querySelectorAll('.duration-btn');

if (durationBtns.length > 0) {
    durationBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Toggle active state on buttons
            durationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const duration = this.getAttribute('data-duration');

            // Toggle visibility of pricing sections
            document.querySelectorAll('.duration-pricing').forEach(section => {
                section.style.display = 'none';
            });
            const targetSection = document.getElementById(`pricing-${duration}`);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
}


// Sidebar Toggle for User Account Page
jQuery(".sidebar-toggle").on("click", function () {
    const $this = jQuery(this);
    $this.toggleClass("active");
    jQuery(".user-sidebar").toggleClass("open");
});


// Categories Filter toggle active class
jQuery('.filter-item').on('click', function () {
    jQuery('.filter-item').removeClass('active');
    jQuery(this).addClass('active');
});

// Toggle password visibility
(function () {
    const passwordToggles = document.querySelectorAll('.login-toggle-password');
    passwordToggles.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
})();
