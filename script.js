// Portfolio folders configuration
const portfolioFolders = {
    'embedded': {
        path: 'Images&videos/Embedded Software Development/',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4'],
        title: 'Embedded Software Development',
        description: 'Advanced firmware solutions for industrial applications and IoT devices, delivering robust and scalable embedded systems'
    },
    'pcb': {
        path: 'Images&videos/PCB designing/',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4'],
        title: 'Professional PCB Design',
        description: 'High-complexity PCB solutions from concept to production, serving global industry leaders and cutting-edge applications'
    },
    'gui': {
        path: 'Images&videos/Graphical User Interface Software/',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4'],
        title: 'Industrial GUI & HMI Solutions',
        description: 'Professional graphical user interface development for industrial applications'
    },
    'testbox': {
        path: 'Images&videos/Test box for systems simulation/',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4'],
        title: 'Hardware-in-the-Loop Testing',
        description: 'Complete test automation systems for complex HVAC applications, enabling comprehensive validation and quality assurance'
    }
};

// Function to update status indicator
function updateStatusIndicator(status, color) {
    const indicator = document.getElementById('status-indicator');
    if (indicator) {
        indicator.textContent = status;
        indicator.style.background = color;
    }
}

// Function to scan and load portfolio images dynamically
async function loadPortfolioImages() {
    updateStatusIndicator('Loading...', '#ffc107');
    
    try {
        // Try to load from manifest file first
        let manifest = null;
        let loadMethod = 'unknown';
        try {
            // Method 1: Direct fetch with cache busting
            const response = await fetch('portfolio-manifest.json?t=' + Date.now()); 
            if (response.ok) {
                manifest = await response.json();
                loadMethod = 'fetch';
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (fetchError) {
            // Method 2: XMLHttpRequest fallback
            try {
                manifest = await loadManifestWithXHR();
                loadMethod = 'xhr';
            } catch (xhrError) {
                throw new Error(`All loading methods failed. Fetch: ${fetchError.message}, XHR: ${xhrError.message}`);
            }
        }
        if (manifest) {
            updateStatusIndicator(`Manifest Loaded (${loadMethod})`, '#28a745');
            let updatedCategories = 0;
            for (const [category, config] of Object.entries(manifest)) {
                if (config.images && config.images.length > 0) {
                    updatePortfolioCarousel(category, config.images, config);
                    updatePortfolioModal(category, config.images, config);
                    updatedCategories++;
                }
            }
            updateStatusIndicator(`Updated ${updatedCategories} Categories`, '#28a745');
            return;
        }
    } catch (error) {
        updateStatusIndicator('Error: ' + error.message, '#dc3545');
    }
    // Fallback to hardcoded method
    updateStatusIndicator('Using Fallback', '#6c757d');
    loadHardcodedPortfolio();
}

// XMLHttpRequest fallback for CORS issues
function loadManifestWithXHR() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'portfolio-manifest.json?t=' + Date.now(), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const manifest = JSON.parse(xhr.responseText);
                        resolve(manifest);
                    } catch (parseError) {
                        reject(new Error('JSON parse error: ' + parseError.message));
                    }
                } else {
                    reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                }
            }
        };
        xhr.onerror = function() {
            reject(new Error('Network error'));
        };
        xhr.send();
    });
}

