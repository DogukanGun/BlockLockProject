package main

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"log"
)

func main() {
	client, err := ethclient.Dial("wss://moonbase.unitedbloc.com:1001")
	if err != nil {
		log.Fatal("Client connection error", err)
	}
	contractAddress := common.HexToAddress("0xDEC6067cB729d441944FDbE0fd82F48680334168")
	query := ethereum.FilterQuery{
		Addresses: []common.Address{contractAddress},
	}
	logs := make(chan types.Log)
	sub, err := client.SubscribeFilterLogs(context.Background(), query, logs)
	if err != nil {
		log.Fatal("Log subscription error,", err)
	}
	log.Println("Listening is started")
	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case vLog := <-logs:
			if vLog.Topics[0] == common.HexToHash("0x18507b00ac5716f819c8cbc32ff10f4f9c9182dae2dd8faf902e352c817481cf") {
				log.Println(vLog)
				fmt.Println("Door is opened")
			}
		}
	}
}
