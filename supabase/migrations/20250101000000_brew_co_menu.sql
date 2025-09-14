/*
  # Add Brew&Co. Complete Menu Items

  1. New Categories
    - Add appetizers, all-day-breakfast, mains, desserts, coffee, non-coffee, matcha, frappes, fizzle-brews, extras categories

  2. New Menu Items
    - Appetizers: French fries, Mojos, Chicken fingers, Sandwiches, Nachos, Brew-ha mix
    - All-day Breakfast: Various silog dishes and platters
    - Mains: Buffalo wings, Pasta dishes, Gyudon
    - Desserts: Cookies, Brownies, Waffles, Tiramisu
    - Coffee: Various coffee drinks with different sizes
    - Non-coffee: Chocolate and strawberry drinks
    - Matcha: Various matcha drinks
    - Frappes: Blended drinks
    - Fizzle Brews: Carbonated drinks
    - Extras: Add-ons and modifications

  3. Features
    - Auto-generated UUIDs for all items
    - Detailed descriptions with serving information
    - Appropriate pricing for each item
    - High-quality food and drink images from Pexels
    - Proper categorization for easy browsing
    - Variations and add-ons where applicable
*/

-- First, add the new categories for Brew&Co.
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('appetizers', 'Appetizers', '🍟', 1, true),
  ('all-day-breakfast', 'All-day Breakfast', '🍳', 2, true),
  ('mains', 'Mains', '🍽️', 3, true),
  ('desserts', 'Desserts', '🍰', 4, true),
  ('coffee', 'Coffee', '☕', 5, true),
  ('non-coffee', 'Non-Coffee', '🫖', 6, true),
  ('matcha', 'Matcha', '🍵', 7, true),
  ('frappes', 'Frappes', '🥤', 8, true),
  ('fizzle-brews', 'Fizzle Brews', '🥂', 9, true),
  ('extras', 'Extras', '➕', 10, true)
ON CONFLICT (id) DO NOTHING;

-- Insert Appetizers
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('French Fries', 'Crispy golden french fries, perfectly seasoned', 149, 'appetizers', true, true, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Mojos', 'Crispy potato wedges with our signature seasoning', 189, 'appetizers', true, true, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Chicken Fingers', 'Tender chicken strips, breaded and fried to perfection', 199, 'appetizers', true, true, 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Ham & Cheese Sandwich', 'Classic ham and cheese sandwich on fresh bread', 220, 'appetizers', false, true, 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Tunamelt Sandwich', 'Melted tuna sandwich with cheese and fresh vegetables', 220, 'appetizers', false, true, 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('BLT Sandwich', 'Bacon, lettuce, and tomato sandwich on toasted bread', 240, 'appetizers', false, true, 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Nachos Overload', 'Loaded nachos with cheese, jalapeños, and all the fixings', 380, 'appetizers', true, true, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Brew-ha Mix (Large)', 'Our signature mix: fries, mojos, chicken fingers, og aioi, gravy, cheese, soy garlic, spicy buffalo, honey butter', 385, 'appetizers', true, true, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Add add-ons for French Fries and Mojos
INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'French Fries'), 'Sour Cream', 30, 'sauces'),
  ((SELECT id FROM menu_items WHERE name = 'French Fries'), 'Cheese', 30, 'sauces'),
  ((SELECT id FROM menu_items WHERE name = 'French Fries'), 'BBQ', 30, 'sauces'),
  ((SELECT id FROM menu_items WHERE name = 'Mojos'), 'Sour Cream', 30, 'sauces'),
  ((SELECT id FROM menu_items WHERE name = 'Mojos'), 'Cheese', 30, 'sauces'),
  ((SELECT id FROM menu_items WHERE name = 'Mojos'), 'BBQ', 30, 'sauces');

