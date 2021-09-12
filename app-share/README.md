# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```javascript
import React, {useState, useEffect} from 'react'

const Example = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = 'you clicked $(count)';
    })

    return (
        <div>
            <p>you clicked {count}</p>
            <button onClick={()=>setCount(count + 1)}>Click me</button>
        </div>
    )
}


import React, {useState, useEffect} from 'react';

const Example = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c+1)
        }, 1000)
        return () => clearInterval(id)
    }, [])
    return <h1>H</h1>
}

import React, {useState} from 'react'

const App = () => {
    const [data, setData] = useState({hits: []});
    return (
        <ul>
        {data.hits.(item => (
            <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
        ))}
        </ul>
    )
}
export default App
```

使用useEffect时，依赖项里加上callback会造成无限循环
```javascript
    export const useMount = (callback: () => void) => {
        useEffect(() => {
            callback();
            // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    }
```

## 常见几种错误的现象和解决方法
### 错误一：useEffect在一个页面还在刷新时，退出当前的页面，就会出现此种错误；异步操作的错误，例如当页面需要执行三秒，在执行两秒的时候，退出页面，但是异步 return 还在执行，
### 执行过程中已经找不到data；
    ```javascript
        Warning: can't perform a React state undate on an unmounted component. This is a no-op,but it indicates a memory leak 
        in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    ```