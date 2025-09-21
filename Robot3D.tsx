import React from 'react';

const Robot3D: React.FC = () => {
    return (
        <div className="robot-scene">
            <style>
                {`
                    .robot-scene {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        perspective: 1200px;
                    }

                    @keyframes float-dot-robot {
                        0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(-20deg); }
                        50% { transform: translateY(-15px) rotateX(15deg) rotateY(-20deg); }
                    }
                    
                    @keyframes scan-beam-animation {
                        0% { top: -10%; opacity: 0.8; }
                        100% { top: 100%; opacity: 0.8; }
                    }
                    
                    @keyframes dot-eye-glow {
                        0%, 100% { box-shadow: 0 0 10px #34d399, 0 0 20px #059669, inset 0 0 8px #a7f3d0; background: #34d399; }
                        50% { box-shadow: 0 0 20px #34d399, 0 0 35px #059669, inset 0 0 12px #a7f3d0; background: #6ee7b7; }
                    }

                    .robot-container {
                        position: relative;
                        width: 180px;
                        height: 200px;
                        transform-style: preserve-3d;
                        animation: float-dot-robot 7s ease-in-out infinite;
                    }

                    .dot-part {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform-style: preserve-3d;
                        background: linear-gradient(145deg, #f1f5f9, #cbd5e1);
                        box-shadow: inset 0 2px 4px rgba(255,255,255,0.7), 0 5px 10px rgba(0,0,0,0.2);
                    }
                    
                    /* Head */
                    .dot-head {
                        width: 90px;
                        height: 80px;
                        margin-left: -45px;
                        margin-top: -90px;
                        border-radius: 50%;
                        transform: translateZ(10px);
                    }

                    .dot-eye {
                        position: absolute;
                        width: 50px;
                        height: 20px;
                        top: 55%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        background: #1e293b;
                        border-radius: 10px;
                        overflow: hidden;
                    }

                    .dot-eye::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: #34d399;
                        border-radius: 10px;
                        animation: dot-eye-glow 3s ease-in-out infinite;
                    }

                    .dot-antenna {
                        position: absolute;
                        width: 4px;
                        height: 25px;
                        background: #64748b;
                        top: 0px;
                        left: 50%;
                        margin-left: -2px;
                        transform: translateY(-100%);
                        border-radius: 2px;
                    }

                    .dot-antenna::after {
                        content: '';
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #34d399;
                        border-radius: 50%;
                        top: -4px;
                        left: 50%;
                        margin-left: -4px;
                        box-shadow: 0 0 5px #34d399;
                    }

                    .dot-body {
                        width: 70px;
                        height: 70px;
                        margin-left: -35px;
                        margin-top: -10px;
                        border-radius: 50% 50% 40% 40%;
                        transform: translateZ(-10px);
                    }

                    /* Hologram */
                    .hologram-document {
                        position: absolute;
                        width: 120px;
                        height: 150px;
                        left: 50%;
                        top: 50%;
                        margin-left: -60px;
                        margin-top: -75px;
                        background: linear-gradient(to bottom, rgba(52, 211, 153, 0.1), rgba(52, 211, 153, 0.05));
                        border: 1px solid rgba(52, 211, 153, 0.3);
                        border-radius: 5px;
                        box-shadow: 0 0 15px rgba(52, 211, 153, 0.2);
                        transform: translateZ(80px) rotateY(25deg);
                        overflow: hidden;
                    }

                    .hologram-document::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-image: repeating-linear-gradient(
                            to bottom,
                            rgba(52, 211, 153, 0.3),
                            rgba(52, 211, 153, 0.3) 1px,
                            transparent 1px,
                            transparent 8px
                        );
                        opacity: 0.5;
                    }

                    .scanner-beam {
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: #a7f3d0;
                        box-shadow: 0 0 10px #a7f3d0, 0 0 20px #34d399;
                        animation: scan-beam-animation 3s linear infinite;
                    }
                `}
            </style>
            <div className="robot-container">
                <div className="dot-part dot-head">
                    <div className="dot-antenna"></div>
                    <div className="dot-eye"></div>
                </div>
                <div className="dot-part dot-body"></div>
                <div className="hologram-document">
                    <div className="scanner-beam"></div>
                </div>
            </div>
        </div>
    );
};

export default Robot3D;