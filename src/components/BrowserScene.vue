<template>
  <div class="container" :class="{ 'dark-mode': isDarkMode }" ref="containerRef">
    <div class="browser">
      <div class="browser-header">
         <div class="traffic-lights"><div class="traffic-light red"></div><div class="traffic-light yellow"></div><div class="traffic-light green"></div></div>
         <div class="search-bar-container"><div class="search-bar"><div class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></div><input type="text" v-model="searchTerm" placeholder="Buscar o escribir dirección web" class="search-input"/></div></div>
         <button @click="toggleDarkMode" class="dark-mode-toggle"><svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg><svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg></button>
         <button class="menu-button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg></button>
      </div>

      <div class="browser-content">
        <div class="text-content">
          <h1 class="content-title">¿Listo para subir al siguiente piso?</h1>
          <p class="content-copy">Cada experiencia digital que creamos tiene su propio sello. 
Cuéntame tu idea y hagamos que tu proyecto tenga su propio piso en el universo digital.</p>
        </div>

        <!-- Desktop Simulation -->
        <div class="desktop-area">
      
          
          <!-- Notepad -->
          <div class="notepad">
            <div class="notepad-header">
              <div class="notepad-title">
                <i class="fas fa-sticky-note"></i>
                Bloc de notas
              </div>
              <div class="notepad-controls">
                <span class="control minimize">−</span>
                <span class="control maximize">□</span>
                <span class="control close">×</span>
              </div>
            </div>
            <div class="notepad-content">
              <p class="notepad-text">Si lo común no te sirve, bienvenido.</p>
              <p class="notepad-text">Aquí diseñamos diferente.</p>
            </div>
          </div>
          
          <!-- Taskbar -->
          <div class="taskbar">
            <div class="taskbar-left">
              <div class="start-button">
                <i class="fab fa-windows"></i>
              </div>
              <div class="taskbar-apps">
                <div class="taskbar-app active">
                  <i class="fas fa-sticky-note"></i>
                </div>
                <div class="taskbar-app">
                  <i class="fas fa-folder"></i>
                </div>
              </div>
            </div>
            <div class="taskbar-right">
              <div class="system-tray">
                <div class="tray-icons">
                  <i class="fas fa-wifi"></i>
                  <i class="fas fa-volume-up"></i>
                  <i class="fas fa-battery-three-quarters"></i>
                </div>
                <div class="datetime">
                  <div class="time">{{ currentTime }}</div>
                  <div class="date">{{ currentDate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Social Media Notepad -->
      <div class="social-notepad">
        <div class="notepad-header">
          <div class="notepad-title">
            <i class="fas fa-share-alt"></i>
            Redes Sociales
          </div>
          <div class="notepad-controls">
            <span class="control minimize">−</span>
            <span class="control maximize">□</span>
            <span class="control close">×</span>
          </div>
        </div>
        <div class="notepad-content">
          <div class="social-icons-grid">
            <a href="https://wa.me/573001234567" target="_blank" class="social-icon-link whatsapp-link">
              <i class="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
            <a href="mailto:web@oswal.com.co" class="social-icon-link email-link">
              <i class="fas fa-envelope"></i>
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/oswaldo-jaimes/" target="_blank" class="social-icon-link linkedin-link">
              <i class="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://dribbble.com/oswal" target="_blank" class="social-icon-link dribbble-link">
              <i class="fab fa-dribbble"></i>
              <span>Dribbble</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div ref="iconAreaRef" class="icon-area"></div>

    <div class="floor" ref="floorRef"></div>

    <div
      class="modal-overlay"
      :class="{ visible: isModalVisible }"
      @click.self="hideModal"
      ref="modalOverlayRef"
    >
      <div
        class="modal-content"
        :class="{ 'email-mode': isEmailMode }"
        ref="modalContentRef"
      >
        <button @click="hideModal" class="modal-close-btn">&times;</button>

        <template v-if="!isEmailMode && modalData">
          <div class="modal-header">
            <i :class="modalData.icon"></i>
            <h2 class="modal-title">Visit {{ modalData.name }}</h2>
          </div>
          <p class="modal-text">{{ modalData.description }}</p>
          <a :href="modalData.url" target="_blank" class="modal-link-btn">Go to {{ modalData.name }}</a>
        </template>

        <template v-if="isEmailMode && modalData">
          <div class="modal-email-content">
            <span class="modal-email-display">{{ targetEmail }}</span>
            <div class="modal-email-actions">
              <button @click="handleEmailCopy" class="modal-email-btn" ref="modalEmailCopyBtnRef">
                <i class="fas fa-copy"></i> <span class="copy-text">Copy</span>
              </button>
              <a :href="`mailto:${targetEmail}`" class="modal-email-btn">
                <i class="fas fa-paper-plane"></i> Write Email
              </a>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const searchTerm = ref('oswal');
const isDarkMode = ref(false);
const toggleDarkMode = () => { isDarkMode.value = !isDarkMode.value; };

const containerRef = ref(null);
const floorRef = ref(null);
const iconAreaRef = ref(null);
const icons = [];
let animationFrameId = null;
let iconIntervalId = null;

const modalOverlayRef = ref(null);
const modalContentRef = ref(null);
const modalEmailCopyBtnRef = ref(null);
const isModalVisible = ref(false);
const isEmailMode = ref(false);
const modalData = ref(null);
const currentTime = ref('');
const currentDate = ref('');

const targetEmail = 'web@oswal.com.co';
const socialMedia = [
    { class: 'whatsapp', icon: 'fab fa-whatsapp', url: 'https://wa.me/573001234567', name: 'WhatsApp', description: 'Chat conmigo directamente en WhatsApp!' },
    { class: 'email', icon: 'fas fa-envelope', url: `mailto:${targetEmail}`, name: 'Email', description: 'Envíame un email para consultas.' },
    { class: 'linkedin', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/oswaldo-jaimes/', name: 'LinkedIn', description: 'Conecta conmigo en LinkedIn.' },
    { class: 'dribbble', icon: 'fab fa-dribbble', url: 'https://dribbble.com/oswal', name: 'Dribbble', description: 'Mira mi portafolio de diseño en Dribbble.' }
];
const iconSize = 40;
const gravity = 0.15;
const friction = 0.9;
const elasticity = 0.5;

// Contador de iconos por tipo
const iconCounts = ref({
    whatsapp: 0,
    instagram: 0,
    dribbble: 0,
    email: 0,
    linkedin: 0
});
const maxIconsPerType = 20;

const updateDateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  currentDate.value = now.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

const openModal = (type) => {
  const social = socialMedia.find(s => s.class === type);
  if (social) {
    modalData.value = social;
    if (type === 'email') {
      showEmailModal();
    } else {
      showStandardModal();
    }
  }
};

onMounted(() => {
    // Update time immediately and then every minute
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    const container = containerRef.value;
    const floor = floorRef.value;
    const iconArea = iconAreaRef.value;

    if (!container || !floor || !iconArea) {
        console.error("Required elements not found for animation.");
        return;
    }

    const floorHeight = floor.offsetHeight;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    function createIcon() {
        if (!iconArea) return;

        const socialIndex = Math.floor(Math.random() * socialMedia.length);
        const social = socialMedia[socialIndex];
        
        // Verificar límite de iconos por tipo
        if (iconCounts.value[social.class] >= maxIconsPerType) {
            return;
        }
        
        const iconElement = document.createElement('div');
        iconElement.className = `icon ${social.class}`;
        iconElement.innerHTML = `<i class="${social.icon}"></i>`;
        iconElement.style.pointerEvents = 'auto';

        const startX = Math.random() * (containerWidth - iconSize);
        iconElement.style.left = `${startX}px`;
        iconElement.style.top = `-${iconSize}px`;
        iconArea.appendChild(iconElement);

        const currentIconData = {
            element: iconElement, x: startX, y: -iconSize,
            vx: (Math.random() * 10 - 5),
            vy: 0, landed: false,
            width: iconSize, height: iconSize,
            class: social.class,
            icon: social.icon,
            url: social.url,
            name: social.name,
            description: social.description,
            image: social.image
        };

        iconElement.addEventListener('click', () => {
            modalData.value = currentIconData;
            if (currentIconData.name === 'Email') {
                showEmailModal();
            } else {
                showStandardModal();
            }
        });

        // Incrementar contador
        iconCounts.value[social.class]++;
        
        icons.push(currentIconData);
    }

    function checkCollision(icon1, icon2) {
         return (
            icon1.x < icon2.x + icon2.width &&
            icon1.x + icon1.width > icon2.x &&
            icon1.y < icon2.y + icon2.height &&
            icon1.y + icon1.height > icon2.y
        );
    }

    function handleCollision(icon1, icon2) {
        const dx = (icon1.x + icon1.width / 2) - (icon2.x + icon2.width / 2);
        const dy = (icon1.y + icon1.height / 2) - (icon2.y + icon2.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (icon1.width + icon2.width) / 2;
        
        if (distance < minDistance && distance > 0) {
            // Calcular overlap y dirección de separación con buffer más grande
            const overlap = minDistance - distance + 5; // +5 para buffer extra
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Separar los iconos físicamente con más fuerza
            const separationForce = overlap / 2 + 2; // +2 píxeles extra de separación
            icon1.x += nx * separationForce;
            icon1.y += ny * separationForce;
            icon2.x -= nx * separationForce;
            icon2.y -= ny * separationForce;
            
            // Aplicar fuerzas de rebote más fuertes
            const bounceForce = 3.0; // Fuerza de rebote aumentada
            const relativeVelocityX = icon1.vx - icon2.vx;
            const relativeVelocityY = icon1.vy - icon2.vy;
            const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;
            
            // SIEMPRE aplicar fuerza de separación para garantizar movimiento
            const impulse = bounceForce * (1 + elasticity);
            
            // Aplicar impulso a ambos iconos SIEMPRE
            icon1.vx += nx * impulse;
            icon1.vy += ny * impulse;
            icon2.vx -= nx * impulse;
            icon2.vy -= ny * impulse;
            
            // Agregar componente aleatorio para evitar patrones repetitivos
            const randomForce = 0.5;
            icon1.vx += (Math.random() - 0.5) * randomForce;
            icon1.vy += (Math.random() - 0.5) * randomForce;
            icon2.vx += (Math.random() - 0.5) * randomForce;
            icon2.vy += (Math.random() - 0.5) * randomForce;
            
            // Asegurar velocidad mínima MAYOR para evitar que se queden pegados
            const minVelocity = 2.0; // Aumentado de 1.0 a 2.0
            
            // Para icon1
            const icon1Speed = Math.sqrt(icon1.vx * icon1.vx + icon1.vy * icon1.vy);
            if (icon1Speed < minVelocity) {
                const factor = minVelocity / (icon1Speed || 1);
                icon1.vx *= factor;
                icon1.vy *= factor;
                // Si aún es muy lento, dar velocidad en dirección de separación
                if (Math.abs(icon1.vx) < minVelocity / 2) {
                    icon1.vx = nx * minVelocity;
                }
                if (Math.abs(icon1.vy) < minVelocity / 2) {
                    icon1.vy = ny * minVelocity;
                }
            }
            
            // Para icon2
            const icon2Speed = Math.sqrt(icon2.vx * icon2.vx + icon2.vy * icon2.vy);
            if (icon2Speed < minVelocity) {
                const factor = minVelocity / (icon2Speed || 1);
                icon2.vx *= factor;
                icon2.vy *= factor;
                // Si aún es muy lento, dar velocidad en dirección opuesta
                if (Math.abs(icon2.vx) < minVelocity / 2) {
                    icon2.vx = -nx * minVelocity;
                }
                if (Math.abs(icon2.vy) < minVelocity / 2) {
                    icon2.vy = -ny * minVelocity;
                }
            }
            
            // FORZAR que ambos iconos se marquen como no aterrizados
            icon1.landed = false;
            icon2.landed = false;
            
            // GARANTIZAR movimiento mínimo SIEMPRE después de colisión
            const forceMovement = 1.5;
            if (Math.abs(icon1.vx) < forceMovement) {
                icon1.vx = nx * forceMovement * (Math.random() > 0.5 ? 1 : -1);
            }
            if (Math.abs(icon1.vy) < forceMovement) {
                icon1.vy = ny * forceMovement * (Math.random() > 0.5 ? 1 : -1);
            }
            if (Math.abs(icon2.vx) < forceMovement) {
                icon2.vx = -nx * forceMovement * (Math.random() > 0.5 ? 1 : -1);
            }
            if (Math.abs(icon2.vy) < forceMovement) {
                icon2.vy = -ny * forceMovement * (Math.random() > 0.5 ? 1 : -1);
            }
            
            // Verificar límites después de la separación y corregir velocidades
            if (icon1.x < 0) {
                icon1.x = 0;
                icon1.vx = Math.abs(icon1.vx);
            } else if (icon1.x > containerWidth - icon1.width) {
                icon1.x = containerWidth - icon1.width;
                icon1.vx = -Math.abs(icon1.vx);
            }
            
            if (icon2.x < 0) {
                icon2.x = 0;
                icon2.vx = Math.abs(icon2.vx);
            } else if (icon2.x > containerWidth - icon2.width) {
                icon2.x = containerWidth - icon2.width;
                icon2.vx = -Math.abs(icon2.vx);
            }
            
            // Asegurar que ambos iconos tengan Y válido
            if (icon1.y < -iconSize) icon1.y = -iconSize;
            if (icon2.y < -iconSize) icon2.y = -iconSize;
        }
    }

    function animate() {
        const floorY = containerHeight - floorHeight - iconSize;
        icons.forEach((iconData, index) => {
            // REMOVER la condición que evita que los iconos se muevan
            // Ahora TODOS los iconos siempre se procesan

            // Aplicar gravedad solo si no está en el suelo O si tiene velocidad vertical
            if (!iconData.landed || Math.abs(iconData.vy) > 0.01) {
                 iconData.vy += gravity;
            }

            iconData.x += iconData.vx;
            iconData.y += iconData.vy;

            // Rebote en paredes laterales con más fuerza
            if (iconData.x < 0) {
                iconData.x = 0;
                iconData.vx = -iconData.vx * (elasticity + 0.2); // Más rebote
                iconData.landed = false; // Forzar movimiento
            } else if (iconData.x > containerWidth - iconSize) {
                iconData.x = containerWidth - iconSize;
                iconData.vx = -iconData.vx * (elasticity + 0.2); // Más rebote
                iconData.landed = false; // Forzar movimiento
            }

            let onFloor = false;
            if (iconData.y >= floorY) {
                iconData.y = floorY;
                iconData.vy = -iconData.vy * elasticity;
                iconData.vx *= friction;
                onFloor = true;

                // Umbral MUY bajo para considerar "aterrizaje" - pero que permita reactivación
                if (Math.abs(iconData.vy) < 0.1 && Math.abs(iconData.vx) < 0.1) {
                    iconData.landed = true;
                    iconData.vy = 0;
                    iconData.vx *= 0.9; // Reducir muy poco para mantener capacidad de movimiento
                } else {
                    iconData.landed = false;
                }
            } else {
                iconData.landed = false;
            }

            // Verificar colisiones con TODOS los otros iconos
            for (let i = index + 1; i < icons.length; i++) {
                const otherIcon = icons[i];
                if (checkCollision(iconData, otherIcon)) {
                    handleCollision(iconData, otherIcon);
                    // FORZAR que ambos iconos se reactiven después de colisión
                    iconData.landed = false;
                    otherIcon.landed = false;
                }
            }

            // Corrección final de posición en el suelo
            if (iconData.y > floorY) {
                 iconData.y = floorY;
                 if (!onFloor) {
                     iconData.vy = -iconData.vy * elasticity * 0.5;
                 }
            }

            // Actualizar posición visual
            iconData.element.style.left = `${iconData.x}px`;
            iconData.element.style.top = `${iconData.y}px`;
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    const openModal = (type) => {
        const social = socialMedia.find(s => s.class === type);
        if (social) {
            modalData.value = social;
            if (type === 'email') {
                showEmailModal();
            } else {
                showStandardModal();
            }
        }
    };

    function showStandardModal() {
        isEmailMode.value = false;
        isModalVisible.value = true;
    }

    function showEmailModal() {
        isEmailMode.value = true;
        isModalVisible.value = true;
        // Reset button state when modal opens
        setTimeout(() => {
            const copyBtn = modalEmailCopyBtnRef.value;
            if (copyBtn) {
                const textSpan = copyBtn.querySelector('.copy-text');
                if (textSpan) textSpan.textContent = 'Copy';
                copyBtn.style.backgroundColor = '#eee';
            }
        }, 100);
    }

    const handleEmailCopy = () => {
        const copyBtn = modalEmailCopyBtnRef.value;
        if (!copyBtn) return;
        const textSpan = copyBtn.querySelector('.copy-text');

        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(targetEmail).then(() => {
                if (textSpan) textSpan.textContent = 'Copied!';
                copyBtn.style.backgroundColor = '#c8e6c9';
                setTimeout(() => {
                    if (textSpan) textSpan.textContent = 'Copy';
                    copyBtn.style.backgroundColor = '#eee';
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                fallbackCopyTextToClipboard();
            });
        } else {
            // Fallback for older browsers
            fallbackCopyTextToClipboard();
        }
        
        function fallbackCopyTextToClipboard() {
            const textArea = document.createElement("textarea");
            textArea.value = targetEmail;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    if (textSpan) textSpan.textContent = 'Copied!';
                    copyBtn.style.backgroundColor = '#c8e6c9';
                    setTimeout(() => {
                        if (textSpan) textSpan.textContent = 'Copy';
                        copyBtn.style.backgroundColor = '#eee';
                    }, 1500);
                } else {
                    if (textSpan) textSpan.textContent = 'Error';
                    setTimeout(() => {
                        if (textSpan) textSpan.textContent = 'Copy';
                    }, 1500);
                }
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                if (textSpan) textSpan.textContent = 'Error';
                setTimeout(() => {
                    if (textSpan) textSpan.textContent = 'Copy';
                }, 1500);
            }
            
            document.body.removeChild(textArea);
        }
    };

    function startIconGeneration() {
        for (let i = 0; i < 6; i++) {
            setTimeout(createIcon, i * 400);
        }
        iconIntervalId = setInterval(createIcon, 2500);
    }

    animate();
    startIconGeneration();
    
    // Expose handleEmailCopy to template
    window.handleEmailCopy = handleEmailCopy;
});

onUnmounted(() => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (iconIntervalId) {
        clearInterval(iconIntervalId);
    }
    if (iconAreaRef.value) {
        iconAreaRef.value.innerHTML = '';
    }
    icons.length = 0;
    // Reset counters
    iconCounts.value = {
        whatsapp: 0,
        instagram: 0,
        dribbble: 0,
        email: 0,
        linkedin: 0
    };
    // Clean up global function
    if (window.handleEmailCopy) {
        delete window.handleEmailCopy;
    }
});

const hideModal = () => {
    isModalVisible.value = false;
};

</script>

<style>
/* All your styles remain exactly the same */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
.container { 
  display: flex; 
  min-height: 100vh; 
  align-items: center; 
  justify-content: center; 
  padding: 1rem; 
  background-color: #F4F9FC; 
  transition: background-color 0.3s ease; 
  position: relative; 
  overflow: hidden;
}

/* Vertical Lines Background */
.container::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(72, 49, 212, 0.1) 1px, transparent 1px),
    linear-gradient(to right, rgba(72, 49, 212, 0.1) 1px, transparent 1px),
    linear-gradient(to right, rgba(72, 49, 212, 0.1) 1px, transparent 1px),
    linear-gradient(to right, rgba(72, 49, 212, 0.1) 1px, transparent 1px),
    linear-gradient(to right, rgba(72, 49, 212, 0.1) 1px, transparent 1px),
    linear-gradient(to right, rgba(72, 49, 212, 0.1) 1px, transparent 1px);
  background-size: 16.66% 100%, 16.66% 100%, 16.66% 100%, 16.66% 100%, 16.66% 100%, 16.66% 100%;
  background-position: 0 0, 16.66% 0, 33.33% 0, 50% 0, 66.66% 0, 83.33% 0;
  pointer-events: none;
  z-index: 0;
}
.browser { width: 100%; max-width: 800px; overflow: hidden; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); background-color: white; transition: all 0.3s ease; display: flex; flex-direction: column; z-index: 10; position: relative; }
.browser-header { display: flex; height: 40px; align-items: center; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb; padding: 0 12px; flex-shrink: 0; }
.traffic-lights { display: flex; gap: 8px; margin-right: 8px; }
.traffic-light { height: 12px; width: 12px; border-radius: 50%; }
.red { background-color: #ff5f57; } .yellow { background-color: #febc2e; } .green { background-color: #28c840; }
.search-bar-container { flex: 1; margin: 0 8px; min-width: 100px; }
.search-bar { display: flex; height: 28px; align-items: center; overflow: hidden; border-radius: 4px; border: 1px solid #d1d5db; background-color: white; padding: 0 8px; }
.search-icon { color: #6b7280; flex-shrink: 0; }
.search-input { flex: 1; border: none; background-color: transparent; padding: 0 8px; font-size: 14px; outline: none; color: #1f2937; min-width: 50px; }
.dark-mode-toggle { margin-left: 8px; margin-right: 8px; background: none; border: none; cursor: pointer; color: #4b5563; flex-shrink: 0; }
.menu-button { background: none; border: none; cursor: pointer; color: #4b5563; flex-shrink: 0; }
.browser-content { padding: 32px; background-color: white; position: relative; flex-grow: 1; min-height: 400px; overflow: hidden; transition: background-color 0.3s ease; }
.text-content { display: flex; flex-direction: column; align-items: center; justify-content: center; padding-bottom: 20px; position: relative; z-index: 1; }
.content-title { font-size: 28px; font-weight: bold; margin-bottom: 16px; text-align: center; color: #111827; transition: color 0.3s ease; }
.content-copy { text-align: center; font-size: 18px; color: #4b5563; transition: color 0.3s ease; }

/* Desktop Simulation */
.desktop-area {
   
  bottom: 0px; 
  left: 0;
  right: 0;
  height: 140px;
  background: transparent;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  
}

/* Desktop Icons */
.desktop-icons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  position: absolute;
  top: 15px;
  left: 15px;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 5px;
  border-radius: 8px;
}

.desktop-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
}

.icon-image {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.whatsapp-icon {
  background: #25D366;
  color: white;
}

.email-icon {
  background: #EA4335;
  color: white;
}

.linkedin-icon {
  background: #0077B5;
  color: white;
}

.dribbble-icon {
  background: #EA4C89;
  color: white;
}

.icon-image i {
  font-size: 16px;
}

.icon-label {
  font-size: 10px;
  color: white;
  text-align: center;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Notepad */
.notepad {
  background: #f8f9fa;
  border-radius: 6px;
  width: 280px;
  height: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid #dee2e6;
  position: absolute;
  bottom: 60px;  
}

/* Social Media Notepad */
.social-notepad {
  background: #f8f9fa;
  border-radius: 6px;
  width: 280px;
  height: 142px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid #dee2e6;
  position: absolute;
  bottom: 20%;  
  right: 15px; /* Para el notepad de redes sociales */
}

.notepad-header {
  background: #e9ecef;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  height: 24px;
}

.notepad-title {
  font-size: 11px;
  color: #495057;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.notepad-title i {
  font-size: 11px;
  color: #ffc107;
}

.notepad-controls {
  display: flex;
  gap: 4px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.control:hover {
  opacity: 0.7;
}

.minimize {
  background: #ffc107;
  color: #212529;
}

.maximize {
  background: #28a745;
  color: white;
}

.close {
  background: #dc3545;
  color: white;
}

.notepad-content {
  padding: 8px;
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.notepad-text {
  font-size: 12px;
  color: #495057;
  margin: 0;
  line-height: 1.3;
  font-weight: 500;
  text-align: center;
}

.notepad-text:first-child {
  margin-bottom: 4px;
  color: #4831D4;
  font-weight: 600;
}

/* Social Icons Grid */
.social-icons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  height: 100%;
  align-items: center;
}

.social-icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: #495057;
  font-size: 10px;
  font-weight: 500;
}

.social-icon-link:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.8);
}

.social-icon-link i {
  font-size: 16px;
  margin-bottom: 2px;
}

.whatsapp-link:hover {
  color: #25D366;
}

.email-link:hover {
  color: #EA4335;
}

.linkedin-link:hover {
  color: #0077B5;
}

.dribbble-link:hover {
  color: #EA4C89;
}

/* Taskbar */
.taskbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, #f0f0f0, #d0d0d0);
  border-top: 1px solid #bbb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.taskbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.start-button {
  background: linear-gradient(to bottom, #4a90e2, #357abd);
  color: white;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.start-button:hover {
  background: linear-gradient(to bottom, #5ba0f2, #4080cd);
}

.taskbar-apps {
  display: flex;
  gap: 4px;
}

.taskbar-app {
  background: rgba(255, 255, 255, 0.3);
  padding: 6px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  transition: all 0.2s ease;
}

.taskbar-app.active {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.taskbar-app:hover {
  background: rgba(255, 255, 255, 0.5);
}

.taskbar-right {
  display: flex;
  align-items: center;
}

.system-tray {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tray-icons {
  display: flex;
  gap: 6px;
  color: #333;
  font-size: 12px;
}

.tray-icons i {
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  transition: background 0.2s ease;
}

.tray-icons i:hover {
  background: rgba(255, 255, 255, 0.3);
}

.datetime {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.datetime:hover {
  background: rgba(255, 255, 255, 0.4);
}

.time {
  font-size: 11px;
  font-weight: bold;
  color: #333;
  line-height: 1;
}

.date {
  font-size: 9px;
  color: #666;
  line-height: 1;
}

.dark-mode .browser { border-color: #374151; background-color: #1f2937; }
.dark-mode .browser-header { background-color: #374151; border-bottom-color: #4b5563; }
.dark-mode .search-bar { border-color: #4b5563; background-color: #374151; }
.dark-mode .search-input { color: #d1d5db; }
.dark-mode .search-icon { color: #9ca3af; }
.dark-mode .dark-mode-toggle, .dark-mode .menu-button { color: #9ca3af; }
.dark-mode .browser-content { background-color: #111827; }
.dark-mode .content-title { color: #f9fafb; }
.dark-mode .content-copy { color: #d1d5db; }
@media (max-width: 640px) { .browser-content { min-height: 350px; } .text-content { padding-bottom: 10px; } .game-area { height: 80px; bottom: 15px; } .layout-container { bottom: 0; width: 80px; height: 75px; } .header-block { height: 10px; } .sidebar-block { top: 10px; width: 25px; height: 20px; } .content-block { top: 10px; left: 25px; width: 55px; height: 20px; } .section-1-block { top: 30px; height: 15px; } .section-2-block { top: 45px; height: 15px; } .footer-block { height: 10px; } }

@media (max-width: 640px) {
  .notepads-container {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .desktop-area {
    height: 120px;
    padding: 10px;
  }
  
  .notepad,
  .social-notepad {
    width: 200px;
    height: 100px;
  }
  
  .notepad-text {
    font-size: 10px;
  }
  
  .social-icon-link {
    font-size: 8px;
  }
  
  .social-icon-link i {
    font-size: 12px;
  }
  
  .taskbar {
    height: 35px;
  }
  
  .start-button {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  .time {
    font-size: 10px;
  }
  
  .date {
    font-size: 8px;
  }
}

.icon-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}

.icon {
    position: absolute;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
    z-index: 6;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.icon:hover { transform: scale(1.1); }
.whatsapp { color: #25D366; }
.instagram { color: #E1306C; }
.dribbble { color: #EA4C89; }
.email { color: #7f8c8d; }
.linkedin { color: #0077B5; }

.floor {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: 1;
}

.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center; justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.modal-overlay.visible {
    opacity: 1;
    visibility: visible;
}
.modal-content {
    background-color: white; padding: 30px; border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); text-align: center;
    max-width: 350px; width: 90%; position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}
.modal-overlay.visible .modal-content { transform: scale(1); }
.modal-close-btn {
    position: absolute; top: 10px; right: 10px; background: none;
    border: none; font-size: 24px; cursor: pointer; color: #aaa; line-height: 1;
}
.modal-close-btn:hover { color: #333; }

.modal-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.modal-header i {
    font-size: 24px;
}

.modal-title { font-size: 22px; font-weight: bold; margin-bottom: 10px; color: #333; }
.modal-text { font-size: 15px; color: #666; margin-bottom: 20px; line-height: 1.5; }
.modal-link-btn {
    display: inline-block; background-color: #5c67f2; color: white;
    padding: 10px 25px; border-radius: 5px; text-decoration: none;
    font-weight: bold; transition: background-color 0.2s ease;
}
.modal-link-btn:hover { background-color: #4a54c4; }

.modal-email-content {
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
}
.modal-email-display {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 500;
    background-color: #f0f2f5;
    padding: 10px 15px;
    border-radius: 4px;
    display: inline-block;
    word-break: break-all;
}
.modal-email-actions {
    display: flex;
    gap: 15px;
    width: 100%;
    justify-content: center;
}
.modal-email-btn {
    background-color: #eee;
    border: none;
    border-radius: 5px;
    padding: 10px 18px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #444;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.2s ease, color 0.2s ease;
    text-decoration: none;
}
.modal-email-btn:hover {
    background-color: #ddd;
    color: #000;
}
.modal-email-btn i {
    font-size: 15px;
}

.dark-mode .icon {
    color: #fff;
}
.dark-mode .whatsapp { color: #25D366; }
.dark-mode .email { color: #EA4335; }
.dark-mode .linkedin { color: #0077B5; }
.dark-mode .dribbble { color: #EA4C89; }

.dark-mode .floor {
    background-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .modal-content {
    background-color: #2d3748;
    color: #e2e8f0;
}
.dark-mode .modal-close-btn { color: #a0aec0; }
.dark-mode .modal-close-btn:hover { color: #f7fafc; }
.dark-mode .modal-image { border-color: #4a5568; }
.dark-mode .modal-title { color: #f7fafc; }
.dark-mode .modal-text { color: #cbd5e0; }
.dark-mode .modal-link-btn { background-color: #4c51bf; }
.dark-mode .modal-link-btn:hover { background-color: #434190; }
.dark-mode .modal-email-display { background-color: #4a5568; color: #f7fafc; }
.dark-mode .modal-email-btn { background-color: #4a5568; color: #e2e8f0; }
.dark-mode .modal-email-btn:hover { background-color: #718096; color: #f7fafc; }
</style>