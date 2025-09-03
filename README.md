# AI Smart Prompt Improver

An intelligent application that refines your initial app ideas into detailed prompts, suggests customizable features, and generates UI design mockups based on your selections.

## Features

-   **AI-Powered Prompt Refinement:** Enter a simple idea, and the AI will transform it into a detailed, structured prompt suitable for generating high-quality UI mockups.
-   **Dynamic Feature Suggestions:** Based on your refined prompt, the app intelligently suggests relevant feature categories (e.g., Authentication, Data Display, User Profiles).
-   **Customizable Options:** For each feature category, choose from several distinct options to tailor the app's functionality to your vision.
-   **Multi-Screen UI Generation:** Generates a suite of essential UI mockups, including a Splash Screen, Login Screen, Home Dashboard, and more.
-   **Responsive and Clean UI:** A modern, intuitive interface that guides you through the process seamlessly.

## How It Works: A Step-by-Step Guide

Here’s how you can go from a raw idea to a set of beautiful UI mockups in just a few steps.

### Step 1: Share Your Idea

1.  On the main screen, you'll find a text box.
2.  Type in your raw application idea. For example, *"an app for tracking personal fitness goals."*
3.  Click the **"Improve My Prompt"** button.

### Step 2: Review the Improved Prompt & Select Features

1.  The AI will process your idea and present a more detailed, "improved" prompt at the top of the screen.
2.  Below the prompt, you will see several feature categories suggested by the AI (e.g., "User Authentication", "Dashboard Style").
3.  For each category, select the radio button that best fits your desired functionality (e.g., choose "Email & Password Login" over "Social Media Login"). Make a selection for each category.

### Step 3: Generate the UI Mockups

1.  Once you are happy with your feature selections, click the **"Proceed to Generation"** button at the bottom.
2.  The application will now use your improved prompt and selected features to generate UI mockups. This process may take a minute, so a loading indicator will be displayed with messages about the progress.

### Step 4: View and Analyze Your Mockups

1.  When the generation is complete, a gallery will appear displaying the generated UI mockups for various standard screens like "Splash Screen," "Home / Dashboard," "Settings," etc.
2.  You can review these designs to visualize your app concept.

### Step 5: Start a New Project

-   To begin again with a new idea, simply click the **"Start Over"** button. This will reset the application to its initial state.

## Technology Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI/ML:** Google Gemini API (`gemini-2.5-flash` for text/logic, `imagen-4.0-generate-001` for images)
