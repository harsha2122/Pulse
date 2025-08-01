// // src/utils/pharmacy.js
// // Pharmacy API Service Layer with Realistic Pharmaceutical Products

// // Realistic Mock API responses for pharmacy system
// const mockApiResponses = {
//   pharmacy_categories: [
//     {
//       id: 1,
//       name: "Pain Relief",
//       description: "Medications for pain management and fever reduction",
//       icon: "https://img.icons8.com/fluency/64/pills.png",
//       is_featured: true,
//       sort_order: 1,
//       subcategory_count: 5,
//       product_count: 30,
//       min_price: "20.00",
//       max_price: "550.00",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z"
//     },
//     {
//       id: 2,
//       name: "Cold & Flu",
//       description: "Treatment for cold, flu, and respiratory symptoms",
//       icon: "https://img.icons8.com/fluency/64/thermometer.png",
//       is_featured: true,
//       sort_order: 2,
//       subcategory_count: 3,
//       product_count: 12,
//       min_price: "45.00",
//       max_price: "280.00",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z"
//     },
//     {
//       id: 3,
//       name: "Vitamins & Supplements",
//       description: "Essential vitamins and dietary supplements for health",
//       icon: "https://img.icons8.com/fluency/64/capsule.png",
//       is_featured: true,
//       sort_order: 3,
//       subcategory_count: 4,
//       product_count: 25,
//       min_price: "150.00",
//       max_price: "800.00",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z"
//     },
//     {
//       id: 4,
//       name: "Digestive Health",
//       description: "Medications for stomach, acidity, and digestive issues",
//       icon: "https://img.icons8.com/fluency/64/stomach.png",
//       is_featured: false,
//       sort_order: 4,
//       subcategory_count: 4,
//       product_count: 14,
//       min_price: "35.00",
//       max_price: "320.00",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z"
//     },
//     {
//       id: 5,
//       name: "Heart Care",
//       description: "Cardiovascular medications and heart health products",
//       icon: "https://img.icons8.com/fluency/64/heart-health.png",
//       is_featured: true,
//       sort_order: 5,
//       subcategory_count: 3,
//       product_count: 10,
//       min_price: "85.00",
//       max_price: "950.00",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z"
//     },
//     {
//       id: 6,
//       name: "Skincare & Dermatology",
//       description: "Skin care products and dermatological treatments",
//       icon: "https://img.icons8.com/fluency/64/natural-skincare.png",
//       is_featured: false,
//       sort_order: 6,
//       subcategory_count: 4,
//       product_count: 16,
//       min_price: "95.00",
//       max_price: "580.00",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z"
//     }
//   ],

