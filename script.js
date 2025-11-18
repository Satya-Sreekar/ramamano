// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav ul');

mobileMenu.addEventListener('click', function() {
    nav.classList.toggle('show');
    const icon = this.querySelector('i');
    if (nav.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('show');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Platform Tabs
const platformTabs = document.querySelectorAll('.platform-tab');
const platformContents = document.querySelectorAll('.platform-content');

platformTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        platformTabs.forEach(t => t.classList.remove('active'));
        platformContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Form Submission
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create a nice notification
    const form = this;
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            form.reset();
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            nav.classList.remove('show');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Add fade-in to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Add fade-in to platform services
const platformServices = document.querySelectorAll('.platform-service');
platformServices.forEach((service, index) => {
    service.classList.add('fade-in');
    service.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(service);
});

// Service Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const filterableServiceCards = document.querySelectorAll('.service-card[data-category]');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        filterableServiceCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Expandable Service Cards
const serviceToggles = document.querySelectorAll('.service-toggle');

serviceToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const card = toggle.closest('.service-card');
        const details = card.querySelector('.service-details');
        const summary = card.querySelector('.service-summary');
        
        if (card.classList.contains('expanded')) {
            // Collapse
            details.style.display = 'none';
            summary.style.display = 'block';
            card.classList.remove('expanded');
            toggle.innerHTML = 'Learn More <i class="fas fa-chevron-down"></i>';
        } else {
            // Expand
            details.style.display = 'block';
            card.classList.add('expanded');
            toggle.innerHTML = 'Show Less <i class="fas fa-chevron-down"></i>';
        }
    });
});

// Security Assessment Widget
const assessmentQuestions = [
    {
        question: "Does your organization have a dedicated security operations center (SOC) or 24/7 security monitoring?",
        options: [
            { text: "Yes, we have a fully staffed 24/7 SOC", score: 20 },
            { text: "Yes, but only during business hours", score: 15 },
            { text: "We have some monitoring tools but no dedicated team", score: 10 },
            { text: "No, we don't have dedicated security monitoring", score: 5 }
        ]
    },
    {
        question: "How often do you conduct security risk assessments and audits?",
        options: [
            { text: "Quarterly or more frequently", score: 20 },
            { text: "Annually", score: 15 },
            { text: "Every 2-3 years", score: 10 },
            { text: "Rarely or never", score: 5 }
        ]
    },
    {
        question: "What is your approach to identity and access management (IAM)?",
        options: [
            { text: "We have comprehensive IAM with MFA and regular access reviews", score: 20 },
            { text: "We have basic IAM with some MFA implementation", score: 15 },
            { text: "We have basic access controls but limited IAM processes", score: 10 },
            { text: "We have minimal or no formal IAM program", score: 5 }
        ]
    },
    {
        question: "How do you handle security incidents and breaches?",
        options: [
            { text: "We have a documented incident response plan with regular testing", score: 20 },
            { text: "We have an incident response plan but limited testing", score: 15 },
            { text: "We have some procedures but no formal plan", score: 10 },
            { text: "We don't have a formal incident response process", score: 5 }
        ]
    },
    {
        question: "What is your compliance posture?",
        options: [
            { text: "We are certified/compliant with multiple standards (ISO 27001, SOC 2, etc.)", score: 20 },
            { text: "We are compliant with one major standard", score: 15 },
            { text: "We are working towards compliance", score: 10 },
            { text: "We have no formal compliance program", score: 5 }
        ]
    }
];

let currentQuestionIndex = 0;
let assessmentAnswers = [];
let assessmentScore = 0;

// Load saved progress from localStorage
function loadAssessmentProgress() {
    const saved = localStorage.getItem('assessmentProgress');
    if (saved) {
        const data = JSON.parse(saved);
        currentQuestionIndex = data.currentQuestionIndex || 0;
        assessmentAnswers = data.answers || [];
        assessmentScore = data.score || 0;
    }
}

