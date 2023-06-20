# Flurn Backend Assignment

## Deployed Link : 
### https://booking-system-6nb2.onrender.com
## Postman Link: 
### https://www.postman.com/universal-escape-197226/workspace/flurn/collection/19048718-3516bcb2-102a-4579-958a-6e4662cc81aa?action=share&creator=19048718

## Problem statement

A list of seats and the seat class will be provided. Every seat class will have
associated pricing with it. Pricing will be in the format of min price, max price and
normal price.
During the booking process when Seat is selected we should retrieve the pricing
for that seat based on the number of bookings that have already happened for
that seat class. If the seats in that particular class that was chosen are 60% full,
then use the max price for all further seats booked. If the seats in the particularclass that was chosen are 40% to 60% full, then use the normal price for the seat
booking. If the seats of the particular class that was chosen for less than 40% then
choose the min price.
If there is no price available for that range, choose the next available price. Ex. If a
seat class is only 30% full, but there is no min_pice for that class, use the
normal_price.

### Endpoints To be creted

- Get all seats
  - GET /seats
- Get Seat Pricing
  - GET /seats/id
- Create Booking
  - POST /booking
- Retrieve Bookings
  - GET /bookings?userIdentifier="Email or Phone number"

### Bonus Features to be Added

1. Notification Integration: Send out booking confirmation notification (Email
   or SMS) when the booking is created. You can use third-party service
   providers like Twilio, Sendgrid, Textlocal etc.
2. Write a script to upload the default data to your database by reading the
   CSV file.

## Work Done

All the above mentioned endpoints is created and can be accessed.

### Bonus Features Added
1. An email will be sent whenever a booking is created. I am using Sendgrid for sending emails.

2. I have created a js script to upload the csv file date into mongodb. To upload the csv file data in mongodb run command``` npm run save``` in terminal.
