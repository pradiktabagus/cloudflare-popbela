
# Remote Config

Remote config firebase digunakan untuk togle flag fitur yang udah di kerjakan tapi belum di rilis.
```
const firebaseConfig = {
    apiKey: 'AIzaSyC-QM9gpgKr7hbRZPkHIvmyF83aLKq2tWo',
    authDomain: 'popbela-4f357.firebaseapp.com',
    projectId: 'popbela-4f357',
    storageBucket: 'popbela-4f357.appspot.com',
    messagingSenderId: '870774788708',
    appId: '1:870774788708:web:f2be8dc9beed4667d0c571',
}
```

## Flags Provider
Flag provider digunakan untuk menyimpan semua flags yang di dapatkan dari `getRemoteConfig()`. Untuk mengganti fetch interval dan config bisa dilakukan di `FlagWrapper`

### Format flags 
    ```
    [
        {
            flag: string; //name flag
            value: string; //value flag dari firebase
        }
    ]
    ```
## Cara pemakaian remote config
Untuk menggunakan remote config gunakan hooks `useGetToggleFlag(keyword: string)` pada component
### Contoh
```
    const Index = () => {
        const flag = useGetToggleFlag('flag_name')
        console.log(flag)
        return (
            <>
                //code...
            <>
        )
    } 
```    