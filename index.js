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
    console.log('Wallet Balance (Wei):', balance);

    // Fetch recent transactions
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
    console.log('Recent Transactions:', transactions);
  } catch (error) {
    console.error('Error fetching wallet information:', error);
  }
};


setInterval(getWalletInfo, 10000);


getWalletInfo();
