Department.create(id: 1, name: Faker::Commerce.department, description: "Imported from the most exotic destinations in the world")
Department.create(id: 2, name: Faker::Commerce.department, description: "We take our products very seriously")
Department.create(id: 3, name: Faker::Commerce.department, description: "We take our products very seriously")


30.times do 
  Product.create(name: Faker::Commerce.product_name, description: Faker::Movies::HitchhikersGuideToTheGalaxy.quote, price: Faker::Commerce.price, department_id: 1)
end

125.times do 
  Product.create(name: Faker::Commerce.product_name, description: Faker::Movies::HitchhikersGuideToTheGalaxy.quote, price: Faker::Commerce.price, department_id: 2)
end


70.times do 
  Product.create(name: Faker::Commerce.product_name, description: Faker::Movies::HitchhikersGuideToTheGalaxy.quote, price: Faker::Commerce.price, department_id: 3)
end

puts "seeded"