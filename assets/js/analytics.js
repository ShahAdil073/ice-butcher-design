// Document Ready Event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Charts
  initTasksStatusChart();
  initTotalTasksChart();
  initAgentStatusChart();
  initDistanceProductivityChart();
  initTimeProductivityChart();

  // Time Filter Dropdown
  const timeFilterBtn = document.querySelector('.time-filter-btn');
  if (timeFilterBtn) {
    timeFilterBtn.addEventListener('click', function() {
      // Here would typically go the logic to show a dropdown
      console.log('Time filter clicked:', this.textContent.trim());
    });
  }

  // Card Header Dropdown Toggles
  const cardHeaders = document.querySelectorAll('.card-header');
  cardHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // Here would typically go the logic to expand/collapse a card
      console.log('Card header clicked:', this.textContent.trim());
    });
  });
});

// Initialize Tasks Status Chart (Doughnut)
function initTasksStatusChart() {
  const ctx = document.getElementById('tasksStatusChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Accepted', 'Assigned', 'Unassigned'],
      datasets: [{
        data: [7, 4, 3],
        backgroundColor: [
          '#13294B', // Dark blue for Accepted
          '#92C3F0', // Light blue for Assigned
          '#E0E0E0'  // Grey for Unassigned
        ],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#13294B',
          titleFont: {
            family: 'Inter',
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: 'Inter',
            size: 12
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: false
        }
      }
    }
  });
}

// Initialize Total Tasks Chart (Line)
function initTotalTasksChart() {
  const ctx = document.getElementById('totalTasksChart');
  if (!ctx) return;

  const data = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [{
      label: 'Tasks',
      data: [1, 2, 1, 3, 2, 2, 2],
      fill: false,
      borderColor: '#13294B',
      tension: 0.4,
      pointBackgroundColor: '#13294B',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4
    }]
  };

  // Add point annotations
  const annotations = {};
  data.labels.forEach((label, index) => {
    if (data.datasets[0].data[index] === 5) {
      annotations[`point-${index}`] = {
        type: 'point',
        xValue: index,
        yValue: data.datasets[0].data[index],
        backgroundColor: '#1E88E5',
        borderColor: '#fff',
        borderWidth: 2,
        radius: 8,
        label: {
          content: '5 Task',
          enabled: true,
          position: 'top',
          backgroundColor: '#13294B',
          color: '#fff',
          font: {
            family: 'Inter',
            size: 12,
            weight: 'bold'
          },
          padding: {
            top: 5,
            bottom: 5,
            left: 10,
            right: 10
          },
          borderRadius: 4
        }
      };
    }
  });

  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            font: {
              family: 'Inter',
              size: 12
            }
          },
          grid: {
            color: '#f0f0f0'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        annotation: {
          annotations: annotations
        },
        tooltip: {
          backgroundColor: '#13294B',
          titleFont: {
            family: 'Inter',
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: 'Inter',
            size: 12
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: false
        }
      }
    }
  });
}

// Initialize Agent Status Chart (Bar)
function initAgentStatusChart() {
  const ctx = document.getElementById('agentStatusChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['', '', '', '', '', '', ''],
      datasets: [
        {
          label: 'Busy',
          data: [54, 0, 110, 0, 50, 0, 0],
          backgroundColor: '#13294B',
          barPercentage: 0.5,
          categoryPercentage: 0.7
        },
        {
          label: 'Free',
          data: [0, 42, 0, 23, 0, 0, 0],
          backgroundColor: '#92C3F0',
          barPercentage: 0.5,
          categoryPercentage: 0.7
        },
        {
          label: 'Inactive',
          data: [0, 75, 0, 87, 0, 0, 0],
          backgroundColor: '#E0E0E0',
          barPercentage: 0.5,
          categoryPercentage: 0.7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 120,
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            }
          },
          grid: {
            color: '#f0f0f0'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#13294B',
          titleFont: {
            family: 'Inter',
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: 'Inter',
            size: 12
          },
          padding: 12,
          cornerRadius: 8
        }
      }
    }
  });
}

// Initialize Distance Productivity Chart (Mini Bar Chart)
function initDistanceProductivityChart() {
  const ctx = document.getElementById('distanceProductivityChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
      datasets: [{
        data: [30, 70, 40, 50, 20, 60, 80, 40, 60, 70, 30, 50],
        backgroundColor: '#ffffff',
        barPercentage: 0.8,
        categoryPercentage: 0.9
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          display: false,
          beginAtZero: true
        },
        x: {
          display: false
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });
}

// Initialize Time Productivity Chart (Mini Line Chart)
function initTimeProductivityChart() {
  const ctx = document.getElementById('timeProductivityChart');
  if (!ctx) return;

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 100);
  gradient.addColorStop(0, 'rgba(30, 136, 229, 0.2)');
  gradient.addColorStop(1, 'rgba(30, 136, 229, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array(20).fill(''),
      datasets: [{
        data: [20, 30, 25, 40, 35, 55, 45, 60, 40, 70, 60, 75, 65, 80, 65, 90, 80, 95, 85, 100],
        borderColor: '#1E88E5',
        backgroundColor: gradient,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          display: false,
          beginAtZero: true
        },
        x: {
          display: false
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });
}
