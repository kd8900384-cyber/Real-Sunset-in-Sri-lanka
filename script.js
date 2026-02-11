document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on
    const isUploadPage = document.getElementById('dropZone');
    const isGalleryPage = document.getElementById('galleryGrid');

    if (isUploadPage) {
        setupUpload();
    } else if (isGalleryPage) {
        setupGallery();
    }
});

// --- Upload Logic ---
function setupUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('videoInput');
    const uploadButton = document.getElementById('uploadButton');
    const previewContainer = document.getElementById('previewContainer');
    const fileNameDisplay = document.getElementById('fileName');
    const progressBar = document.getElementById('uploadProgress');

    // Trigger file input on click
    dropZone.addEventListener('click', () => fileInput.click());

    // File selected handler
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ff9e2c';
        dropZone.style.background = 'rgba(255, 158, 44, 0.2)';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        dropZone.style.background = 'transparent';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        dropZone.style.background = 'transparent';
        
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files; // Update file input
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    function handleFileSelect(file) {
        if (!file.type.startsWith('video/')) {
            alert('Please upload a valid video file!');
            return;
        }

        fileNameDisplay.textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        previewContainer.style.display = 'block';
        uploadButton.disabled = false;
        progressBar.style.display = 'none';
        progressBar.value = 0;
    }

    // Upload Button Click
    uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) return;

        progressBar.style.display = 'block';
        uploadButton.disabled = true;

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.value = progress;
            if (progress >= 100) {
                clearInterval(interval);
                saveVideoMetadata(file);
                alert('Upload Complete! Check out the Gallery.');
                window.location.href = 'gallery.html';
            }
        }, 100);
    });
}

// Save video metadata to localStorage
function saveVideoMetadata(file) {
    const videos = JSON.parse(localStorage.getItem('sunset_videos') || '[]');
    
    // Create a fake object URL for demo (this won't persist across refresh correctly unless same session, but suffices for simulation)
    // NOTE: In a real app, we need a backend. For simulation, we just store the name.
    
    const newVideo = {
        name: file.name,
        date: new Date().toLocaleDateString(),
        // We can't really store large video blobs in localStorage. 
        // We'll simulate by just showing a card.
        id: Date.now()
    };

    videos.unshift(newVideo);
    localStorage.setItem('sunset_videos', JSON.stringify(videos));
}

// --- Gallery Logic ---
function setupGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const videos = JSON.parse(localStorage.getItem('sunset_videos') || '[]');

    if (videos.length === 0) {
        galleryGrid.innerHTML = '<p style="text-align:center; width: 100%; grid-column: 1/-1;">No videos yet. Upload one!</p>';
        return;
    }

    // Clear default example if we have data, but keep it if we want users to see something initially
    // Let's clear it to show "dynamic" data
    galleryGrid.innerHTML = '';

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-placeholder">🎥</div>
            <div class="video-info">
                <div class="video-title">${video.name}</div>
                <div class="video-date">Uploaded: ${video.date}</div>
            </div>
        `;
        galleryGrid.appendChild(card);
    });
}