-- Insert All-day Breakfast
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bangsilog', 'Classic Filipino breakfast: bangus (milkfish), garlic rice, and fried egg', 180, 'all-day-breakfast', true, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Sausilog', 'Sausage with garlic rice and fried egg - a hearty breakfast', 220, 'all-day-breakfast', true, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Longsilog', 'Sweet Filipino sausage with garlic rice and fried egg', 190, 'all-day-breakfast', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Bacsilog', 'Crispy bacon with garlic rice and fried egg', 200, 'all-day-breakfast', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Cornsilog', 'Corned beef with garlic rice and fried egg', 240, 'all-day-breakfast', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Tapsilog', 'Tapa (cured beef) with garlic rice and fried egg', 250, 'all-day-breakfast', true, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Caramelized Spam', 'Sweet caramelized spam with garlic rice and fried egg', 260, 'all-day-breakfast', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('American Platter', 'Classic American breakfast: eggs, bacon, sausage, toast, and hash browns', 360, 'all-day-breakfast', true, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Sausage Platter', 'Assorted sausages with sides and accompaniments', 480, 'all-day-breakfast', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Add variations for Sausilog
INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'Sausilog'), 'Spicy Cheesy German', 0),
  ((SELECT id FROM menu_items WHERE name = 'Sausilog'), 'Chicken', 0),
  ((SELECT id FROM menu_items WHERE name = 'Sausilog'), 'Hungarian', 0),
  ((SELECT id FROM menu_items WHERE name = 'Sausilog'), 'Shanghai', 0);

-- Insert Mains
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Buffalo Wings', 'Spicy buffalo wings served with celery and blue cheese dip', 300, 'mains', true, true, 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Carbonara', 'Creamy pasta with bacon, egg, and parmesan cheese', 320, 'mains', true, true, 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Truffle Pasta', 'Luxurious pasta with truffle oil and wild mushrooms', 340, 'mains', false, true, 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Shrimp Aglio Olio', 'Spaghetti with shrimp, garlic, olive oil, and chili flakes', 380, 'mains', false, true, 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Gyudon', 'Japanese beef bowl with rice, onions, and savory sauce', 380, 'mains', true, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Desserts
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Cookies', 'Freshly baked chocolate chip cookies', 95, 'desserts', true, true, 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Brownies', 'Rich chocolate brownies with fudge center', 95, 'desserts', true, true, 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Biscoff Brownies', 'Brownies with Biscoff cookie crumble and caramel', 125, 'desserts', false, true, 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Waffles', 'Belgian-style waffles with your choice of topping', 220, 'desserts', true, true, 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Tiramisu Cake', 'Classic Italian tiramisu with coffee and mascarpone', 285, 'desserts', true, true, 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Tiramisu Combo', 'Tiramisu with coffee or tea pairing', 299, 'desserts', false, true, 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Add variations for Waffles
INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'Waffles'), 'Chocolate', 0),
  ((SELECT id FROM menu_items WHERE name = 'Waffles'), 'Caramel', 0);

-- Add variations for Tiramisu Combo
INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'Tiramisu Combo'), 'Original', 0),
  ((SELECT id FROM menu_items WHERE name = 'Tiramisu Combo'), 'Matcha', 0),
  ((SELECT id FROM menu_items WHERE name = 'Tiramisu Combo'), 'Biscoff', 0),
  ((SELECT id FROM menu_items WHERE name = 'Tiramisu Combo'), 'Pistachio Matcha', 0);

-- Add upgrade option for Tiramisu Combo
INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'Tiramisu Combo'), 'Upgrade to Uji Matcha', 50, 'upgrades');

