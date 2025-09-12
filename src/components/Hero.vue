}

/* Texto con acento (Bienvenido al elevador...) */
.accent-text {
    color: #404040;
    font-weight: 700;
    font-size: 34px; /* Specific font size for accent text */
    
    position: relative;
    display: inline-block; /* Needed for underline to work correctly */
}

/* Regular text within the subtitle */
.regular-text {
    font-size: 23px; /* Consistent size for the rest of the subtitle */
}



/* Envoltura del botón */
.button-wrapper {
    margin-bottom: 4rem;
    display: inline-block;
}

/* Estilos del botón de portafolio */
.portfolio-button {
    background: #4831D4;
    color: #fff;
    border: 1px solid #4831D4;
    padding: 0px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease-in-out, color 0.3s ease;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.portfolio-button span {
    padding: 1rem 1.5rem;
    display: block;
    flex-grow: 1;
}

.portfolio-button .arrow-icon {
    background: #CCF381;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.portfolio-button .arrow-icon svg {
    width: 20px;
    height: 20px;
    color: #4831D4;
}

.portfolio-button:hover {
    transform: translateY(-3px);
}

.portfolio-button:hover .arrow-icon {
    background: #c0e872;
}

.portfolio-button:hover .arrow-icon svg {
    transform: rotate(45deg);
}

/* Información de contacto */
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.contact-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #4831D4;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.contact-link:hover {
    color: #6A5AE0;
}

.contact-link svg {
    width: 18px;
    height: 18px;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    color: #4831D4;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: #CCF381;
}

.social-link svg {
    width: 20px;
    height: 20px;
}

/* Sección del Elevador */
.elevator-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.elevator-container {
    position: relative;
    width: 320px;
    transition: transform 0.3s ease;
}

.elevator-container:hover {
    transform: scale(1.02);
}

.floor-display {
    position: absolute;
    top: -4.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: #1a1a1a;
    padding: 4px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.display-screen {
    background: #000;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #FFD700;
    font-family: "Digital-7", monospace;
    font-size: 1.2rem;
    border: 1px solid #333;
    box-shadow:
        inset 0 0 10px rgba(255, 215, 0, 0.2),
        0 0 15px rgba(255, 215, 0, 0.1);
}

.elevator-frame {
    background: linear-gradient(145deg, #4831D4, #5D4EC7);
    padding: 1rem;
    border-radius: 1rem;
    height: 420px;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.2),
        inset 0 2px 10px rgba(255, 255, 255, 0.1);
}

.elevator-content {
    background: #6A5AE0;
    height: calc(100% - 1rem);
    border-radius: 0.5rem;
    padding: 1rem;
    position: relative;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
}

.elevator-inner {
    background: #5D4EC7;
    height: 100%;
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
}

.elevator-rails {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.rail {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.rail.left {
    left: 10px;
}

.rail.right {
    right: 10px;
}

.doors {
    position: absolute;
    inset: 0;
    display: flex;
}

.door-frame {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
}

.door-frame.left {
    left: 0;
}

.door-frame.right {
    right: 0;
}

.door {
    width: 50%;
    height: 100%;
    background: linear-gradient(135deg, #4831D4, #5D4EC7);
    position: relative;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.door.left {
    transform-origin: left;
    border-right: 2px solid rgba(255, 255, 255, 0.1);
}

.door.right {
    transform-origin: right;
}

.door.left.open {
    transform: translateX(-100%);
}

.door.right.open {
    transform: translateX(100%);
}

.door-handle {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.door.left .door-handle {
    right: 10px;
}

.door.right .door-handle {
    left: 10px;
}

.door-lines {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 40px;
}

.door-lines .line {
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Contenido de previsualización del elevador */
.elevator-preview {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(72, 49, 212, 0.1), rgba(106, 90, 224, 0.1));
    backdrop-filter: blur(10px);
    z-index: 1;
}

.preview-content {
    text-align: center;
    color: white;
    padding: 2rem;
}

.preview-icon {
    margin-bottom: 1rem;
    opacity: 0.8;
}

.preview-content h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.preview-content p {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* Controles del elevador */
.elevator-controls {
    position: absolute;
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%);
}

.control-panel {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.floor-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #f0f0f0;
    color: #666;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.floor-btn:hover {
    background: #4831D4;
    color: white;
    transform: scale(1.1);
}

.floor-btn.active {
    background: #4831D4;
    color: white;
    box-shadow: 0 0 15px rgba(72, 49, 212, 0.5);
    transform: scale(1.1);
}

.floor-btn.demo {
    cursor: default;
    animation: demoGlow 3s infinite;
}

@keyframes demoGlow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(72, 49, 212, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(72, 49, 212, 0.8);
    }
}

/* Demo Content Styles */
.demo-content {
    text-align: center;
    color: white;
    animation: fadeInDemo 0.5s ease-in-out;
}

.demo-icon {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.demo-floor-number {
    font-size: 2rem;
    font-weight: bold;
    color: #CCF381;
    background: rgba(72, 49, 212, 0.8);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #CCF381;
}

.demo-content h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #CCF381;
}

.demo-content p {
    font-size: 0.9rem;
    opacity: 0.9;
    line-height: 1.4;
}

@keyframes fadeInDemo {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Efecto de enfoque */
.focus-overlay {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
        circle at center,
        rgba(72, 49, 212, 0.1) 0%,
        rgba(72, 49, 212, 0.05) 40%,
        transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    animation: focusPulse 3s ease-in-out infinite;
}

@keyframes focusPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

/* Media Queries para Responsividad */
@media (max-width: 1024px) {
    .main-content {
        flex-direction: column;
        text-align: center;
        gap: 3rem;
    }

    .background-shape {
        display: none;
    }

    .contact-info {
        align-items: center;
    }

    .elevator-container {
        width: 280px;
    }

    .elevator-frame {
        height: 380px;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 3rem;
    }

    .subtitle {
        font-size: 20px;
    }

    .accent-text {
        font-size: 25px;
    }

    .elevator-container {
        width: 250px;
    }

    .elevator-frame {
        height: 350px;
    }

    .portfolio-button {
        font-size: 0.9rem;
    }

    .portfolio-button span {
        padding: 0.8rem 1.2rem;
    }

    .portfolio-button .arrow-icon {
        padding: 0.6rem;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 18px;
    }

    .accent-text {
        font-size: 22px;
    }

    .main-content {
        padding: 1rem;
    }

    .elevator-container {
        width: 220px;
    }
    
    .profile-section-mobile .profile-container {
        width: 200px;
        height: 200px;
    }

    .elevator-frame {
        height: 300px;
    }

    .control-panel {
        gap: 0.3rem;
        padding: 0.3rem;
    }

    .floor-btn {
        width: 35px;
        height: 35px;
        font-size: 0.9rem;
    }
}
</style>