// Hardcoded fallback data
function loadHardcodedPortfolio() {
    
    const hardcodedData = {
        embedded: {
            title: "Embedded Software Development",
            description: "Advanced firmware solutions for industrial applications and IoT devices, delivering robust and scalable embedded systems",
            images: [
                {
                    src: "Images&videos/Embedded Software Development/STM32 microcontrollers for embedded systems, specifically in Munters dehumidifiers across a diverse range of sizes.png",
                    alt: "STM32 Dehumidifiers",
                    description: "STM32 microcontrollers for Munters dehumidifiers across diverse range of sizes"
                },
                {
                    src: "Images&videos/Embedded Software Development/STM32 and AVR microcontrollers for one of the world's most renowned coffee machines company.png",
                    alt: "STM32 Coffee Machine",
                    description: "STM32 and AVR microcontrollers for world's most renowned coffee machines company"
                },
                {
                    src: "Images&videos/Embedded Software Development/nRF52 microcontrollers with LumenRadio Mira Modules for wireless temperature and humidity sensors and remote controls.jpg",
                    alt: "nRF52 Wireless Sensors",
                    description: "nRF52 microcontrollers with LumenRadio Mira Modules for wireless sensors and remote controls"
                },
                {
                    src: "Images&videos/Embedded Software Development/dsPIC33 of Motor Control drivers.png",
                    alt: "dsPIC33 Motor Control",
                    description: "dsPIC33 Motor Control drivers for high-performance applications"
                },
                {
                    src: "Images&videos/Embedded Software Development/Extensive experience with various microcontroller families applied across a range of commercial products.png",
                    alt: "Microcontroller Experience",
                    description: "Extensive experience with various microcontroller families across commercial products"
                }
            ]
        },
        pcb: {
            title: "Professional PCB Design",
            description: "High-complexity PCB solutions from concept to production, serving global industry leaders and cutting-edge applications",
            images: [
                {
                    src: "Images&videos/PCB designing/Control board for 4 groups coffee machine. This PCB includes 4 layers, SMD on both sides, PTH on one side. Total of 470 components.png",
                    alt: "Coffee Machine Control Board",
                    description: "Control board for 4 groups coffee machine - 4 layers, SMD on both sides, PTH on one side, 470 components total"
                },
                {
                    src: "Images&videos/PCB designing/Board design for a complex coffee machine PCB.mp4",
                    alt: "PCB Design Process",
                    description: "Board design process for complex coffee machine PCB"
                },
                {
                    src: "Images&videos/PCB designing/High power motor control board. This Board supports Field-Oriented-Control (FOC) algorithm with Power-Factor-Corrector (PFC).jpg",
                    alt: "Motor Control Board",
                    description: "High power motor control board supporting Field-Oriented-Control (FOC) and Power-Factor-Corrector (PFC)"
                },
                {
                    src: "Images&videos/PCB designing/NFC board for high technology coffee machines with AI system for system recognition.png",
                    alt: "NFC Board",
                    description: "NFC board for high technology coffee machines with AI system recognition"
                },
                {
                    src: "Images&videos/PCB designing/Dashboard PCB design to control a stepper motor and RGB LEDs for coffee machines.png",
                    alt: "Dashboard PCB",
                    description: "Dashboard PCB design to control stepper motor and RGB LEDs for coffee machines"
                },
                {
                    src: "Images&videos/PCB designing/PCB for low cost coffee machines attached directly to the machine heater to save space.png",
                    alt: "Low Cost PCB",
                    description: "PCB for low cost coffee machines attached directly to machine heater to save space"
                }
            ]
        },
        gui: {
            title: "Industrial GUI & HMI Solutions",
            description: "Professional graphical user interface development for industrial applications",
            images: [
                {
                    src: "Images&videos/Graphical User Interface Software/Developed a GUI application by LabVIEW, for coffee machine services and production factories worldwide..png",
                    alt: "LabVIEW GUI",
                    description: "LabVIEW GUI application for coffee machine services and production factories worldwide"
                },
                {
                    src: "Images&videos/Graphical User Interface Software/PyQT5 application for test box machine simulator.png",
                    alt: "PyQT5 Application",
                    description: "PyQT5 application for test box machine simulator with intuitive interface"
                }
            ]
        },
        testbox: {
            title: "Hardware-in-the-Loop Testing",
            description: "Complete test automation systems for complex HVAC applications, enabling comprehensive validation and quality assurance",
            images: [                {
                    src: "Images&videos/Test box for systems simulation/3D model for the case.png",
                    alt: "3D Model For The Case",
                    description: "3D model design for the test box case with precision engineering"
                },
                {
                    src: "Images&videos/Test box for systems simulation/Complete test box for complex humidification and dehumidification systems.jpg",
                    alt: "Complete Test Box",
                    description: "Complete test box for complex humidification and dehumidification systems"
                }
            ]
        }
    };
    
    // Load hardcoded data
    let updatedCategories = 0;
    for (const [category, config] of Object.entries(hardcodedData)) {
        updatePortfolioCarousel(category, config.images, config);
        updatePortfolioModal(category, config.images, config);
        updatedCategories++;
    }
}

