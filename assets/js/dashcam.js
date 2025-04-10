document.addEventListener('DOMContentLoaded', function() {
  // Tab navigation
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // Here you would normally show/hide the corresponding content
      // This is a placeholder for that functionality
      const tabName = this.textContent.trim().toLowerCase();
      console.log(`Switched to ${tabName} tab`);
    });
  });

  // Back button functionality
  const backButton = document.querySelector('.back-btn');
  if (backButton) {
    backButton.addEventListener('click', function() {
      window.history.back();
    });
  }

  // Tracking link functionality
  const trackingLink = document.querySelector('.tracking-link');
  if (trackingLink) {
    trackingLink.addEventListener('click', function() {
      alert('Opening tracking link...');
      // In a real application, this would open the tracking interface
    });
  }

  // Path history button functionality
  const pathHistoryBtn = document.querySelector('.path-history-btn');
  if (pathHistoryBtn) {
    pathHistoryBtn.addEventListener('click', function() {
      alert('Showing path history...');
      // In a real application, this would display the path history
    });
  }

  // Driver action buttons
  const actionButtons = document.querySelectorAll('.action-icon-btn');
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.querySelector('i').classList.contains('fa-phone') ? 'call' : 'track';
      alert(`Performing ${action} action`);
    });
  });
});

// Google Maps initialization
function initMap() {
  const mapOptions = {
    center: { lat: 25.7617, lng: -80.1918 }, // Miami coordinates
    zoom: 12,
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

  const mapElement = document.getElementById('map');

  if (mapElement) {
    const map = new google.maps.Map(mapElement, mapOptions);

    // Add a marker for the task location
    const marker = new google.maps.Marker({
      position: { lat: 25.7617, lng: -80.1918 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#0F3460",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      },
    });

    // Add driver location marker
    const driverMarker = new google.maps.Marker({
      position: { lat: 25.7650, lng: -80.1950 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 6,
        fillColor: "#FF4560",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
        rotation: 45,
      },
    });

    // Add traffic notification
    addTrafficNotification(map);

    // Draw path from driver to destination
    drawPath(map, driverMarker.getPosition(), marker.getPosition());
  }
}

// Add traffic notification to the map
function addTrafficNotification(map) {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    const notification = document.createElement('div');
    notification.className = 'traffic-notification';
    notification.innerHTML = `
      <i class="fas fa-car"></i>
      <div class="traffic-content">
        <div class="traffic-time">9 Min</div>
        <div class="traffic-status">Heavy Traffic</div>
      </div>
    `;

    mapElement.appendChild(notification);
  }
}

// Draw path from origin to destination
function drawPath(map, origin, destination) {
  const pathCoordinates = [
    origin,
    { lat: 25.7630, lng: -80.1930 },
    { lat: 25.7620, lng: -80.1925 },
    destination
  ];

  const path = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeColor: "#0F3460",
    strokeOpacity: 0.8,
    strokeWeight: 4,
  });

  path.setMap(map);
}
