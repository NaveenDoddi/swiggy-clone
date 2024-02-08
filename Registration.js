
// CUSTOMER SIGN-UP CODE
const customerForm = document.getElementById("customerForm")
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const mobileInput = document.getElementById('mobile');
// console.log(nameInput, emailInput, mobileInput)

customerForm.addEventListener("submit", function(e){
// function Run() {
    e.preventDefault()
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        mobile: mobileInput.value
    }
    // Read the existing JSON data
    fetch('http://localhost:3000/Data')
        .then(response => response.json())
        .then(jsonData => {
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
        })
        .catch(error => {
            console.error('Error reading JSON file:', error);
        });
})