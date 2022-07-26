/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"
import "./App.css"
import styled, { keyframes } from "styled-components"
import useWindowDimensions from "./hooks/useWindowDimensions"

interface ScrollerModel {
    vertical?: boolean;
    speed?: number;
    weight?: string;
    color?: string;
    backgroundColor?: string;
  }

const MarqueeAnimationX = keyframes`
    0% {
        transform: translateX(100vw)
    }
    100% {
        transform: translateX(-100%);
    }
`
  
const MarqueeAnimationY = keyframes`
    0% {
        transform: translateY(100vh)
    }
    100% {
        transform: translateY(-100%);
    }
`
const Wrapper = styled.div`
    background-color: yellow;
    color: ${(props: ScrollerModel) => props.color };
    background-color: ${(props: ScrollerModel) => props.backgroundColor };
    overflow: hidden;
`

const Scroller = styled.span`
    font-size: ${(props: ScrollerModel) => props.vertical ? "100vw" : "100vh"};
    font-weight: ${(props: ScrollerModel) => props.weight };
    color: ${(props: ScrollerModel) => props.color };
    line-height: 0;
    margin: auto;
    white-space: nowrap;
    animation: ${(props: ScrollerModel) => props.vertical ? MarqueeAnimationY : MarqueeAnimationX} ${(props: ScrollerModel) => props.speed}s linear infinite;
    writing-mode: ${(props: ScrollerModel) => props.vertical ? "vertical-rl" : "unset"};
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const StyledInput = styled.input`
    font-size: 20px;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
    color: inherit;
    padding: 0;
    margin: 0;
`
const StyledButton = styled.button`
    font-size: 20px;
    color: inherit;
    background: none;
    border: none;
`
const StyledSelect = styled.select`
    font-size: 20px;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    margin: 0;
    width: 100%;
    outline: none !important;
    `
const Label = styled.label`
    margin: 0;
    padding: 0;
    `
const FormPart = styled.div`
    font-size: 20px;
    display: flex;
    width: 100%;
    gap: 0.5rem;
`
const FloatingBtn = styled.button`
    font-size: 40px;
    position: fixed;
    left: 2rem;
    bottom: 2rem;
    background: none;
    border: none;
    font-size: 64px;
`
const enterFullScreen = (): void => {
    const docEl = document.documentElement as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
    }
    if (docEl.requestFullscreen) {
        docEl.requestFullscreen()
    } else if (docEl.mozRequestFullScreen) { 
        docEl.mozRequestFullScreen()
    } else if (docEl.webkitRequestFullscreen) { 
        docEl.webkitRequestFullscreen()
    } else if (docEl.msRequestFullscreen) { 
        docEl.msRequestFullscreen()
    }
}
const exitFullScreen = (): void => {
    const doc = window.document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
    }
    if (doc.exitFullscreen) {
        doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) { 
        doc.mozCancelFullScreen()
    } else if (doc.webkitExitFullscreen) { 
        doc.webkitExitFullscreen()
    } else if (doc.msExitFullscreen) { 
        doc.msExitFullscreen()
    }
}

const colors = [
    {name: "Cement", backgroundColor: "#6D6875", color: "#FFCDB2"},
    {name: "Peach", backgroundColor: "#E5989B", color: "#6D6875"},
    {name: "Plum", backgroundColor: "#3E206E", color: "#F0E3FF"},
    {name: "Yellow", backgroundColor: "#E4F0C2", color: "#32AEA9"},
    {name: "Pink", backgroundColor: "#CB0064", color: "#FFCD01"},
    {name: "Soft", backgroundColor: "#C0EDDB", color: "#3D6557"}
]


function Marquee() {
    const { height, width } = useWindowDimensions()
    const [vertical, setVertical] = useState(height > width)
    const [showSettings, setShowSettings] = useState(true)
    const [text, setText] = useState("")
    const [weight, setWeight] = useState("400")
    const [backgroundColor, setBackgroundColor] = useState(colors[0].backgroundColor)
    const [color, setColor] = useState(colors[0].color)
    const [colorCombo, setColorCombo] = useState(0)
    const [speed, setSpeed] = useState(10)
    const [speedMultiplier, setSpeedMultiplier] = useState(1.0)
    
    useEffect(() => {
        setVertical(height > width)
    }, [height, width])
    
    useEffect(() => {
        setSpeed(text.length * speedMultiplier)
    }, [speedMultiplier, text])

    useEffect(() => {
        setBackgroundColor(colors[colorCombo].backgroundColor)
        setColor(colors[colorCombo].color)
    }, [colorCombo])

    return (
        <Wrapper color={color} backgroundColor={backgroundColor}>
            <header className="App-header">
                {showSettings ? 
                    <div>
                        <Form onSubmit={() => {enterFullScreen(); setShowSettings(!showSettings)}}>
                            <FormPart>
                                <Label>Text:</Label>
                                <StyledInput autoFocus value={text} onChange={(e) => setText(e.target.value)}/>
                            </FormPart>
                            <FormPart>
                                <Label>Speed:</Label>
                                <StyledSelect value={speedMultiplier} onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}>
                                    <option value={2}>Slow</option>    
                                    <option value={1}>Normal</option>    
                                    <option value={0.5}>Fast</option> 
                                    <option value={0.2}>Ludicrous</option> 
                                </StyledSelect>
                            </FormPart>
                            <FormPart>
                                <Label>Weight:</Label>
                                <StyledSelect value={weight} onChange={(e) => setWeight(e.target.value)}>
                                    <option value="200">Thin</option>    
                                    <option value="400">Regular</option>    
                                    <option value="600">Bold</option> 
                                </StyledSelect>
                            </FormPart>
                            <FormPart>
                                <Label>Color:</Label>
                                <StyledSelect value={colorCombo} onChange={(e) => setColorCombo(parseInt(e.target.value))}>
                                    {colors.map((color, index)=>
                                        <option key={color.name} value={index}>{color.name}</option>
                                    )}
                                </StyledSelect>
                            </FormPart>
                            <StyledButton type="submit" >OK</StyledButton>
                        </Form>
                    </div> 
                    :
                    <>
                        <Scroller vertical={vertical} speed={speed} weight={weight}>
                            {text}
                        </Scroller>
                        <FloatingBtn onClick={() => {exitFullScreen(); setShowSettings(!showSettings)}}>⚙</FloatingBtn>
                    </>
                }
            </header>
        </Wrapper>
    )
}

export default Marquee
