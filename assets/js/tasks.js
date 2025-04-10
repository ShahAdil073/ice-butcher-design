document.addEventListener('DOMContentLoaded', function() {
  // View toggle functionality
  const viewOptions = document.querySelectorAll('.view-option');

  viewOptions.forEach(option => {
    option.addEventListener('click', function() {
      viewOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');

      const viewType = this.textContent.trim().includes('Map') ? 'map' : 'list';
      toggleView(viewType);
    });
  });

  // Modal functionality
  const createTaskBtn = document.querySelector('.create-task-btn');
  const addTaskModal = document.getElementById('addTaskModal');
  const closeBtn = addTaskModal.querySelector('.close-btn');
  const cancelBtn = addTaskModal.querySelector('.cancel-btn');

  if (createTaskBtn) {
    createTaskBtn.addEventListener('click', function() {
      addTaskModal.classList.add('show');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      addTaskModal.classList.remove('show');
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      addTaskModal.classList.remove('show');
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === addTaskModal) {
      addTaskModal.classList.remove('show');
    }
  });

  // Task type toggle
  const taskTypeButtons = document.querySelectorAll('.task-type-btn');

  taskTypeButtons.forEach(button => {
    button.addEventListener('click', function() {
      taskTypeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Agent action buttons
  const agentActionButtons = document.querySelectorAll('.agent-action-btn');

  agentActionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.querySelector('i').classList.contains('fa-phone') ? 'call' : 'track';

      if (action === 'call') {
        // In a real app, this would initiate a call
        alert('Calling agent...');
      } else {
        // In a real app, this would focus the map on the agent
        alert('Tracking agent on map...');

        // Find and center on the agent marker (placeholder)
        const agentName = this.closest('.task-agent').querySelector('.agent-name').textContent;
        centerMapOnAgent(agentName);
      }
    });
  });

  // Filter buttons functionality
  const dateFilterBtn = document.querySelector('.date-filter-btn');
  const teamFilterBtn = document.querySelector('.team-filter-btn');
  const agentFilterBtn = document.querySelector('.agent-filter-btn');

  if (dateFilterBtn) {
    dateFilterBtn.addEventListener('click', function() {
      // In a real app, this would open a date picker
      alert('Date filter options would appear here');
    });
  }

  if (teamFilterBtn) {
    teamFilterBtn.addEventListener('click', function() {
      // In a real app, this would open a team selection dropdown
      alert('Team filter options would appear here');
    });
  }

  if (agentFilterBtn) {
    agentFilterBtn.addEventListener('click', function() {
      // In a real app, this would open an agent selection dropdown
      alert('Agent filter options would appear here');
    });
  }
});

// Toggle between map and list view
function toggleView(viewType) {
  const mapTasksContainer = document.querySelector('.map-tasks-container');

  if (viewType === 'map') {
    // Already in map view, nothing to change
    console.log('Switched to map view');
  } else {
    window.location.href = 'dashboard-list.html';
  }
}

// Center the map on a specific agent (placeholder implementation)
function centerMapOnAgent(agentName) {
  // In a real app, this would find the agent's marker and center the map
  console.log(`Centering map on agent: ${agentName}`);
}

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

    // Add task markers
    addTaskMarkers(map);

    // Add agent markers
    addAgentMarkers(map);
  }
}

// Add task markers to the map
function addTaskMarkers(map) {
  // Sample task locations - in a real app, this would come from API
  const taskLocations = [
    { lat: 25.7617, lng: -80.1918, title: "Task 1", id: "#552496708" },
    { lat: 25.8000, lng: -80.2000, title: "Task 2", id: "#552496708" },
    { lat: 25.7700, lng: -80.1800, title: "Task 3", id: "#552496708" },
    { lat: 25.7900, lng: -80.2100, title: "Task 4", id: "#552496708" }
  ];

  taskLocations.forEach(location => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#0F3460",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      },
    });

    // Add click event to marker
    marker.addListener('click', function() {
      // In a real app, this would show task details
      alert(`Task details for ${location.id}`);
    });
  });
}

// Add agent markers to the map
function addAgentMarkers(map) {
  // Sample agent locations - in a real app, this would come from API
  const agentLocations = [
    { lat: 25.7630, lng: -80.1940, name: "Sebastian Nelson", id: 1 },
    { lat: 25.8010, lng: -80.2010, name: "Angel Ponces", id: 2 }
  ];

  agentLocations.forEach(agent => {
    const marker = new google.maps.Marker({
      position: { lat: agent.lat, lng: agent.lng },
      map: map,
      title: agent.name,
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

    // Add click event to marker
    marker.addListener('click', function() {
      // In a real app, this would show agent details
      alert(`Agent details for ${agent.name}`);
    });

    // Store marker reference for later use
    window[`agentMarker${agent.id}`] = marker;
  });
}
