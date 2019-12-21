import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { appColor } from 'modules/theme';

const px = value => (typeof value === 'number' ? `${value}px` : value);

const grow = ({ size }) => keyframes`
  0% {
    height: 0;
    width: 0;
  }

  30% {
    border-width: ${px(size && size / 2.5)};
    opacity: 1;
  }

  100% {
    border-width: 0;
    height: ${px(size)};
    opacity: 0;
    width: ${px(size)};
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const ripple = ({ size }) => keyframes`
  0% {
    height: 0;
    left: ${px(size / 2)};
    opacity: 1;
    top: ${px(size / 2)};
    width: 0;
  }

  100% {
    height: ${px(size)};
    left: 0;
    opacity: 0;
    top: 0;
    width: ${px(size)};
  }
`;

/* stylelint-disable unit-blacklist */
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;
/* stylelint-enable unit-blacklist */

const LoaderGrow = styled.div`
  display: ${({ block }) => (block ? 'flex' : 'inline-flex')};
  height: ${({ size }) => px(size)};
  margin: ${({ block }) => (block ? '2rem' : 0)} auto;
  position: relative;
  width: ${({ size }) => px(size)};

  > div {
    animation: ${grow} 1.15s infinite cubic-bezier(0.2, 0.6, 0.36, 1);
    border: 0 solid ${({ color }) => color};
    border-radius: 50%;
    box-sizing: border-box;
    height: 0;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
  }
`;

const LoaderPulse = styled.div`
  display: ${({ block }) => (block ? 'flex' : 'inline-flex')};
  height: ${({ size }) => px(size)};
  margin: ${({ block }) => (block ? '2rem' : 0)} auto;
  position: relative;
  width: ${({ size }) => px(size)};

  > div {
    animation: ${ripple} 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    border: ${({ size }) => px(Math.round(size / 16))} solid ${({ color }) => color};
    border-radius: 50%;
    opacity: 1;
    position: absolute;
  }

  > div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

const LoaderRotate = styled.div`
  display: ${({ block }) => (block ? 'flex' : 'inline-flex')};
  margin: ${({ block }) => (block ? '2rem' : 0)} auto;
  text-align: center;
`;

const LoaderRotateSVG = styled.svg.attrs({
  viewBox: '25 25 50 50',
})`
  animation: ${rotate} 2s linear infinite;
  height: ${({ size }) => px(size)};
  margin: auto;
  transform-origin: center center;
  width: ${({ size }) => px(size)};
`;

const LoaderRotateCircle = styled.circle`
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke: ${({ color }) => color};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
`;

const Loader = props => {
  const { type } = props;
  let html;

  if (type === 'rotate') {
    html = (
      <LoaderRotate {...props}>
        <LoaderRotateSVG {...props}>
          <LoaderRotateCircle {...props} cx="50" cy="50" r="20" fill="none" strokeWidth={2} />
        </LoaderRotateSVG>
      </LoaderRotate>
    );
  } else if (type === 'pulse') {
    html = (
      <LoaderPulse {...props}>
        <div />
        <div />
      </LoaderPulse>
    );
  } else {
    html = (
      <LoaderGrow {...props}>
        <div />
      </LoaderGrow>
    );
  }

  return html;
};

Loader.propTypes = {
  block: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['grow', 'pulse', 'rotate']),
};

Loader.defaultProps = {
  block: false,
  color: appColor,
  size: 32,
  type: 'grow',
};

export default Loader;
