# Personal Portfolio Website with Academic Planner

A responsive personal portfolio website developed as part of the CSC 106 project at Miva Open University. The website showcases personal information, projects, interests and includes an integrated academic planner for managing academic tasks.

## Live Website

[View Published Website](https://md-129-student-portfolio.netlify.app/)

## GitHub Repository

[View Source Code](https://github.com/MD-129/student-portfolio-website2.0)

## Project Overview

This project combines a personal portfolio with a functional academic planner. It was designed to provide visitors with information about the developer while demonstrating practical front-end web development skills.

The website features a clean, responsive interface and interactive elements implemented using HTML, CSS and JavaScript.

## Features

- **Home Page:** Introduces the developer and provides navigation to other sections.
- **About Page:** Presents personal information, background and interests.
- **Projects Page:** Displays selected projects and portfolio work.
- **Academic Planner:** Allows users to create, complete, filter and delete academic tasks.
- **Calendar:** Provides a calendar interface for viewing task deadlines.
- **Task Statistics:** Displays the total number of tasks, completed tasks and pending tasks.
- **Contact Form:** Allows visitors to submit messages through an integrated contact form.
- **Responsive Design:** Adapts the website layout to different screen sizes.

## Technologies Used

- **HTML5:** Provides the structure and content of the website.
- **CSS3:** Handles styling, layout and responsive design.
- **JavaScript:** Implements interactive features and application logic.
- **Local Storage:** Stores academic planner tasks in the browser.
- **Web3Forms:** Handles contact form submissions.
- **GitHub Pages:** Used to publish the website.

## Project Structure

The project is organised into separate HTML, CSS, JavaScript and asset files to make the code easier to maintain.

```text
student-portfolio-website2.0/
│
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
│
├── css/
│   └── Stylesheet files
│
├── js/
│   └── JavaScript files
│
├── images/
│   └── Website images and graphics
│
└── README.md
```

*Note: The directory structure above is a simplified overview. Refer to the repository for the complete file organisation.*

## Running the Project Locally

1. Download or clone the repository.
2. Extract the project files if downloaded as a ZIP archive.
3. Open the project folder in Visual Studio Code.
4. Open `index.html` in a browser or use the Live Server extension.
5. Navigate through the website using the navigation menu.

## Academic Planner Storage

The academic planner uses the browser's Local Storage API to retain tasks between page reloads.

Since the application uses browser-based storage, saved tasks are associated with the browser and device where they were created. They are not automatically synchronised across devices.

## Contact Form

The contact form uses Web3Forms to process submitted messages. A valid submission is forwarded to the configured recipient email address.

## Deployment

The website was deployed using GitHub Pages.

**Published URL:**  
https://md-129-student-portfolio.netlify.app/
## Project Information

| Detail | Information |
|---|---|
| Institution | Miva Open University |
| Course Code | COS 106 |
| Project Type | Personal Portfolio Website |
| Developer | Moyosoluwa Davies |
| Academic Session | 2026 |

---

*Developed as an academic project to demonstrate practical knowledge of front-end web development.*
