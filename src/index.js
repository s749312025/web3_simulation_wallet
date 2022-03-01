import '../provider/index.js'

import { signEvent } from './ios.js'

import { init } from './init.js'
import { privateKeyToAccount } from './utils'

// const config = {
//     pr: '', //privateKey
//     chainId: 5,
//     rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
// }

window.initWallet = (config) => {
    if (config.pr) {
        config.address = privateKeyToAccount(config.pr)
    }
    init(config)    // 初始化web3和wallet
    signEvent(config)   // 初始化ios模拟事件
}