//   pharmacy_products: {
//     count: 150,
//     next: "http://localhost:8000/api/pharmacy/products/?page=2",
//     previous: null,
//     results: [
//       // PAIN RELIEF PRODUCTS - HEADACHE RELIEF
//       {
//         id: 1,
//         name: "Paracetamol 500mg Tablets",
//         description: "Effective pain relief and fever reducer. Safe for adults and suitable for regular use.",
//         brand: "Crocin",
//         unit: "Strip of 10 tablets",
//         price: "25.00",
//         original_price: "30.00",
//         effective_price: "25.00",
//         discount_percentage: 17,
//         savings_amount: "5.00",
//         image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
//         rating: "4.2",
//         review_count: 1250,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 100,
//         category_name: "Pain Relief",
//         subcategory_name: "Headache Relief",
//         category_id: 1,
//         subcategory_id: 1,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 2,
//         name: "Aspirin 325mg Tablets",
//         description: "Reduces headache, pain, and inflammation. Dispersible tablets for quick relief.",
//         brand: "Disprin",
//         unit: "Strip of 15 tablets",
//         price: "30.00",
//         original_price: "35.00",
//         effective_price: "30.00",
//         discount_percentage: 14,
//         savings_amount: "5.00",
//         image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
//         rating: "4.1",
//         review_count: 1120,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: false,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 80,
//         category_name: "Pain Relief",
//         subcategory_name: "Headache Relief",
//         category_id: 1,
//         subcategory_id: 1,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 3,
//         name: "Saridon Tablets",
//         description: "Quick headache relief with paracetamol, propyphenazone, caffeine combination.",
//         brand: "Saridon",
//         unit: "Strip of 10 tablets",
//         price: "20.00",
//         original_price: "25.00",
//         effective_price: "20.00",
//         discount_percentage: 20,
//         savings_amount: "5.00",
//         image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
//         rating: "4.0",
//         review_count: 830,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: false,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 60,
//         category_name: "Pain Relief",
//         subcategory_name: "Headache Relief",
//         category_id: 1,
//         subcategory_id: 1,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // PAIN RELIEF PRODUCTS - JOINT PAIN
//       {
//         id: 4,
//         name: "Ibuprofen 400mg Tablets",
//         description: "Anti-inflammatory pain relief for joints, muscles and arthritis.",
//         brand: "Brufen",
//         unit: "Strip of 15 tablets",
//         price: "45.00",
//         original_price: "55.00",
//         effective_price: "45.00",
//         discount_percentage: 18,
//         savings_amount: "10.00",
//         image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
//         rating: "4.1",
//         review_count: 890,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: false,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 75,
//         category_name: "Pain Relief",
//         subcategory_name: "Joint Pain",
//         category_id: 1,
//         subcategory_id: 2,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 5,
//         name: "Diclofenac Sodium Tablets",
//         description: "Powerful anti-inflammatory for joint pain and arthritis relief.",
//         brand: "Voveran",
//         unit: "Strip of 10 tablets",
//         price: "35.00",
//         original_price: "45.00",
//         effective_price: "35.00",
//         discount_percentage: 22,
//         savings_amount: "10.00",
//         image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
//         rating: "4.0",
//         review_count: 670,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: false,
//         is_prescription_required: true,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 60,
//         category_name: "Pain Relief",
//         subcategory_name: "Joint Pain",
//         category_id: 1,
//         subcategory_id: 2,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // PAIN RELIEF PRODUCTS - MUSCLE PAIN
//       {
//         id: 6,
//         name: "Voltaren Emulgel 1% Diclofenac Gel",
//         description: "Topical anti-inflammatory gel for muscle pain, joint pain, and sports injuries.",
//         brand: "Novartis",
//         unit: "30g tube",
//         price: "165.00",
//         original_price: "185.00",
//         effective_price: "165.00",
//         discount_percentage: 11,
//         savings_amount: "20.00",
//         image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
//         rating: "4.4",
//         review_count: 734,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 45,
//         category_name: "Pain Relief",
//         subcategory_name: "Muscle Pain",
//         category_id: 1,
//         subcategory_id: 3,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 7,
//         name: "Moov Spray 80g",
//         description: "Fast relief for muscle sprain, back pain and sports injuries.",
//         brand: "Moov",
//         unit: "80g spray",
//         price: "130.00",
//         original_price: "145.00",
//         effective_price: "130.00",
//         discount_percentage: 10,
//         savings_amount: "15.00",
//         image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
//         rating: "4.2",
//         review_count: 420,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 120,
//         category_name: "Pain Relief",
//         subcategory_name: "Muscle Pain",
//         category_id: 1,
//         subcategory_id: 3,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // COLD & FLU PRODUCTS
//       {
//         id: 8,
//         name: "Zyrtec Cetirizine 10mg Tablets",
//         description: "Antihistamine for allergic rhinitis, urticaria, and seasonal allergies.",
//         brand: "Johnson & Johnson",
//         unit: "Strip of 10 tablets",
//         price: "78.00",
//         original_price: "85.00",
//         effective_price: "78.00",
//         discount_percentage: 8,
//         savings_amount: "7.00",
//         image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
//         rating: "4.3",
//         review_count: 1847,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 75,
//         category_name: "Cold & Flu",
//         subcategory_name: "Antihistamines",
//         category_id: 2,
//         subcategory_id: 4,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 9,
//         name: "Benadryl Cough Formula 100ml",
//         description: "Effective cough syrup for dry and productive cough with diphenhydramine.",
//         brand: "Johnson & Johnson",
//         unit: "100ml bottle",
//         price: "95.00",
//         original_price: "105.00",
//         effective_price: "95.00",
//         discount_percentage: 10,
//         savings_amount: "10.00",
//         image_url: "https://images.unsplash.com/photo-1627224012372-dec8f7c43c6b?w=300&h=300&fit=crop",
//         rating: "4.1",
//         review_count: 923,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: false,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 60,
//         category_name: "Cold & Flu",
//         subcategory_name: "Cough Syrup",
//         category_id: 2,
//         subcategory_id: 5,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // VITAMINS & SUPPLEMENTS
//       {
//         id: 10,
//         name: "Calcirol Vitamin D3 60K Granules",
//         description: "High-potency Vitamin D3 supplement for bone health and immunity.",
//         brand: "Cadila Pharmaceuticals",
//         unit: "4 sachets",
//         price: "156.00",
//         original_price: "175.00",
//         effective_price: "156.00",
//         discount_percentage: 11,
//         savings_amount: "19.00",
//         image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
//         rating: "4.5",
//         review_count: 2156,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 95,
//         category_name: "Vitamins & Supplements",
//         subcategory_name: "Vitamin D",
//         category_id: 3,
//         subcategory_id: 6,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 11,
//         name: "Centrum Multivitamin Tablets",
//         description: "Complete daily multivitamin with 24 essential vitamins and minerals.",
//         brand: "Pfizer",
//         unit: "Bottle of 30 tablets",
//         price: "485.00",
//         original_price: "525.00",
//         effective_price: "485.00",
//         discount_percentage: 8,
//         savings_amount: "40.00",
//         image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
//         rating: "4.3",
//         review_count: 1678,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 55,
//         category_name: "Vitamins & Supplements",
//         subcategory_name: "Multivitamins",
//         category_id: 3,
//         subcategory_id: 7,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // DIGESTIVE HEALTH
//       {
//         id: 12,
//         name: "ENO Fruit Salt Regular",
//         description: "Instant relief from acidity, gas, and indigestion. Fast-acting antacid.",
//         brand: "GSK",
//         unit: "100g bottle",
//         price: "85.00",
//         original_price: "95.00",
//         effective_price: "85.00",
//         discount_percentage: 11,
//         savings_amount: "10.00",
//         image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
//         rating: "4.4",
//         review_count: 2367,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 75,
//         category_name: "Digestive Health",
//         subcategory_name: "Antacids",
//         category_id: 4,
//         subcategory_id: 8,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // HEART CARE
//       {
//         id: 13,
//         name: "Ecosprin AV 75mg Capsules",
//         description: "Low-dose aspirin with atorvastatin for cardiovascular protection.",
//         brand: "USV",
//         unit: "Strip of 15 capsules",
//         price: "125.00",
//         original_price: "142.00",
//         effective_price: "125.00",
//         discount_percentage: 12,
//         savings_amount: "17.00",
//         image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
//         rating: "4.3",
//         review_count: 1456,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: true,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 65,
//         category_name: "Heart Care",
//         subcategory_name: "Cardioprotective",
//         category_id: 5,
//         subcategory_id: 9,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },

