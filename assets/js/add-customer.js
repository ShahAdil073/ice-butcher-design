document.addEventListener('DOMContentLoaded', function() {
  // Modal functionality
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.close-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const addBtn = document.querySelector('.add-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      closeModal();
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', function() {
      if (validateForm()) {
        // In a real app, this would submit the form data
        alert('Customer added successfully!');
        closeModal();
      }
    });
  }

  // Close modal when clicking outside
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Phone number formatting
  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
    });
  }

  // Tag removal
  const tagRemoveButtons = document.querySelectorAll('.tag i');
  tagRemoveButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.parentElement.remove();
    });
  });

  // Tag input
  const tagsInput = document.querySelector('.tags-input input');
  if (tagsInput) {
    tagsInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && this.value.trim() !== '') {
        e.preventDefault();

        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `${this.value.trim()} <i class="fas fa-times"></i>`;

        const removeBtn = tag.querySelector('i');
        removeBtn.addEventListener('click', function() {
          tag.remove();
        });

        this.parentElement.insertBefore(tag, this);
        this.value = '';
      }
    });
  }

  // Map control buttons
  const locationBtn = document.querySelector('.location-btn');
  const searchBtn = document.querySelector('.search-btn');
  const globeBtn = document.querySelector('.globe-btn');

  if (locationBtn) {
    locationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // In a real app, this would get the user's current location
      alert('This would get your current location');
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const address = document.getElementById('address').value;
      if (address.trim() !== '') {
        // In a real app, this would search for the address on the map
        alert(`Searching for: ${address}`);
      } else {
        alert('Please enter an address to search');
      }
    });
  }

  if (globeBtn) {
    globeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // In a real app, this would toggle the map view
      alert('This would toggle the map view');
    });
  }
});

// Function to close the modal
function closeModal() {
  window.location.href = 'index.html'; // In a real app, this would go back to the previous page
}

// Form validation
function validateForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phoneNumber = document.getElementById('phoneNumber');
  const address = document.getElementById('address');

  let isValid = true;
  let errors = [];

  // Simple validation checks
  if (!name || name.value.trim() === '') {
    errors.push('Name is required');
    isValid = false;
    highlightInvalidField(name);
  }

  if (!email || email.value.trim() === '') {
    errors.push('Email is required');
    isValid = false;
    highlightInvalidField(email);
  } else if (!isValidEmail(email.value)) {
    errors.push('Please enter a valid email address');
    isValid = false;
    highlightInvalidField(email);
  }

  if (!phoneNumber || phoneNumber.value.trim() === '') {
    errors.push('Phone number is required');
    isValid = false;
    highlightInvalidField(phoneNumber);
  }

  if (!address || address.value.trim() === '') {
    errors.push('Address is required');
    isValid = false;
    highlightInvalidField(address);
  }

  if (!isValid) {
    alert('Please correct the following errors:\n' + errors.join('\n'));
  }

  return isValid;
}

// Validate email format
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Highlight invalid form fields
function highlightInvalidField(field) {
  field.style.borderColor = '#FF4560';

  field.addEventListener('input', function() {
    field.style.borderColor = '#E5E7EB';
  }, { once: true });
}

// Initialize Google Map
function initCustomerMap() {
  const mapOptions = {
    center: { lat: 25.7617, lng: -80.1918 }, // Miami coordinates
    zoom: 14,
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#444444" }],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [{ color: "#f2f2f2" }],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [{ saturation: -100 }, { lightness: 45 }],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [{ color: "#C3D4E5" }, { visibility: "on" }],
      },
    ],
  };

  const mapElement = document.getElementById('customerMap');

  if (mapElement) {
    const map = new google.maps.Map(mapElement, mapOptions);

    // Add a default marker
    const marker = new google.maps.Marker({
      position: { lat: 25.7617, lng: -80.1918 },
      map: map,
      draggable: true, // Allow marker to be dragged
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#0F3460",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      },
    });

    // Update address field when marker is dragged
    marker.addListener('dragend', function() {
      const position = marker.getPosition();
      reverseGeocode(position.lat(), position.lng());
    });

    // Initialize with address from input if it exists
    const addressInput = document.getElementById('address');
    if (addressInput && addressInput.value.trim() !== '') {
      geocodeAddress(addressInput.value, map, marker);
    }

    // Update map when address changes
    if (addressInput) {
      addressInput.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
          geocodeAddress(this.value, map, marker);
        }
      });
    }
  }
}

// Geocode address to get coordinates
function geocodeAddress(address, map, marker) {
  // In a real app, this would use Google's Geocoding API
  console.log(`Geocoding address: ${address}`);

  // Placeholder - simulating geocoding result
  // In a real app, this would be replaced with actual geocoding
  const lat = 25.7617 + (Math.random() * 0.05 - 0.025);
  const lng = -80.1918 + (Math.random() * 0.05 - 0.025);

  const location = new google.maps.LatLng(lat, lng);
  marker.setPosition(location);
  map.setCenter(location);
}

// Reverse geocode coordinates to address
function reverseGeocode(lat, lng) {
  // In a real app, this would use Google's Reverse Geocoding API
  console.log(`Reverse geocoding coordinates: ${lat}, ${lng}`);

  // Placeholder - simulating reverse geocoding result
  // In a real app, this would update the address field with the actual address
  const addressInput = document.getElementById('address');
  if (addressInput) {
    addressInput.value = `Address at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
}
