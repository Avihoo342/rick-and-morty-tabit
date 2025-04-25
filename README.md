RickAndMortyTabit
A fun and interactive web application to explore characters from the Rick and Morty universe, built using Angular. This project leverages Angular 19, advanced filtering capabilities, and infinite scrolling for a seamless user experience.

🚀 Features
Character Browser: Discover characters from the Rick and Morty universe with detailed information.

Advanced Filtering: Filter characters by name and status in real time.

Infinite Scrolling: Effortlessly browse through the character list with automatic content loading.

Responsive Design: Optimized for both desktop and mobile devices.

Retry Mechanism: Automatically handles API rate limits and retries for better reliability.

🛠️ Technology Stack
Framework: Angular (v19)

UI Library: Angular Material

Modules: Reactive Forms, HTTP Client, Infinite Scroll

Backend: Rick and Morty API

🎉 Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (LTS version recommended)

Angular CLI (npm install -g @angular/cli)

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
Start the development server:

bash
Copy
Edit
ng serve
Navigate to http://localhost:4200/. The application will automatically reload if you make any changes to the source files.

📦 Build
Generate a production-ready build:

bash
Copy
Edit
ng build --prod
The build artifacts will be output to the dist/ directory.

✅ Testing
Unit Tests
Run unit tests with Karma:

bash
Copy
Edit
ng test
End-to-End Tests
Run e2e tests using a compatible testing framework:

bash
Copy
Edit
ng e2e
(Install an e2e testing library if not already configured.)

📖 Code Generation
Generate Angular components, directives, pipes, services, and more using the Angular CLI:

bash
Copy
Edit
ng generate component component-name
ng generate service service-name
For a complete list of available commands, visit the Angular CLI Documentation.

🛠️ Troubleshooting & Tips
API Issues: The app handles 404 and 429 errors gracefully by retrying requests or showing user-friendly messages.

Infinite Scrolling: Scroll to the bottom of the page to load more characters automatically.

Filter Updates: Update filters in real time, and the app will refresh the character list dynamically.

🤝 Contributing
Contributions are welcome! To get started:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Commit your changes (git commit -m "Add some feature").

Push to the branch (git push origin feature/your-feature-name).

Open a pull request.