//       // SKINCARE & DERMATOLOGY
//       {
//         id: 14,
//         name: "Cetaphil Daily Facial Moisturizer",
//         description: "Non-comedogenic daily moisturizer with SPF 15 for sensitive skin.",
//         brand: "Galderma",
//         unit: "118ml bottle",
//         price: "565.00",
//         original_price: "625.00",
//         effective_price: "565.00",
//         discount_percentage: 10,
//         savings_amount: "60.00",
//         image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
//         rating: "4.6",
//         review_count: 1834,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 35,
//         category_name: "Skincare & Dermatology",
//         subcategory_name: "Moisturizers",
//         category_id: 6,
//         subcategory_id: 10,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       },
//       {
//         id: 15,
//         name: "Neutrogena Ultra Sheer Sunblock SPF 50+",
//         description: "Broad spectrum sunscreen with Helioplex technology. Water resistant.",
//         brand: "Johnson & Johnson",
//         unit: "88ml tube",
//         price: "485.00",
//         original_price: "535.00",
//         effective_price: "485.00",
//         discount_percentage: 9,
//         savings_amount: "50.00",
//         image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
//         rating: "4.5",
//         review_count: 1289,
//         delivery_info: "Get by 10pm, Tomorrow",
//         is_bestseller: true,
//         is_prescription_required: false,
//         is_available: true,
//         is_in_stock: true,
//         stock_quantity: 28,
//         category_name: "Skincare & Dermatology",
//         subcategory_name: "Sunscreen",
//         category_id: 6,
//         subcategory_id: 11,
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: "2024-01-15T00:00:00Z"
//       }
//     ]
//   },

