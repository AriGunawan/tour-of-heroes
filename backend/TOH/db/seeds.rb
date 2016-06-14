# Power data
power1 = Power.create(name: "Really Smart")
power2 = Power.create(name: "Super Strong")
power3 = Power.create(name: "Super Hot")
power4 = Power.create(name: "Weather Changer")
power5 = Power.create(name: "Gadget")
power6 = Power.create(name: "Fighter")

# Hero data
Hero.create(name: "Robin", power_id: power1.id)
Hero.create(name: "Superman", power_id: power2.id)
Hero.create(name: "Deadpool", power_id: power6.id)
Hero.create(name: "Spiderman", power_id: power6.id)
Hero.create(name: "Hulk", power_id: power3.id)
Hero.create(name: "Hawkeye", power_id: power4.id)