// Function to verify which images actually exist
async function filterValidImages(images) {
    const validImages = [];
    
    for (const image of images) {
        if (await checkImageExists(image.src)) {
            validImages.push(image);
        } else {
            console.log(`Image not found: ${image.src}`);
        }
    }
    
    return validImages;
}

// Function to scan a folder for images
async function scanFolderForImages(folderPath, extensions) {
    const images = [];
    
    // Common image filenames to try (you can extend this list)
    const commonFiles = [
        'STM32 microcontrollers for embedded systems, specifically in Munters dehumidifiers across a diverse range of sizes.png',
        'STM32 and AVR microcontrollers for one of the world\'s most renowned coffee machines company.png',
        'nRF52 microcontrollers with LumenRadio Mira Modules for wireless temperature and humidity sensors and remote controls.jpg',
        'dsPIC33 of Motor Control drivers.png',
        'Extensive experience with various microcontroller families applied across a range of commercial products.png',
        'Control board for 4 groups coffee machine. This PCB includes 4 layers, SMD on both sides, PTH on one side. Total of 470 components.png',
        'Board design for a complex coffee machine PCB.mp4',
        'High power motor control board. This Board supports Field-Oriented-Control (FOC) algorithm with Power-Factor-Corrector (PFC).jpg',
        'NFC board for high technology coffee machines with AI system for system recognition.png',
        'Dashboard PCB design to control a stepper motor and RGB LEDs for coffee machines.png',
        'PCB for low cost coffee machines attached directly to the machine heater to save space.png',
        'Developed a GUI application by LabVIEW, for coffee machine services and production factories worldwide..png',
        'PyQT5 application for test box machine simulator.png',
        'Complete test box for complex humidification and dehumidification systems.jpg',
        '3D model for the case.png'
    ];
    
    // Try to load each file
    for (const filename of commonFiles) {
        const fullPath = folderPath + filename;
        if (await checkImageExists(fullPath)) {
            images.push({
                src: fullPath,
                alt: generateAltText(filename),
                description: generateDescription(filename)
            });
        }
    }
    
    return images;
}

// Function to check if an image exists
async function checkImageExists(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;
    });
}

// Generate alt text from filename
function generateAltText(filename) {
    return filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '')
                  .replace(/[._-]/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());
}