// Save progress to localStorage
function saveAssessmentProgress() {
    localStorage.setItem('assessmentProgress', JSON.stringify({
        currentQuestionIndex,
        answers: assessmentAnswers,
        score: assessmentScore
    }));
}

// Initialize assessment
function initAssessment() {
    loadAssessmentProgress();
    if (currentQuestionIndex < assessmentQuestions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

// Display question
function displayQuestion(index) {
    const questionContainer = document.getElementById('questionContainer');
    const question = assessmentQuestions[index];
    
    questionContainer.innerHTML = `
        <div class="question">
            <h4>${question.question}</h4>
            <div class="answer-options">
                ${question.options.map((option, optIndex) => `
                    <button class="answer-option" data-score="${option.score}" data-index="${optIndex}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="assessment-actions">
            ${index > 0 ? '<button class="btn" id="prevQuestion">Previous</button>' : ''}
            <button class="btn" id="nextQuestion" disabled>${index === assessmentQuestions.length - 1 ? 'View Results' : 'Next'}</button>
        </div>
    `;
    
    updateProgress();
    
    // Add event listeners
    document.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            document.getElementById('nextQuestion').disabled = false;
            
            // Save answer
            assessmentAnswers[index] = {
                score: parseInt(option.getAttribute('data-score')),
                answer: option.textContent.trim()
            };
            saveAssessmentProgress();
        });
    });
    
    // Restore previous answer if exists
    if (assessmentAnswers[index]) {
        const prevAnswer = assessmentAnswers[index].answer;
        document.querySelectorAll('.answer-option').forEach(opt => {
            if (opt.textContent.trim() === prevAnswer) {
                opt.classList.add('selected');
                document.getElementById('nextQuestion').disabled = false;
            }
        });
    }
    
    // Next button
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < assessmentQuestions.length - 1) {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
            } else {
                calculateScore();
                showResults();
            }
        });
    }
    
    // Previous button
    const prevBtn = document.getElementById('prevQuestion');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion(currentQuestionIndex);
            }
        });
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
    document.getElementById('assessmentProgress').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
}

// Calculate score
function calculateScore() {
    assessmentScore = assessmentAnswers.reduce((total, answer) => total + (answer?.score || 0), 0);
    saveAssessmentProgress();
}

// Show results
function showResults() {
    const questionContainer = document.getElementById('questionContainer');
    const resultsContainer = document.getElementById('assessmentResults');
    
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    document.getElementById('securityScore').textContent = assessmentScore;
    document.getElementById('assessmentProgress').style.width = '100%';
    
    // Generate analysis
    let analysis = '';
    let recommendations = [];
    
    if (assessmentScore >= 80) {
        analysis = '<h4>Excellent Security Posture</h4><p>Your organization demonstrates strong security practices and comprehensive security controls. You have a mature security program in place.</p>';
        recommendations = [
            'Continue regular security assessments and audits',
            'Stay updated with latest security threats and trends',
            'Consider advanced threat hunting capabilities'
        ];
    } else if (assessmentScore >= 60) {
        analysis = '<h4>Good Security Foundation</h4><p>Your organization has a solid security foundation, but there are opportunities to strengthen your security posture and enhance your security program.</p>';
        recommendations = [
            'Implement 24/7 security monitoring',
            'Establish formal incident response procedures',
            'Conduct regular security awareness training',
            'Consider compliance certifications'
        ];
    } else if (assessmentScore >= 40) {
        analysis = '<h4>Basic Security Measures</h4><p>Your organization has some security measures in place, but significant improvements are needed to adequately protect against modern cyber threats.</p>';
        recommendations = [
            'Develop a comprehensive security strategy',
            'Implement identity and access management',
            'Establish security monitoring capabilities',
            'Create incident response plans',
            'Conduct regular security assessments'
        ];
    } else {
        analysis = '<h4>Security Improvements Needed</h4><p>Your organization needs to establish fundamental security controls and processes to protect against cyber threats. Immediate action is recommended.</p>';
        recommendations = [
            'Conduct a comprehensive security assessment',
            'Develop and implement security policies',
            'Establish basic security monitoring',
            'Implement access controls and authentication',
            'Create an incident response plan',
            'Consider engaging security experts'
        ];
    }
    
    analysis += '<ul>';
    recommendations.forEach(rec => {
        analysis += `<li>${rec}</li>`;
    });
    analysis += '</ul>';
    
    document.getElementById('scoreAnalysis').innerHTML = analysis;
    
    // Clear saved progress
    localStorage.removeItem('assessmentProgress');
}

// Download PDF Report
document.addEventListener('click', (e) => {
    if (e.target.id === 'downloadReport' || e.target.closest('#downloadReport')) {
        if (typeof window.jspdf !== 'undefined') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.setFontSize(20);
            doc.text('Security Assessment Report', 20, 20);
            
            doc.setFontSize(12);
            doc.text(`Assessment Date: ${new Date().toLocaleDateString()}`, 20, 35);
            doc.text(`Security Score: ${assessmentScore}/100`, 20, 45);
            
            let yPos = 60;
            doc.setFontSize(14);
            doc.text('Assessment Results:', 20, yPos);
            yPos += 10;
            
            doc.setFontSize(10);
            assessmentQuestions.forEach((q, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont(undefined, 'bold');
                doc.text(`Question ${index + 1}:`, 20, yPos);
                yPos += 5;
                doc.setFont(undefined, 'normal');
                const questionLines = doc.splitTextToSize(q.question, 170);
                doc.text(questionLines, 20, yPos);
                yPos += questionLines.length * 5 + 3;
                
                if (assessmentAnswers[index]) {
                    doc.setFont(undefined, 'italic');
                    doc.text(`Answer: ${assessmentAnswers[index].answer}`, 25, yPos);
                    yPos += 5;
                }
                yPos += 5;
            });
            
            doc.save('security-assessment-report.pdf');
        } else {
            alert('PDF generation library not loaded. Please refresh the page and try again.');
        }
    }
    
    if (e.target.id === 'contactExpert' || e.target.closest('#contactExpert')) {
        const message = `Hi RamaMano IT Services, I completed the security assessment and scored ${assessmentScore}/100. I would like to discuss my security needs.`;
        window.open(`https://wa.me/919762076999?text=${encodeURIComponent(message)}`, '_blank');
    }
});

