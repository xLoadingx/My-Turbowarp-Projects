const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECTS_PATH = './projects.html';
const PROJECTS_DIR = './projects';
const GIT_USER_NAME = 'github-actions[bot]';
const GIT_USER_EMAIL = 'github-actions[bot]@users.noreply.github.com';

// Function to generate the projects list
const generateProjectsList = () => {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`The directory ${PROJECTS_DIR} does not exist.`);
    return '';
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter(file => file.endsWith('.html'));

  let projectsList = '';
  files.forEach(file => {
    const projectName = path.basename(file, '.html');
    projectsList += `<a href="${PROJECTS_DIR}/${file}" class="link glass">${projectName}</a>\n`;
  });

  return projectsList;
};

// Function to generate the projects.html content
const generateProjectsHTML = () => {
  const projectsList = generateProjectsList();

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projects</title>
  <style>
    /* Gradient background */
    body {
      background: linear-gradient(45deg, #ff9a9e, #fad0c4);
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      height: 100vh;
      font-size: calc(1rem + 0.5vw); /* Responsive font size */
    }

    /* Glass effect */
    .glass {
      background: rgba(255, 105, 180, 0.21);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(13.4px);
      -webkit-backdrop-filter: blur(13.4px);
      border: 1px solid rgba(255, 105, 180, 0.35);
      transition: transform 0.3s ease, background 0.3s ease;
    }

    /* Sidebar styles */
    .sidebar {
      width: 10vw; /* Responsive width */
      min-width: 150px;
      max-width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1vh;
      box-sizing: border-box;
      margin-right: 2vw;
    }

    .sidebar a {
      color: white;
      font-family: Arial, sans-serif;
      font-size: 1.2em; /* Responsive font size */
      border: 1px solid rgba(255, 105, 180, 0.35);
      outline: none;
      cursor: pointer;
      padding: 1em 1.5em; /* Responsive padding */
      width: 100%;
      margin: 0.5em 0;
      border-radius: 8px;
      box-sizing: border-box; /* Ensures padding is included in width calculation */
      text-align: center;
      text-decoration: none; /* Removes underline from links */
      display: inline-block;
    }

    .sidebar a:hover {
      transform: scale(1.05);
      background: rgba(255, 105, 180, 0.4);
    }

    /* Main content styles */
    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2vh 2vw;
      box-sizing: border-box;
    }

    /* Header styles */
    .header {
      font-family: Arial, sans-serif;
      font-size: 3em; /* Responsive font size */
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      -webkit-text-stroke: 1px black;
      margin: 2vh 0;
    }

    /* Content styles */
    .content {
      font-family: Arial, sans-serif;
      font-size: 1.5em; /* Responsive font size */
      color: white;
      text-align: center;
      background: rgba(255, 105, 180, 0.21);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(13.4px);
      -webkit-backdrop-filter: blur(13.4px);
      border: 1px solid rgba(255, 105, 180, 0.35);
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      max-width: 800px;
    }

    .projects-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }

    .link {
      color: white;
      text-decoration: none;
      border: 1px solid rgba(255, 105, 180, 0.35);
      border-radius: 8px;
      padding: 10px 20px;
      margin: 10px 0;
      display: inline-block;
      background: rgba(255, 105, 180, 0.4);
      transition: transform 0.3s ease, background 0.3s ease;
      flex: 1 1 200px; /* Flexible item with a minimum width */
      box-sizing: border-box;
      text-align: center;
    }

    .link:hover {
      transform: scale(1.05);
      background: rgba(255, 105, 180, 0.6);
    }

  </style>
</head>
<body>
  <!-- Sidebar element with glass effect -->
  <div class="sidebar glass">
    <a href="index.html" class="glass">Home</a>
    <a href="https://github.com/xLoadingx" class="glass">GitHub Profile</a>
    <a href="https://github.com/xLoadingx/All-My-Stuff" class="glass">Original Repo</a>
  </div>

  <!-- Main content area -->
  <div class="main-content">
    <!-- Header element with the specified class -->
    <div class="header">My Projects</div>

    <!-- Content section -->
    <div class="content">
      <p>Welcome to my projects page! Here you'll find some of the cool things I've been working on.</p>
      <div class="projects-container">
        ${projectsList}
      </div>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(PROJECTS_PATH, htmlContent);

  // Set Git user configuration locally
  execSync(`git config --local user.name "${GIT_USER_NAME}"`);
  execSync(`git config --local user.email "${GIT_USER_EMAIL}"`);

  // Add changes to git staging area
  execSync('git add projects.html');

  // Commit changes
  execSync('git commit -m "Update projects.html with generated content"');

  // Push changes to remote repository
  execSync('git push');
};

// Generate the projects.html file
generateProjectsHTML();
