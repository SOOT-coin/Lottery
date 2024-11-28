let web3;
let lotteryContract;

// Replace with your deployed Lottery contract address
const lotteryAddress = "0x1f281942825ae1e0654a8563A198F9B70786ea39";

// Replace with your Lottery contract's ABI (provided earlier)
const lotteryABI = [
    {
        "inputs": [{"internalType": "address", "name": "_sootToken", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "enterLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getParticipants",
        "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Function to connect MetaMask wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            document.getElementById("account").innerText = `Wallet: ${accounts[0]}`;
            lotteryContract = new web3.eth.Contract(lotteryABI, lotteryAddress);
            alert("Wallet connected successfully!");
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet. Please try again.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
    }
}

// Function to enter the lottery with selected ticket amount
async function enterLottery() {
    try {
        const accounts = await web3.eth.getAccounts();
        const selectedAmount = document.getElementById("ticketAmount").value;

        // Each ticket costs 1000 SOOT
        const totalAmount = selectedAmount * 1000;

        // Call the enterLottery function of the contract
        await lotteryContract.methods.enterLottery(totalAmount).send({
            from: accounts[0]
        });

        document.getElementById("entryStatus").innerText = `Successfully entered the lottery with ${selectedAmount} ticket(s), costing ${totalAmount} SOOT!`;
        document.getElementById("entryStatus").style.color = "green";
    } catch (error) {
        console.error("Error entering lottery:", error);
        document.getElementById("entryStatus").innerText = "Failed to enter the lottery. Please try again.";
        document.getElementById("entryStatus").style.color = "red";
    }
}

// Function to pick a winner from the participants
async function pickWinner() {
    try {
        const accounts = await web3.eth.getAccounts();
        await lotteryContract.methods.pickWinner().send({
            from: accounts[0]
        });

        alert("Winner has been picked successfully!");
    } catch (error) {
        console.error("Error picking winner:", error);
        alert("Failed to pick a winner. Please try again.");
    }
}
