// ========================================================
//  NAVIGATION + HAMBURGER MENU
// ========================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on any link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================================
//  LOGIN/SIGNUP BUTTON HANDLERS
// ========================================================
document.querySelectorAll('.login-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // You can redirect to login page or open login modal
        alert('Login functionality would open here');
        window.location.href = 'login.html'; // If you have a login page
    });
});

document.querySelectorAll('.signup-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // You can redirect to signup page or open signup modal
        alert('Sign Up functionality would open here');
        window.location.href = 'signup.html'; // If you have a signup page
    });
});

// ========================================================
//  SMOOTH SCROLL FOR INTERNAL LINKS
// ========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only process if it's an internal anchor link
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// ========================================================
//  SPORT SUITABILITY POPUP (FORM #1)
// ========================================================
function openSuitabilityForm() {
    document.getElementById("suitabilityPopup").style.display = "block";
    // Clear form when opening
    document.getElementById("sportForm").reset();
}

function closeSuitabilityForm() {
    document.getElementById("suitabilityPopup").style.display = "none";
}

function validateSportForm() {
    let name = document.getElementById("sportName").value.trim();
    let age = parseInt(document.getElementById("sportAge").value.trim());
    let height = parseInt(document.getElementById("sportHeight").value.trim());
    let weight = parseInt(document.getElementById("sportWeight").value.trim());
    let goal = document.getElementById("sportGoal").value;

    // Validation
    if (!name || !age || !height || !weight || !goal) {
        alert("⚠ Please fill in all fields!");
        return false;
    }

    if (age < 10 || age > 80 || isNaN(age)) {
        alert("⚠ Age must be a number between 10 and 80.");
        return false;
    }

    if (height < 100 || height > 250 || isNaN(height)) {
        alert("⚠ Height must be between 100cm and 250cm.");
        return false;
    }

    if (weight < 30 || weight > 200 || isNaN(weight)) {
        alert("⚠ Weight must be between 30kg and 200kg.");
        return false;
    }

    // Simulate analysis and show results
    simulateAnalysis(name, age, height, weight, goal);
    return true;
}

function simulateAnalysis(name, age, height, weight, goal) {
    // Show loading/processing message
    alert("🔍 Analyzing your data... Please wait!");
    
    // Simulate API call delay
    setTimeout(() => {
        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        // Generate sport recommendations based on criteria
        let sports = [];
        let recommendation = "";
        
        if (goal === "Lose Weight") {
            sports = ["Running", "Swimming", "Cycling", "HIIT Training"];
            recommendation = "Focus on cardio exercises 4-5 times per week.";
        } else if (goal === "Build Muscle") {
            sports = ["Weightlifting", "Bodybuilding", "CrossFit", "Calisthenics"];
            recommendation = "Incorporate strength training 3-4 times per week with proper nutrition.";
        } else if (goal === "Increase Stamina") {
            sports = ["Running", "Cycling", "Rowing", "Circuit Training"];
            recommendation = "Gradually increase workout duration and intensity.";
        } else if (goal === "Improve Mobility") {
            sports = ["Yoga", "Pilates", "Tai Chi", "Dynamic Stretching"];
            recommendation = "Practice daily stretching and mobility exercises.";
        }
        
        // Display results
        const results = `
✅ ANALYSIS COMPLETE!

👤 Name: ${name}
📊 Age: ${age} years
📏 Height: ${height} cm
⚖️ Weight: ${weight} kg
🎯 Goal: ${goal}
📈 BMI: ${bmi}

🏆 RECOMMENDED SPORTS:
${sports.map((sport, index) => `${index + 1}. ${sport}`).join('\n')}

💡 RECOMMENDATION:
${recommendation}

Keep up the great work! 💪
        `;
        
        alert(results);
        closeSuitabilityForm();
        
        // Optionally, you could display results on the page
        // document.getElementById("analysisResults").innerHTML = results;
        // document.getElementById("analysisResults").style.display = "block";
    }, 1500);
}

