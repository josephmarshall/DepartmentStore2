Department.create(id: 1, name: Faker::Commerce.department, description: "The best department in the store")
Department.create(id: 2, name: Faker::Commerce.department, description: "We take our products very seriously")

80.times do 
  Product.create(name: Faker::Commerce.product_name, description: Faker::Movies::HitchhikersGuideToTheGalaxy.quote, price: Faker::Commerce.price, department_id: 1)
end

125.times do 
  Product.create(name: Faker::Commerce.product_name, description: Faker::Movies::HitchhikersGuideToTheGalaxy.quote, price: Faker::Commerce.price, department_id: 2)
end

puts "seeded"