// Generate description from filename
function generateDescription(filename) {
    const name = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '');
    
    // Custom descriptions for specific files
    const descriptions = {
        'STM32 microcontrollers for embedded systems, specifically in Munters dehumidifiers across a diverse range of sizes': 'STM32 microcontrollers for Munters dehumidifiers across diverse range of sizes',
        'STM32 and AVR microcontrollers for one of the world\'s most renowned coffee machines company': 'STM32 and AVR microcontrollers for world\'s most renowned coffee machines company',
        'nRF52 microcontrollers with LumenRadio Mira Modules for wireless temperature and humidity sensors and remote controls': 'nRF52 microcontrollers with LumenRadio Mira Modules for wireless sensors and remote controls',
        'dsPIC33 of Motor Control drivers': 'dsPIC33 Motor Control drivers for high-performance applications',
        'Extensive experience with various microcontroller families applied across a range of commercial products': 'Extensive experience with various microcontroller families across commercial products',
        'Control board for 4 groups coffee machine. This PCB includes 4 layers, SMD on both sides, PTH on one side. Total of 470 components': 'Control board for 4 groups coffee machine - 4 layers, SMD on both sides, PTH on one side, 470 components total',
        'Board design for a complex coffee machine PCB': 'Board design process for complex coffee machine PCB',
        'High power motor control board. This Board supports Field-Oriented-Control (FOC) algorithm with Power-Factor-Corrector (PFC)': 'High power motor control board supporting Field-Oriented-Control (FOC) and Power-Factor-Corrector (PFC)',
        'NFC board for high technology coffee machines with AI system for system recognition': 'NFC board for high technology coffee machines with AI system recognition',
        'Dashboard PCB design to control a stepper motor and RGB LEDs for coffee machines': 'Dashboard PCB design to control stepper motor and RGB LEDs for coffee machines',
        'PCB for low cost coffee machines attached directly to the machine heater to save space': 'PCB for low cost coffee machines attached directly to machine heater to save space',
        'Developed a GUI application by LabVIEW, for coffee machine services and production factories worldwide.': 'LabVIEW GUI application for coffee machine services and production factories worldwide',
        'PyQT5 application for test box machine simulator': 'PyQT5 application for test box machine simulator with intuitive interface',
        'Complete test box for complex humidification and dehumidification systems': 'Complete test box for complex humidification and dehumidification systems',
        '3D model for the case': '3D model design for the test box case with precision engineering'
    };
      return descriptions[name] || name.replace(/[._-]/g, ' ');
}

// Function to update portfolio carousel with loaded images
function updatePortfolioCarousel(category, images, config) {
    const portfolioItem = document.querySelector(`[data-category="${category}"]`);
    if (!portfolioItem) {
        return;
    }
    
    const carouselContainer = portfolioItem.querySelector('.carousel-container');
    const dotsContainer = portfolioItem.querySelector('.carousel-dots');
    const portfolioInfo = portfolioItem.querySelector('.portfolio-info');
    
    if (!carouselContainer) {
        return;
    }
    
    if (!dotsContainer) {
        return;
    }
    
    if (images.length > 0) {
        // Force clear existing content including loading placeholders
        while (carouselContainer.firstChild) {
            carouselContainer.removeChild(carouselContainer.firstChild);
        }
        while (dotsContainer.firstChild) {
            dotsContainer.removeChild(dotsContainer.firstChild);
        }
        
        // Add images to carousel
        images.forEach((image, index) => {
            const isVideo = image.src.endsWith('.mp4') || image.src.endsWith('.mov') || image.src.endsWith('.avi');
            
            let mediaElement;
            if (isVideo) {
                mediaElement = document.createElement('video');
                mediaElement.src = image.src;
                mediaElement.alt = image.alt;
                mediaElement.controls = true;
                mediaElement.muted = true;
                mediaElement.loop = true;
            } else {
                mediaElement = document.createElement('img');
                mediaElement.src = image.src;
                mediaElement.alt = image.alt;
                mediaElement.onload = () => {
                };
                mediaElement.onerror = () => {
                    mediaElement.style.border = '2px solid red';
                    mediaElement.style.backgroundColor = '#ffebee';
                };
            }
            
            mediaElement.className = `carousel-image ${index === 0 ? 'active' : ''}`;
            carouselContainer.appendChild(mediaElement);
            
            // Add dot
            const dotElement = document.createElement('span');
            dotElement.className = `dot ${index === 0 ? 'active' : ''}`;
            dotElement.onclick = () => currentSlide(dotElement, index + 1);
            dotsContainer.appendChild(dotElement);
        });
        
        // Update portfolio info
        if (portfolioInfo) {
            portfolioInfo.innerHTML = `
                <h3>${config.title}</h3>
                <p>${config.description}</p>
                <button class="btn btn-primary" onclick="event.preventDefault(); openModal('${category}-modal'); return false;">See More</button>
            `;
        }
        
        // Force a re-render by triggering a layout
        carouselContainer.style.display = 'none';
        carouselContainer.offsetHeight; // Force reflow
        carouselContainer.style.display = '';
        
    } else {
        // Show error placeholder
        carouselContainer.innerHTML = `
            <div class="error-placeholder" style="display: flex; align-items: center; justify-content: center; height: 300px; background: #ffebee; border: 2px dashed #f44336; color: #c62828;">
                <div style="text-align: center;">
                    <p>❌ No images found for ${category}</p>
                    <small>Check portfolio-manifest.json</small>
                </div>
            </div>
        `;
    }
}

