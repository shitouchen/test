# 创建一个typescript格式的react-app
npx create-react-app my-app --template typescript

# 项目文件下npm run eject
npm run eject会复制所有依赖文件和相应的依赖（webpack、babel等）到你的项目。是个单向的操作，一旦eject,npm run eject的操作是不可逆的

# npm install --save typescript @types/node @types/react @types/react-dom @types/jest
types的依赖

# 在tsx文件中，不会识别.css文件，需要设置*.d.ts文件
## 如： xxx.d.ts
### 
```javascript
declare module "*.css"{
    const css : {[key:string]:string}
    export default css;
}
```
# 图片文件的配置一般放在assets文件夹下，文件夹内部有fonts、icons、images
## 若使用特殊字体，需在网上自行下载

# State和Props的区别
### props是组件对外的接口，而state是组件对内的接口
### props用于组件间数据传递，而state用于组件内部的数据传递
### state的状态改变只能使用this.setState，而constructor里是唯一存放setState的；
### setState是异步的，不会立即处理state
### 本质上，props就是传入函数的参数，是从传入组件内部的数据。更准确的说，是从父组件传递向子组件的数据。

# Immutable：不变的
### 对象一旦创建就不可改变，只能通过销毁、重建来改变数据
### 通过判断内存地址的是否一致，来确认对象是否有经过修改。

# 处理异步、动态显示
### AJAX
### callback 回调函数
### 程序栈stack，先进先出

# any 的理解
### 资源来源于网络请求，返回的数据类型不受控制
### 前端强行定义API数据类型，违反前后端分离的原则
### 不能为了使用Type而放弃javascript的灵活性

# React组件的生命周期
### Mounting: 创建虚拟DOM，渲染UI
### Updating: 更新虚拟DOM，重新渲染UI
### Unmounting: 删除虚拟DOM，移除UI
### 初始化：构建函数、getDerivedStateFormProps-->render():渲染UI-->componentDidMount
### getDeriveStateFormProps-->shouldComponentUpdate-->render: 渲染UI-->更新-->componentDidUpdate
### componentWillUnmount-->销毁

# 高阶组件
### HOC的公式：const hoc = higherOrder(wrappedComponent);
### 高阶组件(HOC)就是一个返回了组件的函数；
### 通过组件嵌套的方法给子组件添加更多的功能；
### 接收一个组件作为参数并返回一个经过改造的新组件。
## 为什么使用HOC？(高阶组件不是必须的)
### 1.抽取重复代码，实现组件复用；
### 2.条件渲染，控制组件的渲染逻辑(渲染劫持)
### 3.捕获/劫持被处理组件的生命周期。
## 命名规范：withXXX()

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
