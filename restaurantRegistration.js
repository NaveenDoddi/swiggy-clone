//Restaurant Sign-up here
const restaurantForm = document.getElementById("restaurantForm")
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const restaurantInput = document.getElementById('restaurant');
const mobileInput = document.getElementById('mobile');
restaurantForm.addEventListener("submit", function(e){
    
    e.preventDefault()
    const formData = {
        username: nameInput.value,
        email: emailInput.value,
        restaurant: restaurantInput.value,
        address: addressInput.value,
        mobile: mobileInput.value
    }
    console.log(formData)
    // Read the existing JSON data
    fetch('http://localhost:3000/Data')
        .then(response => response.json())
        .then(jsonData => {

            jsonData.Restaurants[jsonData.Restaurants.length] = formData

            // Post the modified data to the server
            fetch('http://localhost:3000/Data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then(response => response.json())
                .then(updatedData => {
                    alert("You are signed-up successfully")
                    window.location.href = "RestaurantLogin.html"
                    console.log('Data posted successfully:', updatedData);
                })
                .catch(error => {
                    console.error('Error posting data:', error);
                });
        })
        .catch(error => {
            console.error('Error reading JSON file:', error);
        });
})
