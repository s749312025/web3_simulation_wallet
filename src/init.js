export const init = (config) => {
    window.ethereum = new trustwallet.Provider(config);
    window.ethereum.isDebug = true
    window.web3 = new trustwallet.Web3(window.ethereum);
    trustwallet.postMessage = (jsonString) => {
        console.log({jsonString})
        webkit.messageHandlers._tw_.postMessage(jsonString)
    };

    window.web3.eth.defaultAccount = config.address;
    window.chrome = {webstore: {}};
}