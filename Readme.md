# Smart Lock System on Polkadot

## Project Overview

The Smart Lock System leverages the Polkadot blockchain to revolutionize property access control. This innovative solution enhances security, convenience, and flexibility for property owners, renters, and guests. With features like blockchain-enabled security, decentralized access control, and interoperability within the Polkadot ecosystem, our system sets a new standard for modern property management.

### Key Components

- **LockManager Contract**: Manages the creation and association of individual Lock contracts for each user, ensuring personalized access control.
- **Lock Contract**: Provides functionalities for property access management, including adding and managing properties, granting temporary access, and transferring property ownership.
- **Property Contract**: Represents individual properties, allowing operations like renting out the property and opening the property door for access.

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

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Polkadot{.js} wallet's private key:

```plaintext
PRIVATE_KEY="your_private_key_here"
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

### Listening to Contract Events with Go

For real-time interaction and monitoring of our smart contract events, such as detecting when a door is opened, we provide a Go script that listens to emitted events. This is particularly useful for automating responses to contract activities.

#### Setup

Ensure you have Go installed on your system and the `go-ethereum` package is accessible. You can install `go-ethereum` using go get:

```bash
go get github.com/ethereum/go-ethereum
```

#### Running the Listener

```bash
go run event_listener.go
```

## Project Structure

- `contracts/`: Solidity contracts for the Smart Lock System.
- `scripts/`: Deployment and interaction scripts for Hardhat.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.