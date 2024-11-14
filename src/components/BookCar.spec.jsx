import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Import waitFor here
import BookCar from '../components/BookCar';
import { CAR_WAREHOUSE_DATA } from '../data/CarData';
import { OFFICE_LOCATIONS } from '../data/OfficeLocationsData';

describe('BookCar Component', () => {

    beforeEach(() => {
        render(<BookCar />);
    });

    it('renders the booking form with initial values', () => {
        expect(screen.getByRole('option', { name: /Select your car type/i }).selected).toBe(true);
        expect(screen.getByRole('option', { name: /Select pick up location/i }).selected).toBe(true);
        expect(screen.getByRole('option', { name: /Select drop off location/i }).selected).toBe(true);

    });

    it('displays error message when form is submitted with empty required fields', () => {
        const searchButton = screen.getByRole('button', { name: /Search/i });
        fireEvent.click(searchButton);
        expect(screen.getByText(/All fields required!/i)).toBeVisible();
    });


    it('should open the modal when search button is clicked and all required fields are filled', async () => {
        const carTypeSelect = await screen.findByRole('combobox', { name: /Select Your Car Type/i });
        const pickUpSelect = await screen.findByRole('combobox', { name: /Pick-up/i });
        const dropOffSelect = await screen.findByRole('combobox', { name: /Drop-off/i });
        const pickTimeInput = await screen.findByLabelText(/Pick-up \*/i);
        const dropTimeInput = await screen.findByLabelText(/Drop-off \*/i);
        const searchButton = screen.getByRole('button', { name: /Search/i });

        fireEvent.change(carTypeSelect, { target: { value: CAR_WAREHOUSE_DATA[0].name } });
        fireEvent.change(pickUpSelect, { target: { value: OFFICE_LOCATIONS[0].city } });
        fireEvent.change(dropOffSelect, { target: { value: OFFICE_LOCATIONS[0].city } });
        fireEvent.change(pickTimeInput, { target: { value: '2024-03-10' } }); 
        fireEvent.change(dropTimeInput, { target: { value: '2024-03-15' } });


        fireEvent.click(searchButton);
    
        const modalTitle = await waitFor(() => screen.getByRole('heading', { name: /Complete Reservation/i })); // Check Modal title
        expect(modalTitle).toBeVisible();
    
      });

      it('should show warning for price change for selecting different pick-up and drop-off locations', async () => {
        const carTypeSelect = await screen.findByRole('combobox', { name: /Select Your Car Type/i });
        const pickUpSelect = await screen.findByRole('combobox', { name: /Pick-up/i });
        const dropOffSelect = await screen.findByRole('combobox', { name: /Drop-off/i });
        const pickTimeInput = await screen.findByLabelText(/Pick-up \*/i);
        const dropTimeInput = await screen.findByLabelText(/Drop-off \*/i);
        const searchButton = screen.getByRole('button', { name: /Search/i });

        fireEvent.change(carTypeSelect, { target: { value: CAR_WAREHOUSE_DATA[0].name } });
        fireEvent.change(pickUpSelect, { target: { value: OFFICE_LOCATIONS[0].city } });
        fireEvent.change(dropOffSelect, { target: { value: OFFICE_LOCATIONS[2].city } });
        fireEvent.change(pickTimeInput, { target: { value: '2024-03-10' } }); 
        fireEvent.change(dropTimeInput, { target: { value: '2024-03-15' } });


        fireEvent.click(searchButton);
    
        const modalTitle = await waitFor(() => screen.getByRole('heading', { name: /Complete Reservation/i })); 
        expect(modalTitle).toBeVisible();
        expect(screen.getByText(/Pick-up and Drop-off locations are different. Prices will be updated accordingly./i)).toBeVisible();
    
      });

      it('should correctly update the price message when pick-up and drop-off locations are different and then same', async () => {

        const carTypeSelect = await screen.findByRole('combobox', { name: /Select Your Car Type/i });
        const pickUpSelect = await screen.findByRole('combobox', { name: /Pick-up/i });
        const dropOffSelect = await screen.findByRole('combobox', { name: /Drop-off/i });
        const searchButton = screen.getByRole('button', { name: /Search/i });
  
        //Test for different locations.
        fireEvent.change(pickUpSelect, { target: { value: OFFICE_LOCATIONS[0].city } });
        fireEvent.change(dropOffSelect, { target: { value: OFFICE_LOCATIONS[1].city } });
        fireEvent.click(searchButton);
        expect(await screen.findByText(/Pick-up and Drop-off locations are different\. Prices will be updated accordingly\./i)).toBeVisible();
  
        fireEvent.click(document.body);
  
        render(<BookCar />); 
  
        //Test for same locations
        const pickUpSelect2 = await screen.findByRole('combobox', { name: /Pick-up/i });
        const dropOffSelect2 = await screen.findByRole('combobox', { name: /Drop-off/i });
  
        fireEvent.change(pickUpSelect2, { target: { value: OFFICE_LOCATIONS[0].city } });
        fireEvent.change(dropOffSelect2, { target: { value: OFFICE_LOCATIONS[0].city } });
        fireEvent.click(searchButton);
  
        await waitFor(() => { 
            expect(screen.queryByText(/Pick-up and Drop-off locations are different\. Prices will be updated accordingly\./i)).not.toBeInTheDocument();
        });
});

});