//   pharmacy_config: {
//     id: 1,
//     name: 'MediCare Plus Pharmacy',
//     description: 'Your trusted neighborhood pharmacy providing authentic medicines and healthcare services with 24/7 availability.',
//     address: '123 Health Street, Medical District, Mumbai 400001, Maharashtra',
//     phone: '+91 98765 43210',
//     email: 'info@medicareplus.com',
//     operating_hours: '24/7 - Always Available',
//     emergency_contact: '+91 98765 43999',
//     license_number: 'MH-PHARM-2024-001',
//     website: 'https://medicareplus.com',
//     special_services: 'Home delivery, Online consultation, Health checkups, Medicine reminders',
//     is_active: true,
//     last_updated: '2024-06-01',
//   },

//   pharmacy_cart: {
//     id: 1,
//     user: 1,
//     items: [],
//     total_items: 0,
//     unique_items_count: 0,
//     subtotal: "0.00",
//     total_savings: "0.00",
//     delivery_charge: "0.00",
//     total_amount: "0.00",
//     prescription_required: false,
//     is_active: true,
//     created_at: "2024-01-15T10:30:00Z",
//     updated_at: "2024-01-15T11:15:00Z"
//   }
// };

// // Subcategories mapping for detailed category data
// const subcategoriesMap = {
//   1: [ // Pain Relief
//     { id: 1, name: "Headache Relief", description: "Medications for headache and migraine", icon: "solar:brain-bold", sort_order: 1, product_count: 6 },
//     { id: 2, name: "Joint Pain", description: "Relief for arthritis and joint problems", icon: "solar:bone-bold", sort_order: 2, product_count: 6 },
//     { id: 3, name: "Muscle Pain", description: "Topical and oral treatments for muscle pain", icon: "solar:dumbbell-bold", sort_order: 3, product_count: 6 },
//     { id: 4, name: "Back Pain Relief", description: "Specialized treatment for back pain", icon: "solar:back-bold", sort_order: 4, product_count: 6 },
//     { id: 5, name: "Menstrual Pain", description: "Relief for menstrual cramps and pain", icon: "solar:calendar-date-bold", sort_order: 5, product_count: 6 }
//   ],
//   2: [ // Cold & Flu
//     { id: 4, name: "Antihistamines", description: "Allergy and cold symptom relief", icon: "solar:shield-plus-bold", sort_order: 1, product_count: 4 },
//     { id: 5, name: "Cough Syrup", description: "Syrups for dry and wet cough", icon: "solar:bottle-bold", sort_order: 2, product_count: 4 },
//     { id: 6, name: "Nasal Decongestants", description: "Relief for blocked nose", icon: "solar:nose-bold", sort_order: 3, product_count: 4 }
//   ],
//   3: [ // Vitamins & Supplements
//     { id: 6, name: "Vitamin D", description: "Vitamin D supplements for bone health", icon: "solar:sun-bold", sort_order: 1, product_count: 6 },
//     { id: 7, name: "Multivitamins", description: "Complete vitamin and mineral supplements", icon: "solar:pills-3-bold", sort_order: 2, product_count: 6 },
//     { id: 8, name: "Vitamin C", description: "Immunity boosting vitamin C", icon: "solar:lemon-bold", sort_order: 3, product_count: 6 },
//     { id: 9, name: "Minerals", description: "Essential mineral supplements", icon: "solar:mineral-bold", sort_order: 4, product_count: 7 }
//   ],
//   4: [ // Digestive Health
//     { id: 8, name: "Antacids", description: "Relief from acidity and heartburn", icon: "solar:bottle-bold", sort_order: 1, product_count: 4 },
//     { id: 9, name: "Acid Blockers", description: "Proton pump inhibitors", icon: "solar:shield-cross-bold", sort_order: 2, product_count: 4 },
//     { id: 10, name: "Probiotics", description: "Good bacteria for gut health", icon: "solar:bacteria-bold", sort_order: 3, product_count: 3 },
//     { id: 11, name: "Digestive Enzymes", description: "Aids in digestion", icon: "solar:atom-bold", sort_order: 4, product_count: 3 }
//   ],
//   5: [ // Heart Care
//     { id: 9, name: "Cardioprotective", description: "Heart protection medications", icon: "solar:heart-pulse-bold", sort_order: 1, product_count: 4 },
//     { id: 10, name: "Cholesterol Management", description: "Cholesterol lowering drugs", icon: "solar:chart-square-bold", sort_order: 2, product_count: 3 },
//     { id: 11, name: "Blood Pressure", description: "Hypertension management", icon: "solar:pulse-2-bold", sort_order: 3, product_count: 3 }
//   ],
//   6: [ // Skincare & Dermatology
//     { id: 10, name: "Moisturizers", description: "Skin hydration and care", icon: "solar:water-drop-bold", sort_order: 1, product_count: 4 },
//     { id: 11, name: "Antifungal", description: "Fungal infection treatments", icon: "solar:virus-bold", sort_order: 2, product_count: 4 },
//     { id: 12, name: "Sunscreen", description: "UV protection products", icon: "solar:sun-2-bold", sort_order: 3, product_count: 4 },
//     { id: 13, name: "Antiseptic", description: "Wound care and antiseptics", icon: "solar:adhesive-plaster-bold", sort_order: 4, product_count: 4 }
//   ]
// };

