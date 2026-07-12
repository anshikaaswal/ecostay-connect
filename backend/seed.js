const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homestay = require('./models/Homestay');
const Booking = require('./models/Booking');
const User = require('./models/User');

dotenv.config();

const homestays = [
  {
    name: 'Mountain View Cottage',
    location: 'Nainital',
    price: 1800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop',
    description: 'Nestled in the serene hills, this cozy cottage offers breathtaking mountain views, fresh organic meals, and guided nature trails through lush pine forests.',
    amenities: ['WiFi', 'Parking', 'Breakfast', 'Trekking', 'Bonfire'],
  },
  {
    name: 'Forest Retreat',
    location: 'Kerala',
    price: 2500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1499793983690-e29f59e78f3f?w=600&h=400&fit=crop',
    description: 'Immerse yourself in the heart of the wilderness. Enjoy bird watching, yoga sessions at sunrise, and sustainable living in a handcrafted wooden cabin.',
    amenities: ['Bird Watching', 'Yoga', 'Organic Meals', 'Nature Walks', 'Campfire'],
  },
  {
    name: 'River Side Stay',
    location: 'Rishikesh',
    price: 2800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop',
    description: 'Wake up to the soothing sounds of flowing water. This eco-friendly riverside stay offers kayaking, fishing, and farm-to-table dining experiences.',
    amenities: ['Kayaking', 'Fishing', 'Farm-to-Table', 'Campfire', 'River View'],
  },
  {
    name: 'Himalayan Eco Lodge',
    location: 'Uttarakhand',
    price: 3500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    description: 'Perched on a cliff overlooking the valley, this lodge runs entirely on solar power. Perfect for stargazing and digital detox retreats.',
    amenities: ['Solar Power', 'Stargazing', 'Digital Detox', 'Trekking', 'Organic Farm'],
  },
  {
    name: 'Green Valley Homestay',
    location: 'Coorg',
    price: 2000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
    description: 'A stunning villa built entirely from sustainable bamboo. Surrounded by tropical gardens with a natural spring pool and organic farm.',
    amenities: ['Coffee Plantation', 'Bird Watching', 'Local Cuisine', 'Nature Trails', 'Campfire'],
  },
  {
    name: 'Lakeside Cabin',
    location: 'Udaipur',
    price: 3200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    description: 'Experience tranquility at our handcrafted lakeside cabin. Enjoy canoeing, local cuisine cooking classes, and eco-friendly amenities.',
    amenities: ['Canoeing', 'Cooking Classes', 'Lake View', 'Organic Meals', 'WiFi'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Homestay.deleteMany({});
    await Booking.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data...');

    // Insert homestays
    const createdHomestays = await Homestay.insertMany(homestays);
    console.log(`Inserted ${createdHomestays.length} homestays`);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@ecostay.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`Created admin user: ${adminUser.email} (password: admin123)`);

    // Create regular test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      role: 'user',
    });
    console.log(`Created test user: ${testUser.email} (password: test123)`);

    // Create bookings referencing the inserted homestays
    const bookings = [
      {
        userName: 'Anshika',
        email: 'anshika@example.com',
        homestay: createdHomestays[1]._id, // Forest Retreat
        checkIn: new Date('2026-07-20'),
        checkOut: new Date('2026-07-22'),
        guests: 2,
        status: 'confirmed',
      },
      {
        userName: 'Rahul',
        email: 'rahul@example.com',
        homestay: createdHomestays[0]._id, // Mountain View Cottage
        checkIn: new Date('2026-08-10'),
        checkOut: new Date('2026-08-14'),
        guests: 3,
        status: 'confirmed',
      },
      {
        userName: 'Test User',
        email: 'test@example.com',
        homestay: createdHomestays[2]._id, // River Side Stay
        checkIn: new Date('2026-09-05'),
        checkOut: new Date('2026-09-08'),
        guests: 2,
        status: 'pending',
      },
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log(`Inserted ${createdBookings.length} bookings`);

    console.log('');
    console.log('Database seeded successfully!');
    console.log('---');
    console.log('Admin login: admin@ecostay.com / admin123');
    console.log('Test user login: test@example.com / test123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();