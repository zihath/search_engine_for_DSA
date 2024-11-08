function toggleFilter1() {
    const filterContainer = document.getElementById("filterContainer1");
    filterContainer.style.display = filterContainer.style.display === "none" ? "block" : "none";
}

function toggleFilter2() {
    const filterContainer = document.getElementById("filterContainer2");
    filterContainer.style.display = filterContainer.style.display === "none"   
   ? "block" : "none";
}


function filterTags() {
    const selectedTags = Array.from(document.querySelectorAll('input[name="tag"]:checked')).map(el => el.value);

    const rows = document.querySelectorAll('#problemTable tbody tr');

    rows.forEach(row => {
        const tagsCell = row.querySelector('.tags-cell');
        const tags = tagsCell ? tagsCell.textContent.split(',').map(tag => tag.trim()) : [];

        // Check if any of the selected tags match the tags in the row
        const matches = selectedTags.length === 0 || selectedTags.some(tag => tags.includes(tag));
        row.style.display = matches ? '' : 'none';
    });
}

function filterplatforms() {
    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(el => el.value);
  
    const rows = document.querySelectorAll('#problemTable tbody tr');
  
    rows.forEach(row => {
      const platformCell = row.querySelector('.platform-cell');
      const platforms = platformCell ? platformCell.textContent.split(',').map(platform => platform.trim()) : [];
  
      // Check if any of the selected platforms match the platforms in the row
      const matches = selectedPlatforms.length === 0 || selectedPlatforms.some(platform => platforms.includes(platform));
      row.style.display = matches ? '' : 'none';
    });
}