// Function to update portfolio modal with loaded images
function updatePortfolioModal(category, images, config) {
    const modal = document.getElementById(`${category}-modal`);
    if (!modal) {
        return;
    }
    
    const gallery = modal.querySelector('.modal-images-gallery');
    if (!gallery) {
        return;
    }
    
    if (images.length > 0) {
        // Force clear existing content including loading placeholders
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
        
        // Add images to gallery
        images.forEach((image, index) => {
            const isVideo = image.src.endsWith('.mp4') || image.src.endsWith('.mov') || image.src.endsWith('.avi');
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'modal-image-item';
            itemDiv.setAttribute('data-index', index);
            
            let mediaElement;
            if (isVideo) {
                mediaElement = document.createElement('video');
                mediaElement.src = image.src;
                mediaElement.controls = true;
                mediaElement.muted = true;
                mediaElement.preload = 'metadata';
            } else {
                mediaElement = document.createElement('img');
                mediaElement.src = image.src;
                mediaElement.alt = image.alt;
                
                mediaElement.onload = () => {
                };
                
                mediaElement.onerror = (e) => {
                    mediaElement.style.border = '3px solid red';
                    mediaElement.style.backgroundColor = '#ffebee';
                    mediaElement.alt = `❌ Failed to load: ${image.src}`;
                    
                    // Add error text overlay
                    const errorText = document.createElement('div');
                    errorText.innerHTML = `<strong>Image Load Error:</strong><br>${image.src}`;
                    errorText.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,0,0,0.8); color: white; padding: 10px; border-radius: 4px; font-size: 12px; text-align: center;';
                    
                    // Make the parent container relative for absolute positioning
                    mediaElement.parentElement.style.position = 'relative';
                    mediaElement.parentElement.appendChild(errorText);
                };
                
                // Add CSS to ensure proper display
                mediaElement.style.cssText = `
                    width: 100%;
                    max-height: 400px;
                    object-fit: contain;
                    border-radius: 0.5rem;
                    background: white;
                    display: block;
                    min-height: 200px;
                    border: 1px solid #dee2e6;
                `;
            }
            
            const descriptionP = document.createElement('p');
            descriptionP.textContent = image.description;
            
            itemDiv.appendChild(mediaElement);
            itemDiv.appendChild(descriptionP);
            gallery.appendChild(itemDiv);
        });
        
    } else {
        // Show error placeholder
        gallery.innerHTML = `
            <div class="error-placeholder" style="display: flex; align-items: center; justify-content: center; height: 200px; background: #ffebee; border: 2px dashed #f44336; color: #c62828; margin: 20px 0;">
                <div style="text-align: center;">
                    <p>❌ No images found for ${category}</p>
                    <small>Check portfolio-manifest.json</small>
                </div>
            </div>
        `;
    }
}

// Function to use hardcoded images as fallback
function useHardcodedImages(category) {
    // The existing HTML structure will be used as fallback
}

// Enhanced carousel functionality with auto-advance
let carouselIntervals = new Map();

