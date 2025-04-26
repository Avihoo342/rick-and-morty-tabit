🌀 RickAndMortyTabit
A fun and interactive web application to explore characters from the Rick and Morty universe, built using Angular 19. The app features advanced filtering, infinite scrolling, and responsive design for an engaging user experience.

🚀 Features
Character Browser: Explore characters with detailed information.

Advanced Filtering: Real-time filtering by name and status.

Infinite Scrolling: Automatically load content as you scroll.

Responsive Design: Works seamlessly on desktop and mobile.

Retry Mechanism: Handles API rate limits and retries intelligently.

🛠️ Technology Stack
Framework: Angular (v19)

UI Library: Angular Material

Core Modules: Reactive Forms, HTTP Client, Infinite Scroll

Backend API: Rick and Morty API

🎉 Getting Started
Prerequisites
Ensure the following tools are installed:

Node.js (LTS recommended)

Angular CLI: Install with:

bash
Copy
Edit
npm install -g @angular/cli
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/RickAndMortyTabit.git
cd RickAndMortyTabit
Install dependencies:

bash
Copy
Edit
npm install
🚀 Development
Run the development server:

bash
Copy
Edit
ng serve
Navigate to http://localhost:4200/. The application will reload automatically as you edit the source files.

📦 Build
Create a production build:

bash
Copy
Edit
ng build --prod
The output will be available in the dist/ directory.

✅ Testing
Unit Tests
Run unit tests with Karma:

bash
Copy
Edit
ng test
End-to-End Tests
Run end-to-end tests (install an e2e library if needed):

bash
Copy
Edit
ng e2e
📖 Code Generation
Use Angular CLI to generate components, services, and more:

bash
Copy
Edit
ng generate component component-name
ng generate service service-name
For more commands, check out the Angular CLI Documentation.

🛠️ Troubleshooting & Tips
API Issues: Automatically handles 404 and 429 errors with retries or user-friendly messages.

Infinite Scrolling: Scroll to the bottom to load more characters dynamically.

Filter Updates: Filters refresh the character list in real time.

🤝 Contributing
We welcome contributions! Here's how you can get started:

Fork the repository.

Create a new branch:

bash
Copy
Edit
git checkout -b feature/your-feature-name
Commit your changes:

bash
Copy
Edit
git commit -m "Add some feature"
Push the branch:

bash
Copy
Edit
git push origin feature/your-feature-name
Open a Pull Request.
