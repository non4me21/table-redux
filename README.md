
# Users Table - React + Redux Project

This is a simple React and Redux project that displays a users table with filtering capabilities on each column field. The table allows you to search by ID, Name, Username, Email, and Phone Number. The project is fully responsive and works seamlessly on mobile devices.

## Features
- **Column-wise Filtering**: Search within each column (ID, Name, Username, Email, Phone Number) using input fields.
- **Real-Time Updates**: The table updates in real-time as you type in the filters.
- **Responsive Design**: The layout is fully responsive and adapts well on mobile screens.
- **API Delay Toggle**: A switch to simulate API delay during filtering.
- **Clear Filters Button**: Quickly reset all filters and return to the default view.
  
## Technologies Used
- **React**: Frontend framework for building user interfaces.
- **Redux**: For state management, handling the table data, and managing filter states.
- **CSS**: Styled for responsiveness and clean design.
- **Vercel**: Deployed live for testing.

## Demo
You can test the live version of this project here:  
[Live Demo](https://tableredux-mocha.vercel.app/)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/non4me21/table-redux.git
   cd table-redux
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` to view the app.

## Usage

- Filter the table by entering text in the search boxes under each column.
- Toggle the "API Delay" switch to simulate a delay in data filtering.
- Use the "Clear filters" button to reset all search fields.
