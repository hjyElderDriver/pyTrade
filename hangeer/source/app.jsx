import React from 'react';
import ReactDOM from 'react-dom';

import './style/app.less';
import arrowUp from './style/arrow-up.png';
import arrowDown from './style/arrow-down.png';
import rocket from './style/rocket.png';
import starsky from './style/starsky.png';
import flame from './style/flame_2.png';

let App = React.createClass({
    getInitialState() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },
    handleResize(e) {
        this.setState({
            windowWidth: window.innerWidth
        });
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.querySelector('#hangeer').addEventListener('click', this.handleClick);

    },
    componentWillMount() {
        window.removeEventListener('resize', this.handleResize);
    },
    handleClick(e) {
        e = e || window.event;
        let _target = e.target || e.srcElement;
        switch (_target.id.toLowerCase()) {
            case 'arrow-up':
                document.querySelector('#car-container').style.top = window.innerWidth/5 + 'px';
                break;
            case 'arrow-down':
                document.querySelector('#car-container').style.top = '100%';
                break;
            default: break;
        }
    },


    render() {
        return (<div className="container" id="hangeer" style={{
                    backgroundImage: `url(${starsky})`,
                    height: window.innerHeight + 'px',
                    width: window.innerWidth/5 + 'px'
                }}>
                    <section className="car-container" id="car-container" style={{
                        width: window.innerWidth/5 + 'px',
                        height: window.innerWidth/5 + 'px',
                        marginTop: -window.innerWidth/5 + 'px'
                    }}>
                        <div className="car-body" id="car-body" style={{
                            width: '150px',
                            height: '150px',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginTop: '-75px',
                            marginLeft: '-75px',
                            //backgroundColor: '#ccc',
                            backgroundImage: `url(${rocket})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        </div>
                        <div className="flame" style={{
                               position: 'absolute',
                               top: '215px',
                               left: '120px',
                               width: '50px',
                               height: '50px',
                               backgroundImage: `url(${flame})`,
                               backgroundSize: '100% 100%',
                               backgroundRepeat: 'no-repeat'
                            }}>

                        </div>
                        <div id="arrow-up" style={{
                            width: '30px',
                            height: '60px',
                            float: 'right',
                            color: '#fff',
                            cursor: 'pointer',
                            backgroundImage: `url(${arrowUp})`
                        }}>

                        </div>
                        <div id="arrow-down" style={{
                            width: '30px',
                            height: '60px',
                            position: 'absolute',
                            top: '100%',
                            right: '0',
                            marginTop: '-60px',
                            color: '#fff',
                            cursor: 'pointer',
                            backgroundImage: `url(${arrowDown})`
                        }}>

                        </div>
                    </section>
                </div>);
    }
});

let appProps = {};
    appProps.name = 'Yaerma';
    appProps.goodThing = 'Shihaoshi';

let app = <App {...appProps}/>;




ReactDOM.render(app, document.body);

/*
*   大写开头的 App 是组件
*   小写开头的用来渲染 html
*
*   getInitialState 设置初始状态
*   componentDidMount 在组件渲染完成后并且有了 DOM 结构之后调用
* */