import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

const Dot = styled.div`
  background: ${props => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 600;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  /* height: 3rem;
  text-align: center; */
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    transform: rotateX(0);
    top: 0;
    position: absolute;
  }
  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`;

class CartCount extends Component {
  state = {};

  render() {
    const { count } = this.props;
    return (
      <AnimationStyles>
        <TransitionGroup>
          <CSSTransition
            className="count"
            classNames="count"
            key={count}
            timeout={{ enter: 400, exit: 400 }}
            unmountOnExit
          >
            <Dot>{count}</Dot>
          </CSSTransition>
        </TransitionGroup>
      </AnimationStyles>
    );
  }
}

export default CartCount;
