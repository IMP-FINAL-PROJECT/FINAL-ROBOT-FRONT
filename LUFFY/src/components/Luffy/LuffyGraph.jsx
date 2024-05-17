import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'rc-progress';

export default function LuffyGraph({ exp, numberOfBoxes, hour, minute, second }) {
    const [currentExp, setCurrentExp] = useState(0);
    const [currentBoxes, setCurrentBoxes] = useState(0);
    const [boxes, setBoxes] = useState([]);
    const [currentSecond, setCurrentSecond] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [currentHour, setCurrentHour] = useState(0);
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const expInterval = setInterval(() => {
            setCurrentExp(prevExp => prevExp < exp ? prevExp + 1 : prevExp);
            if (currentExp >= exp) clearInterval(expInterval);
        }, 20);
        return () => clearInterval(expInterval);
    }, [exp, currentExp]);

    useEffect(() => {
        const boxInterval = setInterval(() => {
            setCurrentBoxes(prevBoxes => {
                if (prevBoxes < numberOfBoxes) {
                    return prevBoxes + 1;
                }
                clearInterval(boxInterval);
                return prevBoxes;
            });
        }, 60);
        return () => clearInterval(boxInterval);
    }, [numberOfBoxes]);

    useEffect(() => {
        setBoxes(Array.from({ length: currentBoxes }, (_, index) => ({ id: index + 1 })));
    }, [currentBoxes]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (currentHour < hour) {
                setCurrentHour(currentHour + 1);
            } else if (currentMinute < minute) {
                setCurrentMinute(currentMinute + 1);
            } else if (currentSecond < second) {
                setCurrentSecond(currentSecond + 1);
            } else {
                clearInterval(timeInterval);
            }
        }, 30); // 각 단위를 1초마다 업데이트

        return () => clearInterval(timeInterval);
    }, [hour, minute, second, currentHour, currentMinute, currentSecond]);

    const maxBoxesPerRow = 10;
    const boxWidth = containerSize.width / maxBoxesPerRow;
    const numRows = Math.ceil(currentBoxes / maxBoxesPerRow);
    const boxHeight = containerSize.height / numRows;

    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-[1.2vw] font-bold mt-[1vw]">경험치 {currentExp}%</p>
            <Line percent={currentExp} strokeWidth={7} strokeColor="#B893F5" className="w-full mt-[0.5vw]" />

            <p className="text-[1.2vw] font-bold mt-[2.5vw]">클립 갯수: {currentBoxes}개</p>
            <div ref={containerRef} className="flex flex-wrap h-[12vw] w-[100%] mt-[0.5vw]">
                {boxes.map(box => (
                    <div key={box.id} style={{
                        width: `${boxWidth}px`,
                        height: `${boxHeight}px`,
                        backgroundColor: "#A8D885",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        border: '1px solid beige',
                    }}>
                    </div>
                ))}
            </div>
            <div className="font-bold text-[1.2vw] mt-[2.5vw]">
                러피콜과 함께한 시간
            </div>
            <div className="text-[2vw] mt-[1vw]">
                {`${currentHour}시간 ${currentMinute}분 ${currentSecond}초`}
            </div>
        </div>
    );
}
