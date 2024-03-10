# Smart Lock System on Polkadot

## Project Overview

The Smart Lock System leverages the Polkadot blockchain to revolutionize property access control. This innovative solution enhances security, convenience, and flexibility for property owners, renters, and guests. With features like blockchain-enabled security, decentralized access control, and interoperability within the Polkadot ecosystem, our system sets a new standard for modern property management.

### Key Components

- **LockManager Contract**: Manages the creation and association of individual Lock contracts for each user, ensuring personalized access control.
- **Lock Contract**: Provides functionalities for property access management, including adding and managing properties, granting temporary access, and transferring property ownership.
- **Property Contract**: Represents individual properties, allowing operations like renting out the property and opening the property door for access.
- **Property CLI**:Listens the smart contract which represents the property, and, when the requierd event is emitted, opens the door.
- **App**:An user manages the lock contracts to add property or rent it moreover, the user can reach the property contract by lock contract and opens the door.

### Listening to Contract Events with Go

For real-time interaction and monitoring of our smart contract events, such as detecting when a door is opened, we provide a Go script that listens to emitted events. This is particularly useful for automating responses to contract activities.

#### Architecture

- Each property objects represent smart contract. Emit event arrows represent the cli of the property and, openning door is done by cli.

<img width="835" alt="Screenshot 2024-03-11 at 02 08 48" src="https://github.com/DogukanGun/BlockLockProject/assets/59707019/206cab9b-4e1d-47bf-9c51-86527850c6ad">

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- A Metamask wallet with testnet tokens of Moonbeam
- Hardhat for compiling, deploying, and verifying smart contracts

### Installation

1. Clone the repository:

```bash
git clone
cd blocklock
```

2. Install dependencies for app:

```bash
cd block-lock-web-app
npm install
```

3. Create a `.env` file in the root directory and add your Polkadot{.js} wallet's private key:

```plaintext
PRIVATE_KEY="your_private_key_here"
```

#### Setup For ClI

Ensure you have Go installed on your system and the `go-ethereum` package is accessible. You can install `go-ethereum` using go get:

```bash
cd Hardware
```

```bash
go get github.com/ethereum/go-ethereum
```

#### Running the CLI

```bash
go run event_listener.go
```

### Compiling Contracts

Compile the smart contracts using Hardhat:

```bash
npx hardhat compile
```

### Deploying Contracts

Deploy the contracts to the Moonbase Alpha testnet:

```bash
npx hardhat run scripts/deploy.js --network moonbase
```

### Verifying Contracts

Verify the deployed contracts on the Moonbeam block explorer:

```bash
npx hardhat verify --network moonbase DEPLOYED_CONTRACT_ADDRESS "Constructor Argument 1" "Constructor Argument 2"
```

## Interacting with the Contracts

### Script Interaction

- Use Hardhat scripts to interact with your contracts by invoking contract methods through ethers.js in your scripts.

## Project Structure

- `contracts/`: Solidity contracts for the Smart Lock System.
- `scripts/`: Deployment and interaction scripts for Hardhat.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