function startCarouselAutoAdvance() {
    const carousels = document.querySelectorAll('.portfolio-image-carousel');
    
    carousels.forEach((carousel, carouselIndex) => {
        // Clear any existing interval
        if (carouselIntervals.has(carouselIndex)) {
            clearInterval(carouselIntervals.get(carouselIndex));
        }
        
        // Start auto-advance
        const interval = setInterval(() => {
            const nextButton = carousel.querySelector('.carousel-btn.next');
            if (nextButton && !carousel.matches(':hover')) {
                // Check if there's an active video
                const activeSlide = carousel.querySelector('.carousel-image.active');
                if (activeSlide && activeSlide.tagName === 'VIDEO' && !activeSlide.paused) {
                    return; // Don't advance while video is playing
                }
                
                changeSlide(nextButton, 1);
            }
        }, 4000); // 4 seconds
        
        carouselIntervals.set(carouselIndex, interval);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselIntervals.get(carouselIndex));
        });
        
        // Resume on mouse leave
        carousel.addEventListener('mouseleave', () => {
            const newInterval = setInterval(() => {
                const nextButton = carousel.querySelector('.carousel-btn.next');
                if (nextButton) {
                    const activeSlide = carousel.querySelector('.carousel-image.active');
                    if (activeSlide && activeSlide.tagName === 'VIDEO' && !activeSlide.paused) {
                        return;
                    }
                    changeSlide(nextButton, 1);
                }
            }, 4000);
            carouselIntervals.set(carouselIndex, newInterval);
        });
    });
}

// Calculate years of experience (starting from 2013)
function calculateExperience() {
    const startYear = 2013;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    
    // Update hero section
    const experienceYears = document.getElementById('experience-years');
    if (experienceYears) {
        experienceYears.textContent = years;
    }
    
    // Update about section
    const aboutExperienceYears = document.getElementById('about-experience-years');
    if (aboutExperienceYears) {
        aboutExperienceYears.textContent = years;
    }
    
    // Update stats in hero
    const experienceStat = document.getElementById('experience-stat');
    if (experienceStat) {
        experienceStat.textContent = years + '+';
    }
    
    // Update portfolio section stats
    const portfolioExperienceYears = document.getElementById('portfolio-experience-years');
    if (portfolioExperienceYears) {
        portfolioExperienceYears.textContent = years + '+';
    }
    
    // Update contact section professional highlights
    const contactExperienceYears = document.getElementById('contact-experience-years');
    if (contactExperienceYears) {
        contactExperienceYears.textContent = years + '+ Years Embedded Systems';
    }
}

// Carousel functionality
function changeSlide(button, direction) {
    const carousel = button.closest('.portfolio-image-carousel');
    const slides = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.dot');
    
    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
            // Pause video if it's a video element
            if (slide.tagName === 'VIDEO') {
                slide.pause();
                slide.currentTime = 0;
            }
        }
    });
    
    // Remove active class from ALL slides and dots first
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate new index
    currentIndex += direction;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    
    // Add active class to new slide and dot with forced styling
    const newActiveSlide = slides[currentIndex];
    const newActiveDot = dots[currentIndex];
    
    if (newActiveSlide) {
        newActiveSlide.classList.add('active');
        newActiveSlide.style.opacity = '1';
        newActiveSlide.style.zIndex = '2';
        
        // Play video if it's a video element
        if (newActiveSlide.tagName === 'VIDEO') {
            newActiveSlide.currentTime = 0;
            newActiveSlide.play();
        }
    }
    
    if (newActiveDot) {
        newActiveDot.classList.add('active');
    }
}

function currentSlide(dot, slideIndex) {
    const carousel = dot.closest('.portfolio-image-carousel');
    const slides = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.dot');
    
    // Pause all videos and reset all slides
    slides.forEach(slide => {
        if (slide.tagName === 'VIDEO') {
            slide.pause();
            slide.currentTime = 0;
        }
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
    });
    
    // Remove active class from all dots
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active class to selected (slideIndex is 1-based)
    const targetIndex = slideIndex - 1;
    const targetSlide = slides[targetIndex];
    const targetDot = dots[targetIndex];
    
    if (targetSlide) {
        targetSlide.classList.add('active');
        targetSlide.style.opacity = '1';
        targetSlide.style.zIndex = '2';
        
        // Play video if selected slide is a video
        if (targetSlide.tagName === 'VIDEO') {
            targetSlide.currentTime = 0;
            targetSlide.play();
        }
    }
    
    if (targetDot) {
        targetDot.classList.add('active');
    }
}

