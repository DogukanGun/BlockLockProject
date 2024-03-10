async function main() {
  const [deployer] = await ethers.getSigners();


  // Parameters for the Property contract deployment
  const propertyName = "Old Lion";
  const propertyLocation = "Munich";
  const ownerAddress = deployer.address; 

  console.log("Deploying contracts with the account:", deployer.address);

  const propertyContract = await ethers.getContractFactory("Property");
  const PropertyContract = await propertyContract.deploy(propertyName, propertyLocation, ownerAddress);

  console.log("Property address:", PropertyContract.target);

  const lockContract = await ethers.getContractFactory("Lock");
  const LockContract = await lockContract.deploy(ownerAddress);

  console.log("Lock address:", LockContract.target);

  const lockManagerContract = await ethers.getContractFactory("LockManager");
  const LockManagerContract = await lockManagerContract.deploy();

  console.log("LockManager address:", LockManagerContract.target);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
