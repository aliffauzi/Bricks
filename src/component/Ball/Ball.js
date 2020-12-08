import {Component} from 'react';

import classes from './Ball.module.css';


const N = 5  // how much it will go up on each 2s
const FPS = 30
let ballWidth = getComputedStyle(document.body).getPropertyValue('--ball-size');            
ballWidth = +ballWidth.slice(0, ballWidth.length - 2);

class Ball extends Component {
    state = {
        x: 300,
        y: window.innerHeight,
        running: false,
        angle: 165,
        interval: null
    }

    // root(sqr(Y) - sqr(N) )
    updatePosition = () => {
        this.setState(prev => {
            let updatedAnlge = prev.angle;
            if((prev.x < 0 + (ballWidth * 10 / 2)) || prev.x > window.innerWidth - (ballWidth * 10 / 2)) {
                updatedAnlge = 180 - prev.angle; // if ball going outside the screen change angle into mirror angle
            }
            return {
                angle: updatedAnlge,
                y: prev.y - (Math.sin(updatedAnlge * (Math.PI / 180)) * N),
                x: prev.x + (Math.cos(updatedAnlge * (Math.PI / 180)) * N)
            }
        })
    }

    componentDidMount() {
        let interval = setInterval(() => {
            this.updatePosition();
        }, FPS);

        this.setState({interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <div className={classes.ball} onClick={() => this.setState({angle: 45})} style={{left: `${this.state.x}px`, top: `${this.state.y}px`}}></div>
        )
    }
}

export default Ball;