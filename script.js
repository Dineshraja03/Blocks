
// Get all the link-boxes and the add button
const linkContainer = document.getElementById('link-boxes');
const addButton = document.getElementById('add-button');

// Add event listener to handle block deletions
function addDeleteFunctionality(linkBox) {
    const deleteBtn = linkBox.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent block from being clicked when deleting
        linkBox.remove();
    });
}

// Add delete functionality to initial blocks
document.querySelectorAll('.link-box').forEach(addDeleteFunctionality);

// Add click event to each link box for copy functionality
function addCopyFunctionality(linkBox) {
    linkBox.addEventListener('click', async (e) => {
        // Don't copy if clicking the delete button
        if (e.target.classList.contains('delete-btn')) {
            return;
        }

        const link = linkBox.getAttribute('data-link');
        
        // Function to show the copied notification
        const showCopiedNotification = () => {
            const copiedText = linkBox.querySelector('.copied');
            copiedText.classList.add('show');
            
            // Optional: Add haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }

            // Hide the notification after 2 seconds
            setTimeout(() => {
                copiedText.classList.remove('show');
            }, 2000);
        };

        // Try modern clipboard API first
        try {
            // Check if we have clipboard permissions
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(link);
                showCopiedNotification();
            } else {
                // Fallback method using execCommand
                const textarea = document.createElement('textarea');
                textarea.value = link;
                textarea.style.position = 'fixed';  // Avoid scrolling to bottom
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                
                try {
                    document.execCommand('copy');
                    textarea.remove();
                    showCopiedNotification();
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                    alert('Failed to copy link to clipboard');
                }
                textarea.remove();
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            
            // Try fallback method
            const textarea = document.createElement('textarea');
            textarea.value = link;
            textarea.style.position = 'fixed';  // Avoid scrolling to bottom
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            try {
                document.execCommand('copy');
                textarea.remove();
                showCopiedNotification();
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                alert('Failed to copy link to clipboard');
            }
            textarea.remove();
        }
    });
}

// Add copy functionality to initial blocks
document.querySelectorAll('.link-box').forEach(addCopyFunctionality);

// Function to add a new block
addButton.addEventListener('click', () => {
    // Prompt user for input
    const blockTitle = prompt("Enter the block name:");
    const blockSubtitle = prompt("Enter the subtitle:");
    const blockLink = prompt("Enter the link:");

    // Validate input
    if (!blockTitle || !blockSubtitle || !blockLink) {
        alert("All fields are required!");
        return;
    }

    // Create a new link box
    const newLinkBox = document.createElement('div');
    newLinkBox.classList.add('link-box');
    newLinkBox.setAttribute('data-link', blockLink);

    newLinkBox.innerHTML = `
        <div class="link-content">
            <h2>${blockTitle}</h2>
            <p>${blockSubtitle}</p>
        </div>
        <div class="copied">Copied!</div>
        <button class="delete-btn">X</button>
    `;

    // Append the new link box to the container
    linkContainer.appendChild(newLinkBox);

    // Add delete functionality to the new block
    addDeleteFunctionality(newLinkBox);

    // Add copy functionality to the new block
    addCopyFunctionality(newLinkBox);
});

// Primary animations
const animations = {
    portfolio: {
        container: document.getElementById('portfolio-lottie'),
        path: 'https://assets10.lottiefiles.com/packages/lf20_vwcugezu.json'
    },
    linkedin: {
        container: document.getElementById('linkedin-lottie'),
        path: 'https://assets2.lottiefiles.com/private_files/lf30_m6j5igxz.json'
    },
    github: {
        container: document.getElementById('github-lottie'),
        path: 'https://assets4.lottiefiles.com/packages/lf20_6HFXXE.json'
    },
    gfg: {
        container: document.getElementById('gfg-lottie'),
        path: 'https://assets9.lottiefiles.com/packages/lf20_1bdm0t0m.json'
    },
    resume: {
        container: document.getElementById('resume-lottie'),
        path: 'https://assets4.lottiefiles.com/private_files/lf30_qcakjhsd.json'
    }
};

// Backup animations
const backupAnimations = {
    portfolio: 'https://assets8.lottiefiles.com/packages/lf20_ffkzpglj.json',
    linkedin: 'https://assets2.lottiefiles.com/packages/lf20_yxjqhvqf.json',
    github: 'https://assets9.lottiefiles.com/packages/lf20_6HFXXE.json',
    gfg: 'https://assets3.lottiefiles.com/packages/lf20_1bdm0t0m.json',
    resume: 'https://assets5.lottiefiles.com/packages/lf20_qcakjhsd.json'
};

// Load animations with fallback
for (const [key, config] of Object.entries(animations)) {
    if (config.container) {
        lottie.loadAnimation({
            container: config.container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: config.path
        }).addEventListener('error', () => {
            // If primary animation fails, try backup
            lottie.loadAnimation({
                container: config.container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: backupAnimations[key]
            });
        });
    }
}

// Background Lottie Animations
const bgAnimations = [
    {
        container: document.getElementById('lottie-bg-1'),
        path: 'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json' // Abstract shapes
    },
    {
        container: document.getElementById('lottie-bg-2'),
        path: 'https://assets2.lottiefiles.com/packages/lf20_DMgKk1.json' // Flowing lines
    },
    {
        container: document.getElementById('lottie-bg-3'),
        path: 'https://assets9.lottiefiles.com/packages/lf20_kqfglvyp.json' // Gradient blob
    }
];

// Load background animations
bgAnimations.forEach(animation => {
    if (animation.container) {
        lottie.loadAnimation({
            container: animation.container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animation.path
        });
    }
});
