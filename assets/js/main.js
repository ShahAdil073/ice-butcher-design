// Global Variables
let map;
let markers = [];
let currentInfoWindow = null;

// Initialize Google Maps
function initMap() {
  // Miami coordinates
  const miami = { lat: 25.7617, lng: -80.1918 };

  // Create Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: miami,
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
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
      },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{ color: "#fefefe" }, { lightness: 20 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
      }
    ]
  });

  // Add Control Buttons
  addMapControls();

  // Add Markers
  addMarkers();

  // Draw Route
  drawRoute();
}

// Add Custom Map Controls
function addMapControls() {
  // Zoom In Control
  const zoomInControl = document.createElement("div");
  zoomInControl.className = "custom-map-control zoom-in";
  zoomInControl.innerHTML = '<i class="fas fa-plus"></i>';
  zoomInControl.addEventListener("click", function() {
    map.setZoom(map.getZoom() + 1);
  });
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(zoomInControl);

  // Zoom Out Control
  const zoomOutControl = document.createElement("div");
  zoomOutControl.className = "custom-map-control zoom-out";
  zoomOutControl.innerHTML = '<i class="fas fa-minus"></i>';
  zoomOutControl.addEventListener("click", function() {
    map.setZoom(map.getZoom() - 1);
  });
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(zoomOutControl);

  // Current Location Control
  const locationControl = document.createElement("div");
  locationControl.className = "custom-map-control location";
  locationControl.innerHTML = '<i class="fas fa-crosshairs"></i>';
  locationControl.addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          map.setZoom(15);
        },
        function() {
          // Handle location error
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      alert("Error: Your browser doesn't support geolocation.");
    }
  });
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationControl);
}

// Add Markers to Map
function addMarkers() {
  // Sample data for agents and tasks
  const locations = [
    {
      position: { lat: 25.7617, lng: -80.1918 },
      type: 'driver',
      title: 'Sebastian Nelson',
      info: 'Prime Sedan'
    },
    {
      position: { lat: 25.7839, lng: -80.2102 },
      type: 'driver',
      title: 'Angel Ponces',
      info: 'Prime Sedan'
    },
    {
      position: { lat: 25.7752, lng: -80.2086 },
      type: 'task',
      title: 'Miami Task #1',
      info: '123 Main St'
    },
    {
      position: { lat: 26.2378, lng: -80.1248 },
      type: 'task',
      title: 'Pompano Beach Task #2',
      info: '123 Main St'
    },
    {
      position: { lat: 25.7859, lng: -80.1953 },
      type: 'task',
      title: 'Miami Task #3',
      info: '123 Main St'
    },
    {
      position: { lat: 26.1224, lng: -80.1373 },
      type: 'task',
      title: 'Fort Lauderdale Task #4',
      info: '123 Main St'
    },
  ];

  // Clear existing markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  // Add new markers
  locations.forEach(location => {
    const iconUrl = location.type === 'driver'
      ? 'assets/img/agent-1.svg'
      : 'assets/img/agent-2.svg';

    const marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.title,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(30, 30)
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="map-info-window">
          <h3>${location.title}</h3>
          <p>${location.info}</p>
        </div>
      `
    });

    marker.addListener('click', function() {
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }
      infoWindow.open(map, marker);
      currentInfoWindow = infoWindow;
    });

    markers.push(marker);
  });
}

// Draw Route on Map
function drawRoute() {
  // Sample route between driver and task
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#4285F4',
      strokeWeight: 5,
      strokeOpacity: 0.8
    }
  });

  directionsRenderer.setMap(map);

  const request = {
    origin: { lat: 25.7617, lng: -80.1918 }, // Sebastian Nelson's location
    destination: { lat: 25.7752, lng: -80.2086 }, // Task #1 location
    waypoints: [
      { location: { lat: 25.7859, lng: -80.1953 }, stopover: true }, // Task #3
    ],
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  });
}

// Event Listeners for Day Filter
document.addEventListener('DOMContentLoaded', function() {
  const dayFilterButtons = document.querySelectorAll('.day-filter button');

  dayFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      dayFilterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // You could update the map data based on selected day here
    });
  });

  // Modal functionality
  setupModals();

  // Create Task button functionality
  const createTaskButtons = document.querySelectorAll('button.create-task-btn');
  createTaskButtons.forEach(button => {
    button.addEventListener('click', function() {
      openModal('addTaskModal');
    });
  });
});

// Modal Functions
function setupModals() {
  // Close buttons for modals
  const closeButtons = document.querySelectorAll('.close-btn, .cancel-btn');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal.id);
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Task type buttons in Add Task modal
  const taskTypeButtons = document.querySelectorAll('.task-type-btn');
  taskTypeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      taskTypeButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Create default marker icons if not available
function createDefaultMarkerIcons() {
  // Driver marker (blue)
  const driverMarkerSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
      <path fill="#13294B" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  // Task marker (orange)
  const taskMarkerSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
      <path fill="#FF9800" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  // Convert SVG to data URL
  const svgToDataURL = (svg) => {
    const encodedSvg = encodeURIComponent(svg);
    return `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
  };

  // Create images in assets folder
  const createImageElement = (src, id) => {
    const img = document.createElement('img');
    img.src = src;
    img.id = id;
    img.style.display = 'none';
    document.body.appendChild(img);
  };

  createImageElement(svgToDataURL(driverMarkerSvg), 'driver-marker-fallback');
  createImageElement(svgToDataURL(taskMarkerSvg), 'task-marker-fallback');
}

// Call this function to ensure marker icons are available
createDefaultMarkerIcons();
