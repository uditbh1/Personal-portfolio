
"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string; 
  title?: string; 
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
} as const;

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = "https://placehold.co/425x425.png", 
  iconUrl = "https://placehold.co/128x128.png",   
  grainUrl = "https://placehold.co/400x400.png",  
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name, 
  title, 
  handle = "uditb",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = width > 0 ? clamp((100 / width) * offsetX) : 50;
      const percentY = height > 0 ? clamp((100 / height) * offsetY) : 50;


      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(centerY, centerX) / 70.71, 0, 1)}`, 
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`, 
        "--rotate-y": `${round(centerY / 4)}deg`,  
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const currentCardRef = cardRef.current;
    const currentWrapRef = wrapRef.current;

    if (!currentCardRef || !currentWrapRef) return;
    
    let initialX = 0;
    let initialY = 0;

    const setInitialPosition = () => {
      if (currentWrapRef && currentCardRef && animationHandlers) {
        if (currentWrapRef.clientWidth > 0 && currentWrapRef.clientHeight > 0) {
            initialX = currentWrapRef.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
            initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
        } else {
            initialX = 200; 
            initialY = 50;  
        }
        
        animationHandlers.updateCardTransform(initialX, initialY, currentCardRef, currentWrapRef);
        animationHandlers.createSmoothAnimation(
          ANIMATION_CONFIG.INITIAL_DURATION,
          initialX,
          initialY,
          currentCardRef,
          currentWrapRef
        );
      }
    };
    
    const timeoutId = setTimeout(setInitialPosition, 100);

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    currentCardRef.addEventListener("pointerenter", pointerEnterHandler);
    currentCardRef.addEventListener("pointermove", pointerMoveHandler);
    currentCardRef.addEventListener("pointerleave", pointerLeaveHandler);

    return () => {
      clearTimeout(timeoutId);
      if (currentCardRef) {
        currentCardRef.removeEventListener("pointerenter", pointerEnterHandler);
        currentCardRef.removeEventListener("pointermove", pointerMoveHandler);
        currentCardRef.removeEventListener("pointerleave", pointerLeaveHandler);
      }
      if (animationHandlers) {
        animationHandlers.cancelAnimation();
      }
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
      }) as React.CSSProperties,
    [iconUrl, grainUrl]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  const handleMainAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://placehold.co/425x425.png?text=Avatar+Error'; 
    target.alt = 'Error loading avatar. Displaying placeholder.';
  };

  const handleMiniAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://placehold.co/48x48.png?text=Error'; 
    target.alt = 'Error loading mini avatar. Displaying placeholder.';
  };


  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl}
              alt={`${handle || "User"} avatar`}
              loading="lazy"
              data-ai-hint="profile avatar"
              onError={handleMainAvatarError}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${handle || "User"} mini avatar`}
                      loading="lazy"
                      data-ai-hint="profile avatar small"
                      onError={handleMiniAvatarError}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={handleContactClick}
                  style={{ pointerEvents: "auto" }}
                  type="button"
                  aria-label={`Contact ${handle || "user"}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              {/* Name and Title are not rendered here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
