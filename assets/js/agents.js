// Document Ready Event
document.addEventListener('DOMContentLoaded', function() {
  // Add Agent Modal
  setupAgentModal();

  // Table functionality
  setupTableFunctionality();

  // Search functionality
  setupSearchFunctionality();

  // Filter dropdowns
  setupFilterDropdowns();

  // Pagination
  setupPagination();
});

// Add Agent Modal Setup
function setupAgentModal() {
  const addAgentBtn = document.querySelector('.add-agent-btn');
  const closeBtn = document.querySelector('#addAgentModal .close-btn');
  const cancelBtn = document.querySelector('#addAgentModal .cancel-btn');
  const modal = document.getElementById('addAgentModal');

  if (addAgentBtn && modal) {
    addAgentBtn.addEventListener('click', function() {
      openModal(modal);
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      closeModal(modal);
    });
  }

  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', function() {
      closeModal(modal);
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  // Password Toggle
  const passwordToggle = document.querySelector('.password-toggle');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Toggle icon
      const icon = this.querySelector('i');
      if (icon) {
        if (type === 'password') {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        } else {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      }
    });
  }

  // Photo Upload
  setupPhotoUpload();

  // Tags Input
  setupTagsInput();
}

// Setup Photo Upload
function setupPhotoUpload() {
  const avatarPreview = document.querySelector('.avatar-preview');

  if (avatarPreview) {
    avatarPreview.addEventListener('click', function() {
      // Simulating a file input click
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';

      fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;

            // Replace placeholder with uploaded image
            const placeholder = avatarPreview.querySelector('.avatar-placeholder');
            if (placeholder) {
              placeholder.remove();
              avatarPreview.appendChild(img);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      fileInput.click();
    });
  }
}

// Setup Tags Input
function setupTagsInput() {
  const tagsInput = document.querySelector('.tags-input input');
  const tagsContainer = document.querySelector('.tags-input');

  if (tagsInput && tagsContainer) {
    // Add new tag on Enter key
    tagsInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && this.value.trim() !== '') {
        e.preventDefault();

        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.innerHTML = `${this.value.trim()} <i class="fas fa-times"></i>`;

        // Insert before the input
        tagsContainer.insertBefore(tag, this);

        // Clear input
        this.value = '';

        // Add click event to remove tag
        const removeIcon = tag.querySelector('i');
        if (removeIcon) {
          removeIcon.addEventListener('click', function() {
            tag.remove();
          });
        }
      }
    });

    // Add click event to existing remove icons
    const existingRemoveIcons = document.querySelectorAll('.tag i');
    existingRemoveIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        this.parentElement.remove();
      });
    });
  }
}

// Setup Table Functionality
function setupTableFunctionality() {
  // Select All Checkbox
  const selectAllCheckbox = document.querySelector('.select-all');
  const rowCheckboxes = document.querySelectorAll('.select-row');

  if (selectAllCheckbox && rowCheckboxes.length > 0) {
    selectAllCheckbox.addEventListener('change', function() {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });

    // Update Select All when individual checkboxes change
    rowCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const allChecked = Array.from(rowCheckboxes).every(box => box.checked);
        const someChecked = Array.from(rowCheckboxes).some(box => box.checked);

        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
      });
    });
  }

  // Action Buttons
  const actionButtons = document.querySelectorAll('.action-btn');
  actionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();

      // Here you would typically show a dropdown menu with actions
      console.log('Action clicked for row:', this.closest('tr').querySelector('td:nth-child(2)').textContent);
    });
  });

  // Make rows clickable to view agent details
  const tableRows = document.querySelectorAll('.agents-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('click', function(e) {
      // Prevent triggering when clicking on checkbox or action button
      if (e.target.closest('input[type="checkbox"]') || e.target.closest('.action-btn')) {
        return;
      }

      const agentId = this.querySelector('td:nth-child(2)').textContent;
      console.log('View agent details:', agentId);

      // Here you would typically navigate to agent details page or show a modal
    });
  });
}

// Setup Search Functionality
function setupSearchFunctionality() {
  const searchInput = document.querySelector('.search-box input');

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const tableRows = document.querySelectorAll('.agents-table tbody tr');

      tableRows.forEach(row => {
        const id = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const username = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
        const phone = row.querySelector('td:nth-child(7)').textContent.toLowerCase();

        if (id.includes(searchTerm) ||
            username.includes(searchTerm) ||
            email.includes(searchTerm) ||
            phone.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
}

// Setup Filter Dropdowns
function setupFilterDropdowns() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Here would typically go the logic to show a dropdown
      console.log('Filter clicked:', this.textContent.trim());
    });
  });
}

// Setup Pagination
function setupPagination() {
  const prevButton = document.querySelector('.prev-page');
  const nextButton = document.querySelector('.next-page');
  const pageButtons = document.querySelectorAll('.page-number');

  if (prevButton && nextButton && pageButtons.length > 0) {
    prevButton.addEventListener('click', function() {
      const activePage = document.querySelector('.page-number.active');
      const activeIndex = Array.from(pageButtons).indexOf(activePage);

      if (activeIndex > 0) {
        activePage.classList.remove('active');
        pageButtons[activeIndex - 1].classList.add('active');
      }
    });

    nextButton.addEventListener('click', function() {
      const activePage = document.querySelector('.page-number.active');
      const activeIndex = Array.from(pageButtons).indexOf(activePage);

      if (activeIndex < pageButtons.length - 1) {
        activePage.classList.remove('active');
        pageButtons[activeIndex + 1].classList.add('active');
      }
    });

    pageButtons.forEach(button => {
      button.addEventListener('click', function() {
        pageButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
}

// Initialize Geofence Map
function initGeofenceMap() {
  const mapElement = document.getElementById('geofenceMap');
  if (!mapElement) return;

  // Center map on Miami
  const map = new google.maps.Map(mapElement, {
    center: { lat: 25.7617, lng: -80.1918 },
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }, { lightness: 17 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 18 }]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 16 }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#dedede" }, { lightness: 21 }]
      }
    ]
  });

  // Example geofence: circle around Miami downtown
  const geofenceCircle = new google.maps.Circle({
    strokeColor: "#1E88E5",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#1E88E5",
    fillOpacity: 0.2,
    map: map,
    center: { lat: 25.7617, lng: -80.1918 },
    radius: 3000 // meters
  });
}

// Open Modal Function
function openModal(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Modal Function
function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}