// Reset assessment
function resetAssessment() {
    currentQuestionIndex = 0;
    assessmentAnswers = [];
    assessmentScore = 0;
    localStorage.removeItem('assessmentProgress');
    const resultsContainer = document.getElementById('assessmentResults');
    const questionContainer = document.getElementById('questionContainer');
    resultsContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    initAssessment();
}

// Initialize assessment on page load
if (document.getElementById('questionContainer')) {
    initAssessment();
}

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// Create Animated Particles
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Animated Statistics Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe statistics section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (!stat.classList.contains('counted')) {
                    stat.classList.add('counted');
                    animateCounter(stat, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
if (testimonialSlides.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Enhanced Parallax Effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax background elements
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(element => {
        const rect = element.getBoundingClientRect();
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Parallax sections
    const parallaxSections = document.querySelectorAll('.parallax-section');
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const speed = 0.2;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (rect.top - window.innerHeight) * speed;
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // Parallax slow elements
    const slowElements = document.querySelectorAll('.parallax-slow');
    slowElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const speed = 0.15;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (rect.top - window.innerHeight) * speed;
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // Parallax fast elements
    const fastElements = document.querySelectorAll('.parallax-fast');
    fastElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const speed = 0.4;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (rect.top - window.innerHeight) * speed;
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Magnetic Hover Effect
function initMagneticHover() {
    const magneticElements = document.querySelectorAll('.magnetic-hover');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Enhanced Card 3D Effect (only for cards without magnetic-hover)
function init3DCards() {
    const cards = document.querySelectorAll('.service-card:not(.magnetic-hover), .expertise-card:not(.magnetic-hover), .stat-card:not(.magnetic-hover)');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    initMagneticHover();
    init3DCards();
    updateParallax();
});

// Initialize particles on page load
createParticles();

