
// CUSTOMER SIGN-UP CODE
const customerForm = document.getElementById("customerForm")

// console.log(nameInput, emailInput, mobileInput)

customerForm.addEventListener("submit", function(e){
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    e.preventDefault()
    const formData = {
        username: nameInput.value,
        email: emailInput.value,
        mobile: mobileInput.value
    }
    // Read the existing JSON data
    fetch('http://localhost:3000/Data')
        .then(response => response.json())
        .then(jsonData => {

            const arr = jsonData.Customers
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
                jsonData.Customers[jsonData.Customers.length] = formData
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
                    window.location.href = "customerLogin.html"
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