// Auto-advance carousel
function initAutoCarousel() {
    const carousels = document.querySelectorAll('.portfolio-image-carousel');
    
    carousels.forEach(carousel => {
        const interval = setInterval(() => {
            // Don't auto-advance if user is hovering over the carousel
            if (!carousel.matches(':hover')) {
                // Don't auto-advance if a video is currently playing
                const activeSlide = carousel.querySelector('.carousel-image.active');
                if (activeSlide && activeSlide.tagName === 'VIDEO' && !activeSlide.paused) {
                    return;
                }
                
                const nextBtn = carousel.querySelector('.carousel-btn.next');
                if (nextBtn) {
                    changeSlide(nextBtn, 1);
                }
            }
        }, 4000); // Change slide every 4 seconds
        
        // Store interval ID for potential cleanup
        carousel.dataset.intervalId = interval;
    });
}

// Initialize carousel touch/swipe support for mobile
function initCarouselTouchSupport() {
    const carousels = document.querySelectorAll('.portfolio-image-carousel');
    
    carousels.forEach(carousel => {
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                const nextBtn = carousel.querySelector('.carousel-btn.next');
                const prevBtn = carousel.querySelector('.carousel-btn.prev');
                
                if (diff > 0) {
                    // Swipe left - next slide
                    changeSlide(nextBtn, 1);
                } else {
                    // Swipe right - previous slide
                    changeSlide(prevBtn, -1);
                }
            }
        });
        
        carousel.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while swiping
        }, { passive: false });
    });
}

// Keyboard navigation for carousels
function initCarouselKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        const carousel = activeElement.closest('.portfolio-image-carousel');
        
        if (carousel) {
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    changeSlide(prevBtn, -1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    changeSlide(nextBtn, 1);
                    break;
            }
        }
    });
}

// ========================================
// MAIN INITIALIZATION - SINGLE ENTRY POINT
// ========================================

// Main initialization when page loads - CONSOLIDATED VERSION
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Calculate experience
        calculateExperience();
        
        // 2. Load portfolio images dynamically
        await loadPortfolioImages();
        
        // 3. Initialize carousel functionality
        initAutoCarousel();
        initCarouselTouchSupport();
        initCarouselKeyboardSupport();
        
        // 4. Initialize animations
        initializeAnimations();
        
        // 5. Initialize lazy loading
        initializeLazyLoading();
        
        // 6. Initialize typing animation
        initializeTypingAnimation();
        
        // 7. Initialize contact form
        initializeContactForm();
        
        // 8. Initialize skill bars animation
        animateSkillBars();
        
        // 9. Start auto-advance for carousels (after everything is loaded)
        setTimeout(() => {
            startCarouselAutoAdvance();
            
            // Add click listeners to carousel elements to make them focusable
            const carousels = document.querySelectorAll('.portfolio-image-carousel');
            carousels.forEach((carousel, index) => {
                carousel.setAttribute('tabindex', '0');
                carousel.style.outline = 'none';
                
                // Ensure the first slide is visible
                const firstSlide = carousel.querySelector('.carousel-image.active');
                if (firstSlide) {
                    firstSlide.style.opacity = '1';
                    firstSlide.style.zIndex = '2';
                }
            });
        }, 1000); // Wait a second for images to load
        
    } catch (error) {
        // Fallback - try to load portfolio again
        setTimeout(async () => {
            try {
                await loadPortfolioImages();
            } catch (fallbackError) {
            }
        }, 1000);
    }
});

// Skill bars animation
function animateSkillBars() {
    const skillsSection = document.querySelector('.skills-visual');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.setProperty('--skill-width', width);
                    bar.style.width = width;
                });
                skillsSection.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// CV Download functionality
