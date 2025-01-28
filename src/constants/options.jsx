export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Solo adventure, discover yourself.',
        icon: '🧍‍♂️',  // Single person emoji
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Unforgettable moments together.',
        icon: '👫',  // Couple emoji
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Memorable time with loved ones.',
        icon: '👨‍👩‍👧‍👦',  // Family emoji
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Adventure with your squad.',
        icon: '⛵',  // Boat emoji for friends
        people: '5 to 10 People'
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Budget-friendly trip.',
        icon: '🪙',  // Coin emoji
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Comfort meets cost.',
        icon: '⚖️',  // Balance scale emoji
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium experiences.',
        icon: '💎',  // Gem emoji
    },
];

export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'