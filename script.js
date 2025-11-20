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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav ul');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (nav.classList.contains('show') && 
        !nav.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        nav.classList.remove('show');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
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

    // Update WhatsApp Link
    const message = `Hi RamaMano IT Services, I completed the security assessment and scored ${assessmentScore}/100. I would like to discuss my security needs.`;
    const whatsappLink = document.getElementById('contactExpert');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/919762076999?text=${encodeURIComponent(message)}`;
    }
}

// Download PDF Report
document.addEventListener('click', async (e) => {
    if (e.target.id === 'downloadReport' || e.target.closest('#downloadReport')) {
        if (typeof window.jspdf !== 'undefined') {
            const { jsPDF, GState } = window.jspdf;
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);
            
            // Load logo
            const logoUrl = 'RamaManoLogo.png';
            let logoData = null;
            let logoRatio = 1;
            
            try {
                await new Promise((resolve) => {
                    const img = new Image();
                    img.src = logoUrl;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        logoData = canvas.toDataURL('image/png');
                        logoRatio = img.width / img.height;
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
            } catch (err) {
                console.error('Error loading logo:', err);
            }

            // Helper: Add Watermark
            const addWatermark = () => {
                if (logoData) {
                    const wmWidth = 100;
                    const wmHeight = wmWidth / logoRatio;
                    const wmX = (pageWidth - wmWidth) / 2;
                    const wmY = (pageHeight - wmHeight) / 2;
                    
                    try {
                        if (GState) {
                            doc.setGState(new GState({ opacity: 0.1 }));
                            doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
                            doc.setGState(new GState({ opacity: 1.0 }));
                        } else {
                            // Fallback if GState not available
                             doc.setDrawColor(230, 230, 230);
                             doc.setTextColor(230, 230, 230);
                             // Maybe skip image if we can't make it transparent to avoid blocking text
                        }
                    } catch (e) {
                        console.warn('Watermark error:', e);
                    }
                }
            };
            
            // Helper: Add Header
            const addHeader = (isFirstPage = true) => {
                // Top blue bar
                doc.setFillColor(41, 128, 185);
                doc.rect(0, 0, pageWidth, 5, 'F');
                
                if (isFirstPage) {
                    if (logoData) {
                        const logoWidth = 40;
                        const logoHeight = logoWidth / logoRatio;
                        doc.addImage(logoData, 'PNG', margin, 15, logoWidth, logoHeight);
                    }
                    
                    doc.setFontSize(24);
                    doc.setTextColor(44, 62, 80);
                    doc.setFont(undefined, 'bold');
                    doc.text('Security Assessment Report', pageWidth - margin, 30, { align: 'right' });
                    
                    // Date
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(127, 140, 141);
                    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 40, { align: 'right' });
                    
                    // Divider
                    doc.setDrawColor(200, 200, 200);
                    doc.setLineWidth(0.5);
                    doc.line(margin, 50, pageWidth - margin, 50);
                } else {
                     // Simple header for other pages
                     doc.setFontSize(10);
                     doc.setTextColor(150, 150, 150);
                     doc.text('Security Assessment Report', pageWidth - margin, 15, { align: 'right' });
                }
            };
            
            // Helper: Add Footer
            const addFooter = (pageNo) => {
                const footerY = pageHeight - 20;
                
                // Divider line
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.5);
                doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
                
                // Contact Info
                doc.setFontSize(9);
                doc.setTextColor(44, 62, 80);
                doc.setFont(undefined, 'bold');
                doc.text('RamaMano IT Services', margin, footerY);
                
                doc.setFont(undefined, 'normal');
                doc.setTextColor(100, 100, 100);
                const contactText = 'Uppal, Hyderabad | +91 9762076999 | contact@ramamano.com';
                const textWidth = doc.getTextWidth(contactText);
                doc.text(contactText, (pageWidth - textWidth) / 2, footerY + 5); // Centered contact info usually looks better in footer
                
                // Page number
                doc.text(`Page ${pageNo}`, pageWidth - margin, footerY, { align: 'right' });
                
                // Bottom blue bar
                doc.setFillColor(41, 128, 185);
                doc.rect(0, pageHeight - 2, pageWidth, 2, 'F');
            };

            // --- Generate PDF Content ---
            
            let pageNo = 1;
            addWatermark();
            addHeader(true);
            
            let yPos = 70;
            
            // 1. Overall Score Box
            doc.setFillColor(240, 248, 255); // AliceBlue
            doc.setDrawColor(41, 128, 185);
            doc.roundedRect(margin, yPos, contentWidth, 40, 3, 3, 'FD');
            
            doc.setFontSize(16);
            doc.setTextColor(44, 62, 80);
            doc.setFont(undefined, 'bold');
            doc.text('Overall Security Score', margin + 10, yPos + 15);
            
            // Color code score
            let scoreColor = [46, 204, 113]; // Green
            let scoreText = "Excellent";
            if (assessmentScore < 40) {
                 scoreColor = [231, 76, 60]; // Red
                 scoreText = "Critical";
            } else if (assessmentScore < 60) {
                 scoreColor = [230, 126, 34]; // Orange
                 scoreText = "Basic";
            } else if (assessmentScore < 80) {
                 scoreColor = [241, 196, 15]; // Yellow/Orange
                 scoreText = "Good";
            }
            
            doc.setFontSize(28);
            doc.setTextColor(...scoreColor);
            doc.text(`${assessmentScore}/100`, pageWidth - margin - 10, yPos + 25, { align: 'right' });
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Rating: ${scoreText}`, margin + 10, yPos + 30);
            
            yPos += 60;
            
            // 2. Detailed Results
            doc.setFontSize(14);
            doc.setTextColor(44, 62, 80);
            doc.setFont(undefined, 'bold');
            doc.text('Detailed Assessment Breakdown', margin, yPos);
            yPos += 15;
            
            // Loop Questions
            assessmentQuestions.forEach((q, index) => {
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                const qLines = doc.splitTextToSize(`${index + 1}. ${q.question}`, contentWidth);
                const qHeight = qLines.length * 5;
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal'); // Changed from italic for better readability
                const ansText = assessmentAnswers[index] ? assessmentAnswers[index].answer : "Not Answered";
                const aLines = doc.splitTextToSize(ansText, contentWidth - 15); // Padding for answer box
                const aHeight = aLines.length * 5;
                
                const blockHeight = qHeight + aHeight + 20; // space for padding and margins
                
                // Check page break
                if (yPos + blockHeight > pageHeight - 40) {
                    addFooter(pageNo);
                    doc.addPage();
                    pageNo++;
                    addWatermark();
                    addHeader(false);
                    yPos = 30;
                }
                
                // Draw Question
                doc.setTextColor(44, 62, 80);
                doc.setFont(undefined, 'bold');
                doc.text(qLines, margin, yPos);
                yPos += qHeight + 3;
                
                // Draw Answer Box
                doc.setFillColor(250, 250, 250);
                doc.setDrawColor(230, 230, 230);
                doc.roundedRect(margin, yPos - 4, contentWidth, aHeight + 8, 1, 1, 'FD');
                
                // Draw Answer Text
                doc.setTextColor(80, 80, 80);
                doc.setFont(undefined, 'normal');
                // Add checkmark iconish char or just text
                doc.text(aLines, margin + 5, yPos);
                
                yPos += aHeight + 15;
            });
            
            addFooter(pageNo);
            
            doc.save('security-assessment-report.pdf');
        } else {
            alert('PDF generation library not loaded. Please refresh the page and try again.');
        }
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
    /* Disabled to prevent section overlap issues
    const parallaxSections = document.querySelectorAll('.parallax-section');
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const speed = 0.2;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (rect.top - window.innerHeight) * speed;
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
    */
    
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

