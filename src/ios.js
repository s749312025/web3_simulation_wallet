import { Buffer } from "buffer";
import { personalSign } from '@metamask/eth-sig-util';
import { Transaction } from 'ethereumjs-tx'

export const signEvent = (config) => {

    const prBuffer = Buffer.from(config.pr, "hex");
    window.webkit = {
        messageHandlers: {
            _tw_: {
                postMessage(json) {
                    _request(json)
                }
            }
        }
    }
    
    
    const _request = (payload) => {
        switch (payload.name) {
            case 'requestAccounts':
                return sendResults([window.ethereum.address], payload.id)
            case 'signPersonalMessage':
                return signPersonalMessage(payload)
            case 'signTransaction':
                return sendTransaction(payload)
        }
    }
    
    const signPersonalMessage = (payload) => {
        sendResult(personalSign({privateKey: prBuffer, data: payload.object.data}), payload.id)
    }
    
    const sendTransaction = async (payload) => {
        payload.object.nonce = await window.ethereum.request({
            method: "eth_getTransactionCount",
            params: [config.address, "latest"]
        })
        const tx = new Transaction({
            ...payload.object,
            // gasLimit: web3.toHex(21000),
            gasPrice: web3.toHex(web3.toWei('10', 'gwei')), // 1 Gwei
        }, {chain: config.chainId})
        tx.sign(prBuffer)
        const data = await window.ethereum.request({
            method: "eth_sendRawTransaction",
            params: ['0x' + tx.serialize().toString('hex')]
        })
        sendResult(data, payload.id)
    }
    
    const sendResults = (results, id) => {
        window.ethereum.sendResponse(id, results)
    }
    
    const sendResult = (result, id) => {
        window.ethereum.sendResponse(id, result)
    }
}


