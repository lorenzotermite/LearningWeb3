import { Injectable } from '@angular/core';
import Web3 from 'web3';
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  web3: Web3 = new Web3();
  accounts: Array<string> = [];

  constructor() {}

  async enableDapp() {
    if (typeof window.ethereum !== 'undefined') {
      //check if metamask install
      try {
        this.accounts = await window.ethereum.request({
          //nel caso di successo effetteuera una richiesta dell' account
          method: 'eth_requestAccounts',
        });
        this.web3 = new Web3(window.ethereum);
      } catch (error: any) {
        //nel caso l'utente clicchi cancel
        if (error.code === 4001) {
          alert('Need permission to access MetaMask');
        } else {
          console.log(error.message);
        }
      }
    } else {
      alert('Need to install MetaMask'); //nel caso non è installato
    }
  }

  eventResult: string = '';
  abi: any = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: '_from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'TokenSent',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'sendToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'tokenBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  async listenToEvents() {
    let web3 = new Web3(window.ethereum);
    var contractInstance = new web3.eth.Contract(
      this.abi,
      '0x55A942a9A5C378F31dC72a051c93499F7cE5F7eE'
    );

    // contractInstance.events.TokenSent().on('data', (event: any) => {
    //   console.log(event);
    //   this.eventResult = JSON.stringify(event);
    // });

    contractInstance
      .getPastEvents('TokenSent', {
        filter: { _to: '0xeE8342019F5D8a9C936iF757a41fdD9F8CBf69e7' },
        fromBlock: 0,
      })
      .then((event: any) => {
        console.log(event);
        this.eventResult = JSON.stringify(event);
      });
  }
}
