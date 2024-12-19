import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Button, Input, FormGroup, Label, Card } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import ProfileCard from './components/ProfileCard'
import { FaRedo, FaFilter, FaDownload } from 'react-icons/fa'

function App() {
    const [details, setDetails] = useState({});
    const [gender, setGender] = useState('any');
    const [nationality, setNationality] = useState('');
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(80);
    const [showFilters, setShowFilters] = useState(false);
    const [ageError, setAgeError] = useState('');

    const errorMessages = [
        "Math called, it wants its logic back! 🤔",
        "Unless you've discovered time travel, this age range is impossible! ⏰",
        "Even my calculator is laughing at these numbers! 🧮",
        "Did you learn math in a circus? 🤡 That's not how numbers work!"
    ];

    const getRandomErrorMessage = () => {
        const randomIndex = Math.floor(Math.random() * errorMessages.length);
        return errorMessages[randomIndex];
    };

    const handleMinAgeChange = (e) => {
        const value = e.target.value;
        const newMinAge = value === '' ? '' : Number(value);
        setMinAge(newMinAge);
        
        if (newMinAge !== '' && maxAge !== '' && newMinAge >= maxAge) {
            setAgeError(getRandomErrorMessage());
        } else {
            setAgeError('');
        }
    };

    const handleMaxAgeChange = (e) => {
        const value = e.target.value;
        const newMaxAge = value === '' ? '' : Number(value);
        setMaxAge(newMaxAge);
        
        if (minAge !== '' && newMaxAge !== '' && minAge >= newMaxAge) {
            setAgeError(getRandomErrorMessage());
        } else {
            setAgeError('');
        }
    };

    const fetchFromAPI = async () => {
        if (minAge !== '' && maxAge !== '' && minAge >= maxAge) {
            setAgeError(getRandomErrorMessage());
            return;
        }
        
        try {
            let url = 'https://randomuser.me/api/';
            const params = [];
            
            if (gender !== 'any') {
                params.push(`gender=${gender}`);
            }
            if (nationality) {
                params.push(`nat=${nationality}`);
            }
            
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            
            const { data } = await Axios.get(url);
            const user = data.results[0];
            
            // Check if user age is within the specified range
            if (user.dob.age >= minAge && user.dob.age <= maxAge) {
                setDetails(user);
            } else {
                // If age doesn't match, fetch again
                fetchFromAPI();
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const downloadUserInfo = () => {
        if (!details || !details.name) return;

        // Create formatted text content
        const userInfo = `User Information:
Name: ${details.name.first} ${details.name.last}
Gender: ${details.gender}
Age: ${details.dob.age}
Email: ${details.email}
Phone: ${details.phone}
Location: ${details.location.city}, ${details.location.country}
Nationality: ${details.nat}`;

        // Create blob and download link
        const blob = new Blob([userInfo], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${details.name.first}${details.name.last}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        fetchFromAPI()
    }, [])

    return (
        <Container fluid className="p-4 bg-dark App">
            <Row>
                <Col md={4} className="offset-md-4">
                    <div className="text-center mb-4">
                        <Button 
                            className="filter-toggle-btn"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </div>

                    {showFilters && (
                        <Card className="filter-controls mb-4">
                            <div className="filter-grid">
                                <FormGroup>
                                    <Label for="gender" className="text-gold">Gender</Label>
                                    <Input
                                        type="select"
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="dark-select"
                                    >
                                        <option value="any">Any</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="nationality" className="text-gold">Nationality</Label>
                                    <Input
                                        type="select"
                                        id="nationality"
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                        className="dark-select"
                                    >
                                        <option value="">Any</option>
                                        <option value="US">USA</option>
                                        <option value="GB">UK</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="TJ">Tajikistan</option>
                                        <option value="TM">Turkmenistan</option>
                                        <option value="UZ">Uzbekistan</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="minAge" className="text-gold">Min Age</Label>
                                    <Input
                                        type="number"
                                        id="minAge"
                                        value={minAge}
                                        onChange={handleMinAgeChange}
                                        min="18"
                                        max="100"
                                        className="dark-select"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="maxAge" className="text-gold">Max Age</Label>
                                    <Input
                                        type="number"
                                        id="maxAge"
                                        value={maxAge}
                                        onChange={handleMaxAgeChange}
                                        min="18"
                                        max="100"
                                        className="dark-select"
                                    />
                                </FormGroup>

                                {ageError && (
                                    <div className="text-danger" style={{ gridColumn: "1 / -1" }}>
                                        {ageError}
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                    <ProfileCard details={details} />
                    <div className="text-center mt-3">
                        <Button className="refresh-btn me-2" onClick={fetchFromAPI}>
                            <FaRedo /> Refresh User
                        </Button>
                        <Button 
                            className="download-btn" 
                            onClick={downloadUserInfo}
                            disabled={!details.name}
                        >
                            <FaDownload /> Download Info
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
