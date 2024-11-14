// Admin.jsx
import React, { useState, useEffect } from 'react';
import { CAR_WAREHOUSE_DATA } from '../data/CarData'; // Import your car data
import Hero from "../components/Hero";

function AdminPage() {
    const [carAvailability, setCarAvailability] = useState({});

    useEffect(() => {
        // Initialize carAvailability from CAR_WAREHOUSE_DATA
        const initialAvailability = CAR_WAREHOUSE_DATA.reduce((acc, car) => {
            acc[car.id] = car.availability;  // Use car.id as key
            return acc;
        }, {});
        setCarAvailability(initialAvailability);
    }, []);


    const handleAvailabilityChange = (carId, newAvailability) => { // Use carId
        if (newAvailability < 0) {
            alert("Car availability cannot be negative.");
            return;
        }
        // Find the car and update its availability in CAR_WAREHOUSE_DATA
        const updatedCarData = CAR_WAREHOUSE_DATA.map((car) =>
        car.id === carId ? { ...car, availability: newAvailability } : car);

        setCarAvailability({
            ...carAvailability,
            [carId]: newAvailability, // Use carId as the key

        });
      localStorage.setItem("cars", JSON.stringify(updatedCarData));
    };

    return (
        <>
            <Hero />
            <div className="admin-panel">
                <h1 style={{ fontSize: "2em", alignContent: "center", textAlign: "center" }}>Admin Panel - Car Availability</h1>
                <ul>
                    {CAR_WAREHOUSE_DATA.map((car) => (
                        <li key={car.id} className="admin-car-item"> {/* Add class for styling */}
                            <img src={car.img} alt={car.name} className="admin-car-image" /> {/* Display image */}
                            <div className="admin-car-details"> {/* Added container for car details */}
                              <span className="admin-car-name">{car.name}:</span> {/* Car name */}
                              <input
                                  type="number"
                                  value={carAvailability[car.id] || car.availability}
                                  onChange={(e) => handleAvailabilityChange(car.id, parseInt(e.target.value, 10) || 0)}
                                  min={0}
                                  className="admin-car-input"
                              />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default AdminPage;

