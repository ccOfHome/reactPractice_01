import React,{Component,Fragment} from 'react';
import './style.css';
import TodoItem from './TodoItem';
import Test from './Test';
import axios from 'axios'

class TodoList extends Component{
    
    constructor(props){
        super(props); //调用父类的构造函数

        //当组件的state或者props发生改变时，render函数就会重新执行

        //定义数据
        this.state={
            inputValue: '',
            list:['111','222','333']
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleBtnClick=this.handleBtnClick.bind(this);
        this.handleItemDelete=this.handleItemDelete.bind(this);
    }

    //在组件即将被挂载到页面的时刻自动执行
    componentWillMount(){
        console.log('componentWillMount')
        //ajax请求放这里 在写RN/做服务器端同构/更深的一些技术时会和以后更高端的技术产生冲突
    }
    
    render(){
        console.log('render')

        //ajax请求写这里会造成死循环，不断发送请求
        
        return(
            /*Fragment标签可以减少一层div嵌套盒子 相当于占位符*/
            /*不更改this指向，指向的是undefined   绑定组件的this后this指向的就是组件  改变函数作用域*/
            <Fragment>
                <div>
                    {/* 注释 */}
                    {
                        //注释
                        //className替换class
                    }
                    <label htmlFor="insertArea">输入内容</label>{/* 扩大区域  实现点击文字聚焦input框 */}
                    {/*ref  this指向的就是该元素的DOM */}
                    <input id="insertArea" className='input' value={this.state.inputValue} onChange={this.handleInputChange} ref={(input)=>{this.input=input}}/>
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul ref={(ul)=>{this.ul=ul}}>
                    {this.getTodoItem()}
                </ul>
                <Test content={this.state.inputValue}/>
            </Fragment>
        )
    }

    //在组件被挂载到页面之后自动执行
        //ajax请求的发送  ajax请求放constructor里也可以，但是还是推荐在componentDidMount里发送ajax请求
    componentDidMount(){
        console.log('componentDIdMount');

        axios.get('/api/todolist')
            .then((res) => {
                console.log(res.data);
                // this.setState(()=>{
                //     return{
                //         list: res.data
                //     }
                // });
                
                this.setState(()=>({
                    //避免对res的数据进行了修改
                    list: [...res.data]
                }))
            })
            .catch(() => {alert('error')})
    }

    //组件被更新之前会自动执行
    shouldComponentUpdate(){  //组件是否需要更新    要求返回值为boolean类型
        console.log('shouldComponentUpdate');
        return true;
    }

    //组件被更新之前会自动执行，但是在shouldComponentUpdate之后被执行
    //如果shouldComponentUpdate返回true才执行，返回false这个函数就不会被执行
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    //组件更新完成之后会被立即执行
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    handleInputChange(e){
        console.log(e.target)   //输出的为  元素对应的DOM
        //this.state.inputValue=e.target.value; 实现不了

        // this.setState({
        //     inputValue: e.target.value
        // })

        //新版本--异步  性能上提升
        //const value=e.target.value;
        //使用ref之后
        const value=this.input.value;
        this.setState(()=>({
            inputValue: value
        }))
    }
    handleBtnClick(){
        // this.setState({
        //     list: [...this.state.list,this.state.inputValue],
        //     inputValue: ''
        // })

        //prevState 修改之前的数据
        this.setState((prevState)=>({  //异步函数，不会立即执行
            list: [...prevState.list,prevState.inputValue],
            inputValue: ''
        }),()=>{
            //测试ul标签中的ref
            console.log(this.ul.querySelectorAll('div').length);
        })

        

    }
    handleItemDelete(index){
        //immutable
        //state不允许我们做任何的改变，修改其一个副本

       /*  const list=[...this.state.list]; 
        //this.state.list.splice(index,1)修改不了   
        this.setState({list: this.state.list}) 能修改但是不推荐
        list.splice(index,1); */
        // this.setState({
        //     list: list
        // })

        this.setState((prevState)=>{
            const list=[...prevState.list];
            list.splice(index,1);
            return {list};
        })
    }
    getTodoItem(){
        return(this.state.list.map((item,index)=>{
            //dangerouslySetInnerHTML={{}}  里边是一个{}对象  {item}省略    标签转化成html来出现  不实现自动转义
            {/*<li key={index} onClick={this.handleItemDelete.bind(this,index)} dangerouslySetInnerHTML={{__html:item}}></li>*/}
            return <div key={index}><TodoItem content={item} index={index}  deleteItem={this.handleItemDelete} /></div>
        }))
    }
}



export default TodoList;


