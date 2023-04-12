import styled, { keyframes } from 'styled-components'

const loader = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`

export const Loader = styled.div`
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;

	border: .2em solid transparent;
	border-top-color: currentcolor;
	border-radius: 50%;
	animation: 1s ${loader} linear infinite;
	position: relative;
    font-size: 4rem;

	&:before {
		content: "";
		display: block;
		width: inherit;
		height: inherit;
		position: absolute;
		top: -.2em;
		left: -.2em;
		border: .2em solid currentcolor;
		border-radius: 50%;
		opacity: .5;
	}
`