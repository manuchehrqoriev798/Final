# Random User Profile Generator

A React-based web application that generates random user profiles with detailed information using the RandomUser.me API. The application features a modern, dark-themed UI with interactive filters and data export capabilities.

![React Logo](path/to/your/react-logo.png)

## Features

- 🎨 Modern dark theme UI with golden accents
- 👤 Random user profile generation
- 📑 Tabbed information display:
  - Basic Info (Phone, Email, Age)
  - Location Details
  - Login Information
- 🔍 Advanced filtering options:
  - Gender selection
  - Nationality filtering
  - Age range specification
- ⬇️ Export functionality:
  - Download user profile as text file
  - Includes full name, gender, age, contact info
  - Location details and nationality
  - Automatic filename generation using user's name
  - Clean, formatted text output
- 🔄 Instant profile refresh
- 📱 Responsive design for all devices
- ✨ Smooth animations and transitions
- 🎯 Interactive error handling with humorous messages

## Technologies Used

- React 17.0.2
- Bootstrap 5.1.3
- Reactstrap 8.10.1
- Axios for API requests
- React Icons
- CSS3 with custom animations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/random-user-profile.git
```

2. Navigate to the project directory:
```bash
cd random-user-profile
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

- Click "Refresh User" to generate a new random profile
- Use the "Show Filters" button to access filtering options
- Navigate through different information tabs
- Download user information using the "Download Info" button
- Adjust age range and other filters to customize results

## API Integration

This project uses the [RandomUser.me API](https://randomuser.me/) to generate random user profiles. The API provides various parameters for filtering results, including:
- Gender
- Nationality
- Age range (implemented through client-side filtering)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [RandomUser.me API](https://randomuser.me/) for providing the random user data
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
- [Reactstrap](https://reactstrap.github.io/) for Bootstrap components
