

const Homepage = () => {

  

    const contentContainer = document.querySelector(".main-content")

    

    const welcomeMessage = document.createElement("h1")
    welcomeMessage.classList.add("welcome-message")
    welcomeMessage.textContent = "What is on the agenda for today?"
    contentContainer.appendChild(welcomeMessage)



};

export default Homepage;