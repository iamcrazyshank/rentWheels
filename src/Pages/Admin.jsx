import React, { useState, useEffect } from 'react';
import { CAR_WAREHOUSE_DATA } from '../data/CarData';
import Banner from "../components/Banner";

function AdminPage() {
    const [carAvailability, setCarAvailability] = useState({});

    useEffect(() => {
        const initialAvailability = CAR_WAREHOUSE_DATA.reduce((acc, car) => {
            acc[car.id] = car.availability;  
            return acc;
        }, {});
        setCarAvailability(initialAvailability);

        
    }, []);


    const handleAvailabilityChange = (carId, newAvailability) => { 
        if (newAvailability < 0) {
            alert("Car availability cannot be negative.");
            return;
        }
        const updatedCarData = CAR_WAREHOUSE_DATA.map((car) =>
        car.id === carId ? { ...car, availability: newAvailability } : car);

        setCarAvailability({
            ...carAvailability,
            [carId]: newAvailability, 

        });
      localStorage.setItem("cars", JSON.stringify(updatedCarData));
    };

    return (
        <>
            <Banner />
            <div className="admin-panel">
                <h1 style={{ fontSize: "2em", alignContent: "center", textAlign: "center" }}>Admin Portal - Car Availability</h1>
                <ul>
                    {CAR_WAREHOUSE_DATA.map((car) => (
                        <li key={car.id} className="admin-car-item"> 
                            <img src={car.img} alt={car.name} className="admin-car-image" /> 
                            <div className="admin-car-details"> 
                              <span className="admin-car-name">{car.name}:</span> 
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