// // Utility function to simulate API delay
// const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// // Pharmacy API Service
// export const pharmacyApi = {
//   // Configuration APIs
//   config: {
//     async get() {
//       await simulateDelay(600);
//       return mockApiResponses.pharmacy_config;
//     },

//     async update(data) {
//       await simulateDelay(1000);
//       return {
//         ...mockApiResponses.pharmacy_config,
//         ...data,
//         last_updated: new Date().toISOString().split('T')[0]
//       };
//     },

//     async create(data) {
//       await simulateDelay(1000);
//       return {
//         ...data,
//         id: Date.now(),
//         is_active: true,
//         last_updated: new Date().toISOString().split('T')[0]
//       };
//     }
//   },

//   // Categories APIs
//   categories: {
//     async getAll(params = {}) {
//       await simulateDelay(500);
//       let categories = [...mockApiResponses.pharmacy_categories];

//       if (params.is_featured !== undefined) {
//         categories = categories.filter(cat => cat.is_featured === (params.is_featured === 'true' || params.is_featured === true));
//       }

//       if (params.search) {
//         const search = params.search.toLowerCase();
//         categories = categories.filter(cat =>
//           cat.name.toLowerCase().includes(search) ||
//           cat.description.toLowerCase().includes(search)
//         );
//       }

//       if (params.ordering) {
//         const field = params.ordering.replace('-', '');
//         const desc = params.ordering.startsWith('-');
//         categories.sort((a, b) => {
//           const aVal = a[field];
//           const bVal = b[field];
//           if (typeof aVal === 'string') {
//             return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
//           }
//           return desc ? bVal - aVal : aVal - bVal;
//         });
//       }

//       return categories;
//     },

//     async getById(id) {
//       await simulateDelay(400);
//       const category = mockApiResponses.pharmacy_categories.find(cat => cat.id === parseInt(id, 10));
//       if (!category) throw new Error('Category not found');

//       return {
//         ...category,
//         subcategories: subcategoriesMap[category.id] || []
//       };
//     },

//     async getFeatured() {
//       await simulateDelay(300);
//       return mockApiResponses.pharmacy_categories.filter(cat => cat.is_featured);
//     }
//   },

//   // Subcategories APIs
//   subcategories: {
//     async getAll(params = {}) {
//       await simulateDelay(400);
//       let allSubcategories = [];

//       Object.entries(subcategoriesMap).forEach(([categoryId, subcats]) => {
//         subcats.forEach(subcat => {
//           allSubcategories.push({
//             ...subcat,
//             category_id: parseInt(categoryId, 10)
//           });
//         });
//       });

//       if (params.category) {
//         const categoryId = parseInt(params.category, 10);
//         allSubcategories = allSubcategories.filter(sub => sub.category_id === categoryId);
//       }

//       if (params.search) {
//         const search = params.search.toLowerCase();
//         allSubcategories = allSubcategories.filter(sub =>
//           sub.name.toLowerCase().includes(search) ||
//           sub.description.toLowerCase().includes(search)
//         );
//       }

