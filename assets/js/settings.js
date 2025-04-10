// Document Ready Event
document.addEventListener('DOMContentLoaded', function() {
  // Settings Navigation
  setupSettingsNavigation();

  // Toggle Switches
  setupToggleSwitches();

  // Collapsible Sections
  setupCollapsibleSections();

  // Add Role Button
  setupAddRoleModal();

  // Task Type Tabs
  setupTaskTypeTabs();

  // Dropdowns
  setupDropdowns();

  // Update Buttons
  setupUpdateButtons();
});

// Settings Navigation Setup
function setupSettingsNavigation() {
  const navLinks = document.querySelectorAll('.settings-nav a');
  const sections = document.querySelectorAll('.settings-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach(navLink => {
        navLink.parentElement.classList.remove('active');
      });

      // Add active class to clicked link
      this.parentElement.classList.add('active');

      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
      });

      // Show target section
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

// Toggle Switches Setup
function setupToggleSwitches() {
  const toggleSwitches = document.querySelectorAll('.toggle-switch');

  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
}

// Collapsible Sections Setup
function setupCollapsibleSections() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');

      // Toggle icon
      const icon = this.querySelector('i');
      if (icon) {
        if (this.classList.contains('active')) {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-down');
        } else {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-right');
        }
      }

      // Toggle content
      const content = this.nextElementSibling;
      if (content) {
        if (this.classList.contains('active')) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      }
    });
  });
}

// Add Role Modal Setup
function setupAddRoleModal() {
  const addRoleBtn = document.querySelector('.add-role-btn');
  const closeBtn = document.querySelector('#addRoleModal .close-btn');
  const cancelBtn = document.querySelector('#addRoleModal .cancel-btn');
  const modal = document.getElementById('addRoleModal');

  if (addRoleBtn && modal) {
    addRoleBtn.addEventListener('click', function() {
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
}

// Task Type Tabs Setup
function setupTaskTypeTabs() {
  const taskTypeTabs = document.querySelectorAll('.task-type-tab');

  taskTypeTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      taskTypeTabs.forEach(t => t.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // You could update the preview here based on selected tab
    });
  });
}

// Dropdowns Setup
function setupDropdowns() {
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');

  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // You would typically show a dropdown menu here
      // For simplicity, we'll just log a message
      console.log('Dropdown clicked:', this.textContent.trim());
    });
  });
}

// Update Buttons Setup
function setupUpdateButtons() {
  const updateBtns = document.querySelectorAll('.update-btn');

  updateBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // You would typically handle the update here
      // For simplicity, we'll just show an alert
      alert('Settings updated successfully!');
    });
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

// Handle Search Functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const tableRows = document.querySelectorAll('.roles-table tbody tr');

    tableRows.forEach(row => {
      const roleId = row.querySelector('td:first-child').textContent.toLowerCase();
      const roleName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

      if (roleId.includes(searchTerm) || roleName.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// Pagination Handling
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const pageNumbers = document.querySelectorAll('.page-number');

if (prevPageBtn && nextPageBtn && pageNumbers.length > 0) {
  prevPageBtn.addEventListener('click', function() {
    const activePage = document.querySelector('.page-number.active');
    const activeIndex = Array.from(pageNumbers).indexOf(activePage);

    if (activeIndex > 0) {
      activePage.classList.remove('active');
      pageNumbers[activeIndex - 1].classList.add('active');
    }
  });

  nextPageBtn.addEventListener('click', function() {
    const activePage = document.querySelector('.page-number.active');
    const activeIndex = Array.from(pageNumbers).indexOf(activePage);

    if (activeIndex < pageNumbers.length - 1) {
      activePage.classList.remove('active');
      pageNumbers[activeIndex + 1].classList.add('active');
    }
  });

  pageNumbers.forEach(pageNumber => {
    pageNumber.addEventListener('click', function() {
      pageNumbers.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