function downloadCV() {
    // Create a temporary alert for now - you can replace this with actual CV file
    alert('CV download functionality would be implemented here. Please contact via email for CV request.');
    
    // Example of how to implement actual file download:
    // const link = document.createElement('a');
    // link.href = 'path/to/your/cv.pdf';
    // link.download = 'Kirols_Mansour_CV.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Modal functionality
function openModal(modalId) {
    // Prevent any default behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }
    
    // Check if modal has loading placeholders and fix if needed
    const gallery = modal.querySelector('.modal-images-gallery');
    if (gallery) {
        const hasLoadingPlaceholder = gallery.querySelector('.loading-placeholder');
        if (hasLoadingPlaceholder) {
            // Extract category from modalId (e.g., 'gui-modal' -> 'gui')
            const category = modalId.replace('-modal', '');
            
            // Force reload this modal's content
            forceReloadModalContent(category);
        } else {
            const images = gallery.querySelectorAll('img');
        }
    }
      modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Force reload modal content when loading placeholders are detected
async function forceReloadModalContent(category) {
    try {
        // Load fresh manifest data
        const response = await fetch('portfolio-manifest.json?t=' + Date.now());
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const manifest = await response.json();
        
        const categoryData = manifest[category];
        if (!categoryData || !categoryData.images) {
            return;
        }
        
        // Update the modal with fresh data
        updatePortfolioModal(category, categoryData.images, categoryData);
        
    } catch (error) {
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        console.error(`Modal not found for closing: ${modalId}`);    }
}

// Add additional event listener to catch any navigation that might cause jumping
document.addEventListener('click', function(e) {
    // If it's a modal trigger button
    if (e.target.textContent && e.target.textContent.includes('See More')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

// Disable smooth scrolling temporarily when modals are opened
let originalScrollBehavior = '';

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            openModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ========================================
// INITIALIZATION HELPER FUNCTIONS
// ========================================

// Animation initialization
function initializeAnimations() {
    const animateElements = document.querySelectorAll('.expertise-card, .portfolio-item, .achievement');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
        heroSection.addEventListener('animationstart', () => {
            setTimeout(animateStats, 1000);
        });
    }
}

// Lazy loading initialization
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Typing animation initialization
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Only run typing animation on desktop
        if (window.innerWidth > 768) {
            setTimeout(() => {
                typeWriter(heroTitle, 'PhD Embedded Systems Engineer & Hardware Designer', 80);
            }, 500);
        }
    }
}

// Contact form initialization
function initializeContactForm() {
    const contactForm = document.querySelector('.project-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create mailto link
            const subject = encodeURIComponent(`Project Inquiry - ${service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
            const body = encodeURIComponent(`
Dear Kirols,

I would like to discuss a potential project with you.

Name: ${name}
Email: ${email}
Company: ${company || 'Not specified'}
Service Type: ${service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}

Project Details:
${message}

Best regards,
${name}
            `);
            
            const mailtoLink = `mailto:kirolsmansour@outlook.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showSuccessMessage();
        });    }
}

// Add additional event listener to catch any navigation that might cause jumping
document.addEventListener('click', function(e) {
    // If it's a modal trigger button
    if (e.target.textContent && e.target.textContent.includes('See More')) {        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

// ========================================
// REMAINING UTILITY FUNCTIONS
// ========================================

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}



// Portfolio filter functionality (if needed in future)
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add hover effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        if (finalValue.includes('+')) {
            const number = parseInt(finalValue.replace('+', ''));
            animateCounter(stat, 0, number, 2000, '+');
        }
    });
}

function animateCounter(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Add CSS class for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    
    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
      img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);



function showSuccessMessage() {
    // Create and show success message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            text-align: center;
            z-index: 10000;
            max-width: 400px;
            width: 90%;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
            ">
                <i class="fas fa-check" style="color: white; font-size: 1.5rem;"></i>
            </div>
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Thank You!</h3>
            <p style="color: #6b7280; margin-bottom: 1.5rem;">Your email client should now open with a pre-filled message. If it doesn't open automatically, please email me directly at kirolsmansour@outlook.com</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #2563eb;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
            ">Close</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 5000);
}