//       return allSubcategories;
//     },

//     async getById(id) {
//       await simulateDelay(300);
//       let foundSubcategory = null;

//       Object.entries(subcategoriesMap).forEach(([categoryId, subcats]) => {
//         const subcat = subcats.find(s => s.id === parseInt(id, 10));
//         if (subcat) {
//           foundSubcategory = {
//             ...subcat,
//             category_id: parseInt(categoryId, 10)
//           };
//         }
//       });

//       if (!foundSubcategory) throw new Error('Subcategory not found');
//       return foundSubcategory;
//     },

//     async getByCategory(categoryId) {
//       await simulateDelay(350);
//       return subcategoriesMap[parseInt(categoryId, 10)] || [];
//     }
//   },

//   // Products APIs
//   products: {
//     async getAll(params = {}) {
//       await simulateDelay(600);
//       let products = [...mockApiResponses.pharmacy_products.results];

//       if (params.category) {
//         const categoryId = parseInt(params.category, 10);
//         products = products.filter(product => product.category_id === categoryId);
//       }

//       if (params.subcategory) {
//         const subcategoryId = parseInt(params.subcategory, 10);
//         products = products.filter(product => product.subcategory_id === subcategoryId);
//       }

//       if (params.brand) {
//         products = products.filter(product =>
//           product.brand.toLowerCase().includes(params.brand.toLowerCase())
//         );
//       }

//       if (params.is_bestseller !== undefined) {
//         const isBestseller = params.is_bestseller === 'true' || params.is_bestseller === true;
//         products = products.filter(product => product.is_bestseller === isBestseller);
//       }

//       if (params.min_price) {
//         products = products.filter(product => parseFloat(product.price) >= parseFloat(params.min_price));
//       }

//       if (params.max_price) {
//         products = products.filter(product => parseFloat(product.price) <= parseFloat(params.max_price));
//       }

//       if (params.min_rating) {
//         products = products.filter(product => parseFloat(product.rating) >= parseFloat(params.min_rating));
//       }

//       if (params.search) {
//         const search = params.search.toLowerCase();
//         products = products.filter(product =>
//           product.name.toLowerCase().includes(search) ||
//           product.description.toLowerCase().includes(search) ||
//           product.brand.toLowerCase().includes(search) ||
//           product.category_name.toLowerCase().includes(search)
//         );
//       }

//       if (params.ordering) {
//         const field = params.ordering.replace('-', '');
//         const desc = params.ordering.startsWith('-');

//         products.sort((a, b) => {
//           let aVal = a[field];
//           let bVal = b[field];

//           if (field === 'price' || field === 'rating') {
//             aVal = parseFloat(aVal);
//             bVal = parseFloat(bVal);
//           }

//           if (field === 'created_at') {
//             aVal = new Date(aVal);
//             bVal = new Date(bVal);
//           }

//           if (typeof aVal === 'string' && typeof bVal === 'string') {
//             return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
//           }

//           if (desc) {
//             return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
//           }
//           return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
//         });
//       }

//       const page = parseInt(params.page, 10) || 1;
//       const limit = parseInt(params.limit, 10) || 12;
//       const start = (page - 1) * limit;
//       const end = start + limit;

//       return {
//         count: products.length,
//         next: end < products.length ? `?page=${page + 1}` : null,
//         previous: page > 1 ? `?page=${page - 1}` : null,
//         results: products.slice(start, end)
//       };
//     },

//     async getById(id) {
//       await simulateDelay(400);
//       const product = mockApiResponses.pharmacy_products.results.find(p => p.id === parseInt(id, 10));
//       if (!product) throw new Error('Product not found');

