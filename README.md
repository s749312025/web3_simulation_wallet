# simulation wallet

simulation wallet can simulation metamask wallet

## How to init ?

1. run `yarn build`
2. you need import 'dist/index.js'

3. init initWallet

```javascript
// exapmle
const config = {
    pr: '', //privateKey
    chainId: 5,
    rpcUrl: '' // rpcUrl
}
window.initWallet(config)
```