-- Insert Coffee
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Americano', 'Classic espresso with hot water', 130, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Iced Latte', 'Espresso with cold milk over ice', 140, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Vanilla Latte', 'Espresso with vanilla syrup and steamed milk', 140, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Caramel Latte', 'Espresso with caramel syrup and steamed milk', 140, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Hazelnut Latte', 'Espresso with hazelnut syrup and steamed milk', 140, 'coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Salted Caramel Latte', 'Espresso with salted caramel syrup and steamed milk', 140, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Brown Sugar Latte', 'Espresso with brown sugar syrup and steamed milk', 140, 'coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Caramel Macchiato', 'Espresso with vanilla syrup, steamed milk, and caramel drizzle', 150, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('White Chocolate Mocha', 'Espresso with white chocolate syrup and steamed milk', 150, 'coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Mocha', 'Espresso with chocolate syrup and steamed milk', 160, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Toffee Nut Latte', 'Espresso with toffee nut syrup and steamed milk', 160, 'coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Spanish Latte', 'Espresso with condensed milk and steamed milk', 160, 'coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Sea Salt Latte', 'Espresso with sea salt foam and steamed milk', 200, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Creme Brulee', 'Espresso with creme brulee syrup and steamed milk', 200, 'coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Biscoff Latte', 'Espresso with Biscoff cookie syrup and steamed milk', 200, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Brew-ha Special', 'Our signature coffee blend with special house syrup', 200, 'coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Non-Coffee
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Milky Chocolate', 'Rich chocolate drink with milk', 180, 'non-coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Milky Strawberry', 'Creamy strawberry drink with milk', 180, 'non-coffee', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Strawberry Chocolate', 'Combination of strawberry and chocolate flavors', 200, 'non-coffee', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Matcha
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Creamy Matcha Latte', 'Smooth matcha with steamed milk', 190, 'matcha', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Uji Matcha Latte', 'Premium Uji matcha with steamed milk', 200, 'matcha', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Caramel Matcha', 'Matcha with caramel syrup and steamed milk', 190, 'matcha', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Strawberry Matcha', 'Matcha with strawberry syrup and steamed milk', 200, 'matcha', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Salted Cream Matcha', 'Matcha with salted cream foam', 200, 'matcha', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Add upgrade option for matcha drinks
INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'Creamy Matcha Latte'), 'Upgrade to Uji Matcha', 50, 'upgrades'),
  ((SELECT id FROM menu_items WHERE name = 'Caramel Matcha'), 'Upgrade to Uji Matcha', 50, 'upgrades'),
  ((SELECT id FROM menu_items WHERE name = 'Strawberry Matcha'), 'Upgrade to Uji Matcha', 50, 'upgrades'),
  ((SELECT id FROM menu_items WHERE name = 'Salted Cream Matcha'), 'Upgrade to Uji Matcha', 50, 'upgrades');

-- Insert Frappes
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Java Chip', 'Coffee frappe with chocolate chips', 190, 'frappes', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Strawberry Cheesecake', 'Strawberry frappe with cheesecake flavor', 190, 'frappes', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('White Choco Matcha', 'Matcha frappe with white chocolate', 190, 'frappes', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Choco Caramel Brownie', 'Chocolate frappe with caramel and brownie pieces', 200, 'frappes', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Espresso Frappe', 'Strong coffee frappe with espresso', 200, 'frappes', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Biscoff', 'Frappe with Biscoff cookie flavor', 200, 'frappes', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Fizzle Brews
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Berry Lichee', 'Refreshing berry and lychee carbonated drink', 150, 'fizzle-brews', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Lemon Freeze', 'Tart lemon carbonated drink', 150, 'fizzle-brews', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Passionfruit Swizzle', 'Tropical passionfruit carbonated drink', 150, 'fizzle-brews', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Extras
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Plain Rice', 'Steamed white rice', 35, 'extras', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Garlic Rice', 'Fried rice with garlic', 45, 'extras', true, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Extra Egg', 'Additional fried egg', 35, 'extras', false, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Extra Shot', 'Additional espresso shot', 30, 'extras', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Extra Cream', 'Additional cream', 35, 'extras', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Extra Pump', 'Additional syrup pump', 35, 'extras', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Oat Milk', 'Substitute with oat milk', 50, 'extras', true, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Coffee Jelly', 'Coffee-flavored jelly cubes', 30, 'extras', false, true, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800');