//       return {
//         ...product,
//         images: [
//           product.image_url,
//           product.image_url.replace('300x300', '400x400'),
//           product.image_url.replace('300x300', '500x500')
//         ],
//         composition: "As per manufacturer specification",
//         dosage: "Take as directed by physician or as per package instructions",
//         benefits: [
//           "Clinically proven effectiveness",
//           "Fast-acting relief",
//           "Trusted brand quality",
//           "Safe for regular use"
//         ],
//         side_effects: [
//           "Mild stomach upset (rare)",
//           "Drowsiness (if applicable)",
//           "Consult doctor if symptoms persist"
//         ],
//         storage_instructions: "Store in a cool, dry place away from sunlight",
//         expiry_info: "Check package for expiry date",
//         manufacturer_info: `Manufactured by ${product.brand}`,
//         warnings: [
//           "Keep out of reach of children",
//           "Do not exceed recommended dose",
//           "Consult doctor if pregnant or breastfeeding"
//         ]
//       };
//     },

//     async getBestsellers() {
//       await simulateDelay(500);
//       return mockApiResponses.pharmacy_products.results.filter(p => p.is_bestseller);
//     },

//     async getByCategory(categoryId) {
//       await simulateDelay(550);
//       return mockApiResponses.pharmacy_products.results.filter(product =>
//         product.category_id === parseInt(categoryId, 10)
//       );
//     },

//     async getBySubcategory(subcategoryId) {
//       await simulateDelay(550);
//       return mockApiResponses.pharmacy_products.results.filter(product =>
//         product.subcategory_id === parseInt(subcategoryId, 10)
//       );
//     }
//   },

//   // Cart APIs
//   cart: {
//     async get() {
//       await simulateDelay(400);
//       return mockApiResponses.pharmacy_cart;
//     },

//     async addItem(productId, quantity = 1) {
//       await simulateDelay(600);
//       const product = mockApiResponses.pharmacy_products.results.find(p => p.id === parseInt(productId, 10));
//       if (!product) throw new Error('Product not found');

//       const existingCart = mockApiResponses.pharmacy_cart;
//       const existingItem = existingCart.items.find(item => item.product.id === parseInt(productId, 10));

//       if (existingItem) {
//         existingItem.quantity += quantity;
//         existingItem.total_price = (parseFloat(existingItem.unit_price) * existingItem.quantity).toFixed(2);
//         existingItem.total_original_price = (parseFloat(existingItem.original_unit_price) * existingItem.quantity).toFixed(2);
//         existingItem.savings_amount = (parseFloat(existingItem.total_original_price) - parseFloat(existingItem.total_price)).toFixed(2);
//       } else {
//         const newItem = {
//           id: Date.now(),
//           product,
//           quantity,
//           unit_price: product.price,
//           original_unit_price: product.original_price,
//           total_price: (parseFloat(product.price) * quantity).toFixed(2),
//           total_original_price: (parseFloat(product.original_price) * quantity).toFixed(2),
//           savings_amount: ((parseFloat(product.original_price) - parseFloat(product.price)) * quantity).toFixed(2),
//           discount_percentage: product.discount_percentage,
//           added_at: new Date().toISOString()
//         };
//         existingCart.items.push(newItem);
//       }

//       existingCart.total_items = existingCart.items.reduce((sum, item) => sum + item.quantity, 0);
//       existingCart.unique_items_count = existingCart.items.length;
//       existingCart.subtotal = existingCart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);
//       existingCart.total_savings = existingCart.items.reduce((sum, item) => sum + parseFloat(item.savings_amount), 0).toFixed(2);

//       const subtotalAmount = parseFloat(existingCart.subtotal);
//       existingCart.delivery_charge = subtotalAmount >= 500 ? "0.00" : "50.00";
//       existingCart.total_amount = (subtotalAmount + parseFloat(existingCart.delivery_charge)).toFixed(2);

//       existingCart.prescription_required = existingCart.items.some(item => item.product.is_prescription_required);

//       return existingCart;
//     },

//     async updateQuantity(productId, quantity) {
//       await simulateDelay(500);
//       const existingCart = mockApiResponses.pharmacy_cart;
//       const item = existingCart.items.find(cartItem => cartItem.product.id === parseInt(productId, 10));

//       if (!item) throw new Error('Item not found in cart');

//       if (quantity <= 0) {
//         return this.removeItem(productId);
//       }

//       item.quantity = quantity;
//       item.total_price = (parseFloat(item.unit_price) * quantity).toFixed(2);
//       item.total_original_price = (parseFloat(item.original_unit_price) * quantity).toFixed(2);
//       item.savings_amount = (parseFloat(item.total_original_price) - parseFloat(item.total_price)).toFixed(2);

