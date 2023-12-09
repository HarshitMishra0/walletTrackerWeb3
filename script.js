const axios = require('axios');


const walletAddress = '0x29d7d1dd5b6f9c864d9db560d72a247c178ae86b';
const etherscanApiKey = '7C5XE12IAN5ZMBAT85FMXN3FA6K3ZSV35X';

const getWalletInfo = async () => {
  try {
    const balanceResponse = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'balance',
        address: walletAddress,
        tag: 'latest',
        apikey: etherscanApiKey
      }
    });
    const balance = balanceResponse.data.result;
    document.getElementById('balance').innerText = balance;

    const transactionsResponse = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address: walletAddress,
        startblock: 0,
        endblock: 99999999,
        sort: 'desc',
        apikey: etherscanApiKey
      }
    });
    const transactions = transactionsResponse.data.result;
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';  // Clear previous transactions

    transactions.forEach(transaction => {
      const li = document.createElement('li');
      const transactionInfo = `
        Block Number: ${transaction.blockNumber}
        Time Stamp: ${new Date(transaction.timeStamp * 1000)} 
        Hash: ${transaction.hash}
        Nonce: ${transaction.nonce}
        Block Hash: ${transaction.blockHash}
        Transaction Index: ${transaction.transactionIndex}
        From: ${transaction.from}
        To: ${transaction.to}
        Value: ${transaction.value} wei
        Gas: ${transaction.gas}
        Gas Price: ${transaction.gasPrice} wei
        Is Error: ${transaction.isError === '1' ? 'Yes' : 'No'}
        Gas Used: ${transaction.gasUsed}
        Confirmations: ${transaction.confirmations}
      `;

      li.textContent = transactionInfo;
      transactionsList.appendChild(li);
    });

  } catch (error) {
    console.error('Error fetching wallet information:', error);
  }
};

setInterval(getWalletInfo, 10000);
getWalletInfo();  // Fetch wallet info initially
