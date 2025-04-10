document.addEventListener('DOMContentLoaded', function() {
  // Toggle action menu
  const actionButtons = document.querySelectorAll('.action-btn');
  actionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();

      // Close any open action menus
      const openMenus = document.querySelectorAll('.action-menu');
      openMenus.forEach(menu => {
        if (menu !== e.target.nextElementSibling) {
          menu.remove();
        }
      });

      // Create and toggle the action menu
      const hasMenu = button.parentElement.querySelector('.action-menu');

      if (hasMenu) {
        hasMenu.remove();
      } else {
        const menu = document.createElement('div');
        menu.className = 'action-menu';

        const actions = [
          { name: 'View Details', icon: 'eye' },
          { name: 'Edit', icon: 'edit' },
          { name: 'Delete', icon: 'trash-alt', class: 'text-danger' }
        ];

        actions.forEach(action => {
          const item = document.createElement('div');
          item.className = `action-item ${action.class || ''}`;
          item.innerHTML = `<i class="fas fa-${action.icon}"></i> ${action.name}`;

          item.addEventListener('click', function() {
            alert(`Action: ${action.name}`);
            menu.remove();
          });

          menu.appendChild(item);
        });

        button.parentElement.appendChild(menu);

        // Position the menu
        const buttonRect = button.getBoundingClientRect();
        menu.style.top = `${buttonRect.bottom + window.scrollY}px`;
        menu.style.right = `20px`;
      }
    });
  });

  // Close action menu when clicking elsewhere
  document.addEventListener('click', function() {
    const openMenus = document.querySelectorAll('.action-menu');
    openMenus.forEach(menu => menu.remove());
  });

  // Pagination functionality
  const prevPageBtn = document.querySelector('.prev-page');
  const nextPageBtn = document.querySelector('.next-page');
  const pageNumbers = document.querySelectorAll('.page-number');

  if (prevPageBtn && nextPageBtn && pageNumbers.length) {
    let currentPage = 1;

    prevPageBtn.addEventListener('click', function() {
      if (currentPage > 1) {
        navigateToPage(currentPage - 1);
      }
    });

    nextPageBtn.addEventListener('click', function() {
      if (currentPage < pageNumbers.length) {
        navigateToPage(currentPage + 1);
      }
    });

    pageNumbers.forEach((button, index) => {
      button.addEventListener('click', function() {
        navigateToPage(index + 1);
      });
    });

    function navigateToPage(pageNum) {
      currentPage = pageNum;

      // Update active page
      pageNumbers.forEach((button, index) => {
        if (index + 1 === currentPage) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });

      // Update buttons state
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage === pageNumbers.length;

      // In a real application, you would fetch the data for the page here
      // fetchPageData(currentPage);
    }

    // Initialize
    navigateToPage(1);
  }

  // Search functionality
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('.routes-table tbody tr');

      rows.forEach(row => {
        const routeId = row.querySelector('td:first-child').textContent.toLowerCase();
        const agentName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Check if the search term matches route ID or agent name
        if (routeId.includes(searchTerm) || agentName.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
});
