import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

export const categories = [
  {
    id: "01",
    name: "Cleaning",
    icon: <MaterialIcons name="cleaning-services" size={24} color="black" />,
    image: require("../assets/images/cleaning.png"),
  },
  {
    id: "02",
    icon: <MaterialIcons name="home-repair-service" size={24} color="black" />,
    name: "Appliances",
    image: require("../assets/images/appliances.jpg"),
  },
  {
    id: "03",
    icon: <MaterialIcons name="plumbing" size={24} color="black" />,
    name: "Plumbing",
    image: require("../assets/images/plumbing.jpg"),
  },
  {
    id: "04",
    icon: <MaterialIcons name="format-paint" size={24} color="black" />,
    name: "Painting",
    image: require("../assets/images/painting.jpeg"),
  },
  {
    id: "05",
    icon: <Ionicons name="man" size={24} color="black" />,
    name: "mensCare",
    image: require("../assets/images/appliances.jpg"),
  },
  {
    id: "06",
    icon: <MaterialCommunityIcons name="lipstick" size={24} color="black" />,
    name: "womensCare",
    image: require("../assets/images/skincare.jpg"),
  },
  {
    id: "07",
    icon: <MaterialCommunityIcons name="lipstick" size={24} color="black" />,
    name: "Electrical",
    image: require("../assets/images/electrical.jpg"),
  },
  {
    id: "08",
    icon: <MaterialCommunityIcons name="lipstick" size={24} color="black" />,
    name: "Carpentry",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "09",
    icon: <MaterialIcons name="computer" size={24} color="black" />,
    name: "IT Services",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "10",
    icon: <MaterialIcons name="fitness-center" size={24} color="black" />,
    name: "Fitness",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "11",
    icon: <MaterialIcons name="local-grocery-store" size={24} color="black" />,
    name: "Grocery Delivery",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "12",
    icon: (
      <MaterialIcons name="local-laundry-service" size={24} color="black" />
    ),
    name: "Laundry",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "13",
    icon: <MaterialIcons name="local-florist" size={24} color="black" />,
    name: "Florist",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "14",
    icon: <MaterialIcons name="local-dining" size={24} color="black" />,
    name: "Food Delivery",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "15",
    icon: <MaterialIcons name="local-hospital" size={24} color="black" />,
    name: "Healthcare",
    image: require("../assets/images/download.jpg"),
  },
  {
    id: "16",
    icon: <MaterialIcons name="local-taxi" size={24} color="black" />,
    name: "Transportation",
    image: require("../assets/images/download.jpg"),
  },
];

export const trending = [
  {
    id: "01",
    name: "Groceries",
    price: "100",
    rating: "3.1",
    availability: "weekdays ",
    image: require("../assets/images/groceries.jpg"),
  },
  {
    id: "02",
    name: "Erands",
    price: "100",
    rating: "3.1",
    availability: "weekdays ",
    image: require("../assets/images/errands.jpg"),
  },
  {
    id: "03",
    name: "cleaning",
    price: "100",
    rating: "3.1",
    availability: "weekdays ",
    image: require("../assets/images/cleaning.png"),
  },
  {
    id: "04",
    name: "electrical",
    price: "100",
    rating: "3.1",
    availability: "weekdays ",
    image: require("../assets/images/electrical.jpg"),
  },
  {
    id: "05",
    name: "painting",
    price: "100",
    rating: "3.1",
    availability: "weekdays ",
    image: require("../assets/images/painting.jpeg"),
  },
  {
    id: "06",
    name: "mounting",
    price: "100",
    rating: "3.1",
    availability: "weekdays ",
    image: require("../assets/images/mounting.jpg"),
  },
];

export const mostBooked = [
  {
    id: "06",
    name: "mounting",
    price: "1000 NGN",
    rating: 4.7,
    image: require("../assets/images/tv.png"),
    icon: <FontAwesome name="television" size={80} color="black" />,
  },
  {
    id: "07",
    name: "mounting",
    price: "1000 NGN",
    rating: 4.7,
    image: require("../assets/images/tv.png"),
    icon: <FontAwesome name="television" size={80} color="black" />,
  },
];