//       existingCart.total_items = existingCart.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
//       existingCart.subtotal = existingCart.items.reduce((sum, cartItem) => sum + parseFloat(cartItem.total_price), 0).toFixed(2);
//       existingCart.total_savings = existingCart.items.reduce((sum, cartItem) => sum + parseFloat(cartItem.savings_amount), 0).toFixed(2);

//       const subtotalAmount = parseFloat(existingCart.subtotal);
//       existingCart.delivery_charge = subtotalAmount >= 500 ? "0.00" : "50.00";
//       existingCart.total_amount = (subtotalAmount + parseFloat(existingCart.delivery_charge)).toFixed(2);

//       existingCart.prescription_required = existingCart.items.some(cartItem => cartItem.product.is_prescription_required);
//       return existingCart;
//     },

//     async removeItem(productId) {
//       await simulateDelay(400);
//       const existingCart = mockApiResponses.pharmacy_cart;
//       existingCart.items = existingCart.items.filter(item => item.product.id !== parseInt(productId, 10));

//       existingCart.total_items = existingCart.items.reduce((sum, item) => sum + item.quantity, 0);
//       existingCart.unique_items_count = existingCart.items.length;
//       existingCart.subtotal = existingCart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);
//       existingCart.total_savings = existingCart.items.reduce((sum, item) => sum + parseFloat(item.savings_amount), 0).toFixed(2);

//       const subtotalAmount = parseFloat(existingCart.subtotal);
//       existingCart.delivery_charge = subtotalAmount >= 500 ? "0.00" : "50.00";
//       existingCart.total_amount = (subtotalAmount + parseFloat(existingCart.delivery_charge)).toFixed(2);

//       existingCart.prescription_required = existingCart.items.some(item => item.product.is_prescription_required);

//       return existingCart;
//     },

//     async clear() {
//       await simulateDelay(350);
//       return {
//         ...mockApiResponses.pharmacy_cart,
//         items: [],
//         total_items: 0,
//         unique_items_count: 0,
//         subtotal: "0.00",
//         total_savings: "0.00",
//         delivery_charge: "0.00",
//         total_amount: "0.00",
//         prescription_required: false
//       };
//     },

//     async getSummary() {
//       await simulateDelay(250);
//       const cart = mockApiResponses.pharmacy_cart;
//       return {
//         total_items: cart.total_items,
//         unique_items_count: cart.unique_items_count,
//         subtotal: cart.subtotal,
//         total_savings: cart.total_savings,
//         delivery_charge: cart.delivery_charge,
//         total_amount: cart.total_amount,
//         prescription_required: cart.prescription_required,
//         prescription_items_count: cart.items.filter(item => item.product.is_prescription_required).length,
//         free_delivery_eligible: parseFloat(cart.subtotal) >= 500
//       };
//     }
//   },

//   // Orders APIs (for checkout flow)
//   orders: {
//     async create(orderData) {
//       await simulateDelay(1000);
//       return {
//         id: Date.now(),
//         order_number: `ORD${Date.now()}`,
//         status: 'confirmed',
//         total_amount: orderData.total_amount,
//         delivery_address: orderData.delivery_address,
//         payment_method: orderData.payment_method,
//         estimated_delivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//         created_at: new Date().toISOString(),
//         items: orderData.items
//       };
//     },

//     async getById(id) {
//       await simulateDelay(500);
//       return {
//         id: parseInt(id, 10),
//         order_number: `ORD${id}`,
//         status: 'confirmed',
//         total_amount: "125.00",
//         delivery_address: {
//           name: "John Doe",
//           phone: "+91 98765 43210",
//           address: "123 Main Street, Apartment 4B",
//           city: "Mumbai",
//           state: "Maharashtra",
//           pincode: "400001"
//         },
//         payment_method: "Card",
//         estimated_delivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//         created_at: new Date().toISOString(),
//         items: mockApiResponses.pharmacy_cart.items
//       };
//     }
//   }
// };

// // Export individual API groups for convenience
// export const {
//   config: configApi,
//   categories: categoriesApi,
//   subcategories: subcategoriesApi,
//   products: productsApi,
//   cart: cartApi,
//   orders: ordersApi
// } = pharmacyApi;

// // Export default
// export default pharmacyApi;
