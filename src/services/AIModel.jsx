   import { GoogleGenerativeAI } from "@google/generative-ai";
      
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
      
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      };
      
      
        export const chatSession = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [
                {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "I cannot directly access and display real-time information, including hotel prices, availability, images, and geo-coordinates.  Hotel prices fluctuate constantly.  Also, providing image URLs requires accessing and linking to external image hosting sites, which is beyond my current capabilities.\n\nHowever, I can provide you with a JSON structure that you can populate with the information you find using online travel agencies like Expedia, Booking.com, Kayak, etc.  Remember to always check multiple sites for the best deals.\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, NV\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Hotel Address 1\",\n      \"price\": \"$$$  (Replace with price range)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_1\", \n      \"geoCoordinates\": { \"latitude\": 00.0000, \"longitude\": 00.0000 },\n      \"rating\": 3.5, \n      \"description\": \"Hotel description 1\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Hotel Address 2\",\n      \"price\": \"$$$ (Replace with price range)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_2\",\n      \"geoCoordinates\": { \"latitude\": 00.0000, \"longitude\": 00.0000 },\n      \"rating\": 4.0,\n      \"description\": \"Hotel description 2\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3\",\n      \"hotelAddress\": \"Hotel Address 3\",\n      \"price\": \"$$$ (Replace with price range)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_3\",\n      \"geoCoordinates\": { \"latitude\": 00.0000, \"longitude\": 00.0000 },\n      \"rating\": 3.0,\n      \"description\": \"Hotel description 3\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free walking area with light shows.\",\n        \"placeImageUrl\": \"URL_TO_FREMONT_STREET_IMAGE\",\n        \"geoCoordinates\": { \"latitude\": 36.1699, \"longitude\": -115.1400 },\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"15 mins (depending on location)\"\n      },\n      {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"Museum of vintage Vegas signs (entry fee applies)\",\n        \"placeImageUrl\": \"URL_TO_NEON_MUSEUM_IMAGE\",\n        \"geoCoordinates\": { \"latitude\": 36.1671, \"longitude\": -115.1330 },\n        \"ticketPricing\": \"$$$ (Check online for current prices)\",\n        \"travelTime\": \"10 mins from Fremont Street\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking)\",\n        \"placeDetails\": \"Explore the casinos and hotels along the Las Vegas Strip.\",\n        \"placeImageUrl\": \"URL_TO_STRIP_IMAGE\",\n        \"geoCoordinates\": { \"latitude\": 36.1146, \"longitude\": -115.1728 },\n        \"ticketPricing\": \"Free (unless you gamble or visit attractions)\",\n        \"travelTime\": \"Varies depending on how far you walk.\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free water show.\",\n        \"placeImageUrl\": \"URL_TO_FOUNTAIN_IMAGE\",\n        \"geoCoordinates\": { \"latitude\": 36.1177, \"longitude\": -115.1753 },\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"5 mins from other Strip locations\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Hiking and scenic drives (entry fee applies)\",\n        \"placeImageUrl\": \"URL_TO_RED_ROCK_IMAGE\",\n        \"geoCoordinates\": { \"latitude\": 36.2000, \"longitude\": -115.8000 },\n        \"ticketPricing\": \"$$$ (Check National Park Service website for current fees)\",\n        \"travelTime\": \"30-45 mins from Strip (traffic dependent)\"\n      }\n      // Add other activities here if desired (e.g., Hoover Dam, Valley of Fire)\n    ]\n  }\n}\n```\n\n**Remember to:**\n\n* **Replace the placeholder values**  (`$$$`, URLs, coordinates) with the actual information you find online.\n* **Consider transportation costs**  (buses, rideshares) into your budget.  Las Vegas is spread out, so transportation can be a significant expense.\n* **Look for free activities:**  Many attractions on the Strip are free to view, even if you don't gamble. Walking the Strip, enjoying the fountains, and taking in the atmosphere are great free options.\n* **Pack snacks and water:** This will help reduce food costs.\n* **Look for deals and coupons:** Many websites offer discounts on shows, attractions, and restaurants.\n\nThis improved structure provides a better framework for your Las Vegas trip planning.  Remember to research and book accommodations and activities in advance, especially if traveling during peak season.\n"},
              ],
            },
          ],
        });
    