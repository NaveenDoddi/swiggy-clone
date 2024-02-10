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
            const arr = jsonData.Restaurants
            function checking(arr){
                for(var i = 0;i < arr.length;i++){
                    if(arr[i].email == emailInput.value){
                        emailInput.value = ""
                        document.getElementById("invalid-email").innerText = "This email is already exists"
                        return false
                    }
                    else{
                        document.getElementById("invalid-email").innerText = ""
                    }
                    if(arr[i].mobile == mobileInput.value){
                        mobileInput.value = ""
                        document.getElementById("invalid-mobile").innerText = "This number is already exists"
                        return false
                    }
                    else{
                        document.getElementById("invalid-mobile").innerText = ""
                    }
                }
                return true
            }
            if(checking(arr) == true){
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
            }  
        })
        .catch(error => {
            console.error('Error reading JSON file:', error);
        });
})