// ========================================================
//  FREE TRIAL FORM (FORM #2)
// ========================================================
function validateTrialForm() {
    let name = document.getElementById("trialName").value.trim();
    let email = document.getElementById("trialEmail").value.trim();
    let phone = document.getElementById("trialPhone").value.trim();

    // Validation patterns
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phonePattern = /^[0-9]{8}$/;

    // Validation
    if (!name || !email || !phone) {
        alert("⚠ Please fill in all fields!");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("⚠ Please enter a valid email address (e.g., user@example.com).");
        return false;
    }

    if (!phonePattern.test(phone)) {
        alert("⚠ Phone number must be 8 digits (Tunisian format).");
        return false;
    }

    // Simulate API call
    alert("⏳ Processing your free trial request...");
    
    setTimeout(() => {
        // Show success message
        const successMessage = `
🎉 WELCOME TO NUTRISPORT+!

Thank you, ${name}!
Your 14-day free trial has been activated.

📧 Confirmation sent to: ${email}
📞 Contact number: ${phone}

Check your email for:
1. Account activation link
2. Getting started guide
3. Personalized workout plan

Start your fitness journey today! 💪
        `;
        
        alert(successMessage);
        
        // Reset form
        document.getElementById("trialForm").reset();
        
        // Optionally redirect to dashboard or home page
        // window.location.href = "dashboard.html";
    }, 2000);

    return true;
}

// ========================================================
//  SCROLL ANIMATIONS
// ========================================================
// Initialize Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        }
    });
}, observerOptions);

// Observe all feature cards and section titles
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .section-title, .feature-detail');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        observer.observe(el);
    });
});

// ========================================================
//  POPUP CLOSE ON CLICK OUTSIDE
// ========================================================
window.addEventListener("click", function(e) {
    const popup = document.getElementById("suitabilityPopup");
    if (e.target === popup) {
        closeSuitabilityForm();
    }
});

// ========================================================
//  ENTER KEY SUPPORT FOR FORMS
// ========================================================
document.addEventListener('keypress', function(e) {
    // Submit sport form on Enter
    if (e.key === 'Enter' && document.getElementById("suitabilityPopup").style.display === "block") {
        if (e.target.closest('#sportForm')) {
            validateSportForm();
        }
    }
    
    // Submit trial form on Enter
    if (e.key === 'Enter' && e.target.closest('#trialForm')) {
        validateTrialForm();
    }
});

// ========================================================
//  PAGE INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ NutriSport+ Features Page Initialized");
    
    // Set current year in footer (optional)
    const yearSpan = document.querySelector('.footer p');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', new Date().getFullYear());
    }
});

