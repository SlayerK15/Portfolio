function detectDevice() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'mobile';
    }

    if (/android/i.test(userAgent)) {
        return 'mobile';
    }

    if (/windows phone/i.test(userAgent)) {
        return 'mobile';
    }

    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
        return 'tablet';
    }

    return 'desktop';
}

function loadDeviceSpecificContent() {
    var device = detectDevice();

    if (device === 'mobile') {
        document.body.classList.add('mobile');
    } else if (device === 'tablet') {
        document.body.classList.add('tablet');
    }
}

window.onload = loadDeviceSpecificContent;

document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll('.project');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    projects.forEach(project => {
        observer.observe(project);
    });
});
