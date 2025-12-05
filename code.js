document.querySelector('.colBW').addEventListener('click', function() {
    document.querySelectorAll('.col1').forEach(el => el.style.backgroundColor = 'black');
    document.querySelectorAll('.col1').forEach(el => el.style.color = 'white');
    document.querySelectorAll('.col2').forEach(el => el.style.backgroundColor = 'white');
    document.querySelectorAll('.col2').forEach(el => el.style.color = 'black');
    document.body.style.backgroundColor = 'white';
    document.body.style.backgroundImage = 'none';
});

document.querySelector('.colDA').addEventListener('click', function() {
    document.querySelectorAll('.col1').forEach(el => el.style.backgroundColor = '#FEDC2A');
    document.querySelectorAll('.col1').forEach(el => el.style.color = '#8B538F');
    document.querySelectorAll('.col2').forEach(el => el.style.backgroundColor = '#8B538F');
    document.querySelectorAll('.col2').forEach(el => el.style.color = '#FEDC2A');
    document.body.style.backgroundColor = '#8B538F';
    document.body.style.backgroundImage = 'none';
});

document.querySelector('.colFUN').addEventListener('click', function() {
    document.querySelectorAll('.col1').forEach(el => el.style.backgroundColor = 'black');
    document.querySelectorAll('.col1').forEach(el => el.style.color = 'white');
    document.querySelectorAll('.col2').forEach(el => el.style.backgroundColor = 'white');
    document.querySelectorAll('.col2').forEach(el => el.style.color = 'black');
    document.body.style.backgroundColor = '#FF6B9D';
    document.body.style.backgroundImage = 'linear-gradient(45deg, #FF6B9D, #FFA500, #FFD700, #00CED1)';
});


function handleAvisVisibility() {
    const avisElements = document.querySelectorAll('.avis');
    const windowHeight = window.innerHeight;
    const triggerPoint = window.scrollY + windowHeight * (1/2);
    avisElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        if (elTop < triggerPoint) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.avis').forEach(el => {
        el.classList.remove('visible');
    });
    handleAvisVisibility();
});

window.addEventListener('scroll', handleAvisVisibility);

window.addEventListener('scroll', function() {
    const yahyaImage = document.querySelector('.yahya');
    if (window.scrollY >= 850) {
        yahyaImage.style.display = 'block';
    } else {
        yahyaImage.style.display = 'none';
    }
});

window.addEventListener('scroll', function() {
    const RemiImage = document.querySelector('.remi');
    RemiImage.style.transition = 'opacity 0.5s ease';
    if (window.scrollY >= 850) {
        RemiImage.style.display = 'block';
        RemiImage.style.opacity = '1';
    } else {
        RemiImage.style.opacity = '0';
        RemiImage.style.display = 'none';
    }
});

window.addEventListener('scroll', function() {
    const carteElement = document.querySelector('.carte');
    const pageHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition >= pageHeight - 100) {
        carteElement.style.display = 'block';
    } else {
        carteElement.style.display = 'none';
    }
});