// ========================================================
//  NUTRISPORT+ AI CHATBOT FUNCTIONALITY
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
    // Chatbot elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    // Initialize chatbot if elements exist
    if (chatbotToggle) {
        // Toggle chatbot window
        chatbotToggle.addEventListener('click', function() {
            chatbotWindow.classList.toggle('active');
            chatbotToggle.classList.toggle('active');
            if (chatbotWindow.classList.contains('active')) {
                chatbotInput.focus();
            }
        });

        // Close chatbot window
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.classList.remove('active');
            chatbotToggle.classList.remove('active');
        });

        // Send message function
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                // Add user message
                addMessage(message, 'user');
                
                // Clear input
                chatbotInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Get NutriSport+ AI response
                setTimeout(() => {
                    removeTypingIndicator();
                    const response = getNutriSportAIResponse(message);
                    addMessage(response, 'bot');
                }, 1000);
            }
        }

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const senderIcon = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
            const senderName = sender === 'bot' ? 'NutriSport AI' : 'You';
            const aiTag = sender === 'bot' ? '<span class="ai-tag">AI</span>' : '';
            
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-sender">
                        ${senderIcon}
                        <span>${senderName}</span>
                        ${aiTag}
                    </div>
                    <p>${text}</p>
                    <div class="message-time">${time}</div>
                </div>
            `;
            
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-sender">
                        <i class="fas fa-robot"></i>
                        <span>NutriSport AI</span>
                        <span class="ai-tag">AI</span>
                    </div>
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Get NutriSport+ specific AI response
        function getNutriSportAIResponse(userMessage) {
            const lowerMessage = userMessage.toLowerCase();
            
            // NutriSport+ specific responses
            const nutriResponses = {
                // Sport Suitability
                'sport': 'Our Sport Suitability Analysis uses AI to match you with ideal sports based on your physical attributes, goals, and preferences. You can take the test by clicking "Take Suitability Test" on the features page!',
                'suitability': 'The suitability test analyzes your age, height, weight, and goals to recommend sports that match your profile perfectly.',
                'recommend': 'Based on common goals: For weight loss → Swimming/Running. For muscle building → Weightlifting/CrossFit. For stamina → Cycling/Rowing.',
                
                // Features
                'feature': 'NutriSport+ offers: 1) Sport Suitability Analysis, 2) Health Monitoring, 3) Workout Library, 4) Progress Analytics, 5) Training Calendar, 6) Achievement System, 7) Mobile App.',
                'health': 'Health Monitoring tracks vital signs, sleep patterns, heart rate, and recovery metrics to optimize your training.',
                'workout': 'Our Workout Library has thousands of exercises with video guidance, categorized by difficulty and equipment needed.',
                'progress': 'Progress Analytics provides detailed charts and insights on your performance trends over time.',
                'calendar': 'The Training Calendar helps you plan, schedule, and track your workouts with reminders.',
                'achievement': 'Earn badges and rewards for reaching milestones like consistency, personal bests, and goal completion.',
                
                // Getting Started
                'start': 'To get started: 1) Sign up for a free trial, 2) Complete your profile, 3) Take the Sport Suitability test, 4) Follow your personalized plan!',
                'begin': 'New users get a 14-day free trial with full access to all features. No credit card required!',
                'free trial': 'Yes! We offer a 14-day free trial with complete access to all NutriSport+ features. Sign up using the form on our features page.',
                
                // Nutrition
                'nutrition': 'We provide personalized nutrition plans based on your goals, dietary preferences, and workout intensity. Track macros and calories easily!',
                'diet': 'Our AI generates diet plans for weight loss, muscle gain, or maintenance. Includes recipes and shopping lists.',
                'calorie': 'Track daily calorie intake and expenditure. Set goals and get meal suggestions based on your activity level.',
                
                // Technical
                'app': 'NutriSport+ is available on iOS and Android. Download from App Store or Google Play. Syncs seamlessly with web platform.',
                'mobile': 'Yes! Full mobile app available with all features including workout tracking, nutrition logging, and progress monitoring.',
                'sync': 'All data syncs automatically across web and mobile platforms in real-time.',
                
                // Support
                'help': 'I can help with: Sport recommendations, feature explanations, getting started, nutrition advice, and technical questions!',
                'contact': 'Reach us at: support@nutrisport.com or call +216 XX XXX XXX. Business hours: Mon-Fri 9AM-6PM.',
                'support': 'Our support team responds within 24 hours. You can also check our FAQ section on the website.',
                
                // Pricing
                'price': 'After free trial: Basic plan tnd9.99/month, Premium plan tnd19.99/month (includes personalized coaching).',
                'cost': 'We offer affordable plans starting at tnd9.99/month. Yearly subscriptions save 20%.',
                'plan': 'Choose between Basic (self-guided) or Premium (with AI coaching). Both include all core features.',
                
                // General greetings
                'hello': 'Hello! I\'m your NutriSport+ AI assistant. How can I help you with your fitness journey today? 💪',
                'hi': 'Hi there! Ready to optimize your fitness with AI-powered insights?',
                'hey': 'Hey! I\'m here to help you get the most out of NutriSport+. What would you like to know?'
            };
            
            // Check for NutriSport+ specific keywords
            for (const [key, response] of Object.entries(nutriResponses)) {
                if (lowerMessage.includes(key)) {
                    return response;
                }
            }
            
            // Check for common questions patterns
            if (lowerMessage.includes('what sport') || lowerMessage.includes('which sport')) {
                return 'I recommend trying our Sport Suitability Analysis! It evaluates your physical attributes and goals to suggest perfect sports for you.';
            }
            
            if (lowerMessage.includes('how much') || lowerMessage.includes('cost')) {
                return 'We offer a 14-day free trial, then plans start at tnd 9.99/month. Premium plan with AI coaching is tnd19.99/month.';
            }
            
            if (lowerMessage.includes('lose weight') || lowerMessage.includes('weight loss')) {
                return 'For weight loss, focus on cardio exercises 4-5 times/week. Our platform creates personalized cardio and nutrition plans. Recommended sports: Swimming, Running, HIIT.';
            }
            
            if (lowerMessage.includes('build muscle') || lowerMessage.includes('muscle gain')) {
                return 'Muscle building requires strength training 3-4 times/week with proper protein intake. Try Weightlifting, Bodybuilding, or Calisthenics.';
            }
            
            // Default response
            return "I'm your NutriSport+ AI assistant! I can help you with:\n• Sport recommendations\n• Feature explanations\n• Nutrition advice\n• Getting started\n• Technical questions\n\nWhat would you like to know?";
        }

        // Send message on button click
        chatbotSend.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quick suggestion buttons
        suggestionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                chatbotInput.value = question;
                sendMessage();
            });
        });

        // Close chatbot when clicking outside
        document.addEventListener('click', function(event) {
            if (chatbotWindow && chatbotToggle && chatbotWindow.classList.contains('active')) {
                if (!chatbotWindow.contains(event.target) && !chatbotToggle.contains(event.target)) {
                    chatbotWindow.classList.remove('active');
                    chatbotToggle.classList.remove('active');
                }
            }
        });
        
        console.log("🤖 NutriSport+ AI Chatbot Initialized");
    }
});