export const color = {
  red: "red",
  green: "blue",
};

export const offers = [
  {
    id: "01",
    name: "Classic bathroom cleaning",
    tasker: "Kennedy sunday",
    price: "1000 ",
    rating: 4.7,
    reviews: 100,
    duration: "60 minns",
    description: [
      "Dirt & black stain removal from toilet pot, tiles, floor, basins, ",
      "sejcond",
    ],
    icon: <FontAwesome name="television" size={80} color="black" />,
    image: require("../assets/images/tv.png"),
  },
  {
    id: "02",
    name: "classic bathroom cleaning",
    price: "1000 ",
    rating: 4.7,
    reviews: 100,
    duration: "60 minns",
    description: [
      "Dirt & black stain removal from toilet pot, tiles, floor, basins, ",
      "sejcond",
    ],
    icon: <FontAwesome name="television" size={80} color="black" />,
    image: require("../assets/images/tv.png"),
  },
  {
    id: "03",
    name: "classic bathroom cleaning",
    price: "1000 ",
    rating: 4.7,
    reviews: 100,
    duration: "60 minns",
    description: [
      "Dirt & black stain removal from toilet pot, tiles, floor, basins, ",
      "sejcond",
    ],
    icon: <FontAwesome name="television" size={80} color="black" />,
    image: require("../assets/images/tv.png"),
  },
  {
    id: "04",
    name: "classic bathroom cleaning",
    price: "1000 ",
    rating: 4.7,
    reviews: 100,
    duration: "60 minns",
    description: [
      "Dirt & black stain removal from toilet pot, tiles, floor, basins, ",
      "sejcond",
    ],
    icon: <FontAwesome name="television" size={80} color="black" />,
    image: require("../assets/images/tv.png"),
  },
  {
    id: "05",
    name: "classic bathroom cleaning",
    price: "1000 ",
    rating: 4.7,
    reviews: 100,
    duration: "60 minns",
    description: [
      "Dirt & black stain removal from toilet pot, tiles, floor, basins, ",
      "sejcond",
    ],
    icon: <FontAwesome name="television" size={80} color="black" />,
    image: require("../assets/images/tv.png"),
  },
  {
    id: "06",
    name: "classic bathroom cleaning",
    price: "1000 ",
    rating: 4.7,
    reviews: 100,
    duration: "60 minns",
    description: [
      "Dirt & black stain removal from toilet pot, tiles, floor, basins, ",
      "sejcond",
    ],
    icon: <FontAwesome name="television" size={80} color="black" />,
    image: require("../assets/images/tv.png"),
  },
];

export default reviews = [
  {
    id: "01",
    name: "John Doe",
    timestamp: "December 2024",
    rating: 4.7,
    description: " best services i ever recievd",
    favicon: require("../assets/images/avatar.png"),
  },
  {
    id: "02",
    name: "Jane Doe",
    timestamp: "June 2020",
    rating: 4.7,
    description: " best services i ever recievd",
    favicon: require("../assets/images/skincare.jpg"),
  },
];

export const women = [
  {
    id: "01",
    name: "Skincare",
    image: require("../assets/images/skincare.jpg"),
  },
  {
    id: "02",
    name: "Haircare",
    image: require("../assets/images/haircare.jpg"),
  },
  {
    id: "03",
    name: "Nails & lashes",
    image: require("../assets/images/nails.jpg"),
  },
  {
    id: "04",
    name: "Waxing",
    image: require("../assets/images/waxing.jpeg"),
  },
  {
    id: "05",
    name: "Massage",
    image: require("../assets/images/massage.jpg"),
  },
  {
    id: "06",
    name: "Beauty & /nMakeup",
    image: require("../assets/images/makeup.jpg"),
  },
];

