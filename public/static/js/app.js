// Generalized toggle function for any container and toggle button
function toggleFilter(containerId, buttonId) {
    const filterContainer = document.getElementById(containerId);
    const isHidden = filterContainer.style.display === "none";
    filterContainer.style.display = isHidden ? "block" : "none";

    // Only add/remove the event listener based on the visibility of the container
    if (isHidden) {
        document.addEventListener("click", (event) => closeFilterForm(event, containerId, buttonId));
    } else {
        document.removeEventListener("click", (event) => closeFilterForm(event, containerId, buttonId));
    }
}

// Generalized close function for any container and toggle button
function closeFilterForm(event, containerId, buttonId) {
    const filterContainer = document.getElementById(containerId);
    const toggleButton = document.getElementById(buttonId);

    // Check if the click is outside the specified form container and toggle button
    if (!filterContainer.contains(event.target) && event.target !== toggleButton) {
        filterContainer.style.display = "none";
        document.removeEventListener("click", (event) => closeFilterForm(event, containerId, buttonId));
    }
}


// Filter tags based on selected checkboxes
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



// function toggleFilter2() {
//     const filterContainer = document.getElementById("filterContainer2");
//     filterContainer.style.display = filterContainer.style.display === "none"   
//    ? "block" : "none";
// }


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

