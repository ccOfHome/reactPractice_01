import React,{Component} from 'react';
import PropTypes from 'prop-types'


class TodoItem extends Component{

    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    //使用生命周期函数来进行性能的优化
        //使用shouldComponentUpdate方法来提高react组件的性能
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }else{
            return false;
        }
    }

    render(){
        console.log('child:render');
        //onClick={this.handleClick.bind(this)}  影响性能
        const {content,test}=this.props;
        //JSX -> JS对象 -> 真实的DOM
        return (<div onClick={this.handleClick}>{test}-{content}</div>);
        //JSX -> createElement -> 虚拟DOM(JS对象) -> 真实的DOM
        // return React.createElement('div',{},'item');  //更偏向于底层  比较复杂

    }

    //当一个组件从父组件接收了参数
    //如果这个组件第一次存在于父组件中不会执行，如果这个组件之前已经存在于父组件中才会执行
    componentWillReceiveProps(){
        console.log('child:componentWillReceiveProps');
    }

    //当这个组件即将从页面中被剔除时会自动执行
    componentWillUnmount(){
        console.log('child:componentWillUnmount');
    }

    handleClick(){
        //修改父组件的值
        const {deleteItem,index}=this.props;
        deleteItem(index);
    }
}

//在父组件传值时   对TodoItem组件进行属性校验
TodoItem.propTypes = {
    //父组件没传值的情况下  不会报错  显示空白
    //isRequired代表必须传递，必须是string类型  不传递会报 警告
    test: PropTypes.string.isRequired,
    //content: PropTypes.string,
    //content: PropTypes.arrayOf(PropTypes.number,PropTypes.string),   //可以是数字/字符串       ------报错
    content: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

//设置属性默认值
TodoItem.defaultProps = {
    test: 'hello World'
}


export default TodoItem;
