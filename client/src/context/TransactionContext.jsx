import React, { useState, useEffect, createContext } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();
const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract; 
}
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo: '', amount:'', keyword:'', message:''});
    const [isLoading,setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const handleChange = (e,name) => {
        setFormData((prevState) => ({...prevState,[name]:e.target.value})); 
    }
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
            else {
                console.log('No accounts found');
            }
        }
        catch (error)  {
            console.log(error);
            throw new Error("No ethereum object.");
        }

        console.log(accounts);
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }

    }
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to:addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message,keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}