export const tasker = [
  {
    id: "01",
    name: "Kennedy sunday",
    avatar: require("../assets/images/cleaning.png"),
    rating: "3.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekdays",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },
  {
    id: "02",
    name: "Sonkey Kennedy",
    avatar: require("../assets/images/waxing.jpeg"),
    rating: "5.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekend",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },
  {
    id: "03",
    name: "Chinenye",
    avatar: require("../assets/images/waxing.jpeg"),
    rating: "5.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekend",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },
  {
    id: "04",
    name: "Chiuzor ",
    avatar: require("../assets/images/waxing.jpeg"),
    rating: "5.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekend",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },

  {
    id: "05",
    name: "Okemute ",
    avatar: require("../assets/images/waxing.jpeg"),
    rating: "5.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekend",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },
  {
    id: "06",
    name: "Okemute ",
    avatar: require("../assets/images/waxing.jpeg"),
    rating: "5.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekend",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },
  {
    id: "07",
    name: "Okemute ",
    avatar: require("../assets/images/waxing.jpeg"),
    rating: "5.5",
    reviews: 100,
    totaltasks: 50,
    amount: "1000",
    task: "cleaning",
    availability: "weekend",
    desc: "I have been doing this for over three months, i am very repnsile and take quick actions",
  },
];

export const services = {
  Cleaning: [
    { id: "01", name: "Deep cleaning" },
    { id: "02", name: "Post construction cleaning" },
    { id: "03", name: "Regular cleaning" },
    { id: "04", name: "Other" },
  ],
  Plumbing: [
    { id: "01", name: " Sink " },
    { id: "02", name: " Draiage" },
    { id: "03", name: "Toilet" },
    { id: "04", name: "Shower" },
    { id: "05", name: "Bathub" },
    { id: "06", name: "Water heater" },
    { id: "07", name: "Water pump" },
    { id: "08", name: "Water tank" },
    { id: "09", name: "Water supply" },
    { id: "10", name: "Other" },
  ],

  Painting: [
    { id: "01", name: "Interior painting" },
    { id: "02", name: "Exterior painting" },
    { id: "03", name: "Wall painting" },
    { id: "04", name: "Screeding" },
    { id: "05", name: "Wall panels" },
    { id: "06", name: "Wall paper" },
    { id: "07", name: "Other" },
  ],

  Appliances: [
    { id: "01", name: "TV mounting" },
    { id: "02", name: "Air conditioner" },
    { id: "03", name: "Washing machine" },
    { id: "04", name: "Refrigerator" },
    { id: "05", name: "Water dispenser" },
    { id: "06", name: "Generator" },
    { id: "07", name: "Other" },
  ],

  Electrical: [
    { id: "01", name: "Fan" },
    { id: "02", name: "Lighting" },
    { id: "03", name: "Socket" },
    { id: "04", name: "Switch" },
    { id: "05", name: "Wiring" },
    { id: "06", name: "Other" },
  ],

  Carpentry: [
    { id: "01", name: "Bed" },
    { id: "02", name: "Chair" },
    { id: "03", name: "Table" },
    { id: "04", name: "Wardrobe" },
    { id: "05", name: "Shelf" },
    { id: "06", name: "Other" },
  ],

  mensCare: [
    { id: "01", name: "Haircut" },
    { id: "02", name: "Beard" },
    { id: "03", name: "Manicure" },
    { id: "04", name: "Pedicure" },
    { id: "05", name: "Massage" },
    { id: "06", name: "Other" },
  ],

  womensCare: [
    { id: "01", name: "Haircut" },
    { id: "02", name: "Hair styling" },
    { id: "03", name: "Hair coloring" },
    { id: "04", name: "Hair treatment" },
    { id: "05", name: "Hair extension" },
    { id: "06", name: "Hair removal" },
    { id: "07", name: "Makeup" },
    { id: "08", name: "Skincare" },
    { id: "09", name: "Nails & lashes" },
    { id: "10", name: "Waxing" },
    { id: "11", name: "Facial" },
    { id: "12", name: "Manicure" },
    { id: "13", name: "Pedicure" },
    { id: "14", name: "Massage" },
    { id: "15", name: "Other" },
  ],

  // other arrays here
};

export const gender = [
  {
    id: "01",
    name: "kennedy",
    latitude: 10.489738169311329,
    longitude: 7.450689565704899,
  },
];

7.450689565704899;
