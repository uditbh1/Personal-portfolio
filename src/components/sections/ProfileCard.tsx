
"use client";
import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  CSSProperties,
} from "react";
import Image from 'next/image';
import { useTheme } from "next-themes";
import "./ProfileCard.css";

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
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

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, min1: number, max1: number, min2: number, max2: number) =>
  round(min2 + ((max2 - min2) * (v - min1)) / (max1 - min1));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl,
  iconUrl,
  grainUrl,
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name,
  title,
  handle = "uditbh1",
  status = "Available",
  contactText ,
  showUserInfo = false,
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // 🌗 THEME-AWARE GRADIENTS
  const themedDefaultBehindGradient =
  resolvedTheme === "light"
    ? `radial-gradient(circle at var(--pointer-x) var(--pointer-y),
        hsl(210, 13%, 70%) 0%,
        hsl(210, 13%, 60%, 0.5) 40%,
        transparent 100%)`
    : `radial-gradient(circle at var(--pointer-x) var(--pointer-y),
        hsl(180, 100%, 30%) 0%,
        hsl(180, 100%, 30%, 0.4) 40%,
        transparent 100%)`;


        const themedDefaultInnerGradient =
        resolvedTheme === "light"
          ? `linear-gradient(135deg,
              hsl(210, 13%, 95%) 0%,
              hsl(210, 13%, 85%) 100%)`
          : `linear-gradient(135deg,
              hsl(180, 100%, 15%) 0%,
              hsl(180, 100%, 25%) 100%)`;
      

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
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const props: Record<string, string> = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(centerX, centerY) / 50)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-centerX / 5)}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(props).forEach(([key, val]) =>
        wrap.style.setProperty(key, val)
      );
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const start = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = clamp(elapsed / duration);
        const eased = easeInOutCubic(progress);
        updateCardTransform(
          adjust(eased, 0, 1, startX, targetX),
          adjust(eased, 0, 1, startY, targetY),
          card,
          wrap
        );
        if (progress < 1) rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
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

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    const rect = card.getBoundingClientRect();
    animationHandlers.updateCardTransform(
      e.clientX - rect.left,
      e.clientY - rect.top,
      card,
      wrap
    );
  }, [animationHandlers]);

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback((e: PointerEvent) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.SMOOTH_DURATION,
      e.offsetX,
      e.offsetY,
      card,
      wrap
    );
    wrap.classList.remove("active");
    card.classList.remove("active");
  }, [animationHandlers]);

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    const startX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const startY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(startX, startY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      startX,
      startY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [animationHandlers, enableTilt, handlePointerEnter, handlePointerMove, handlePointerLeave]);

  const cardStyle = useMemo(() => ({
    "--icon": iconUrl ? `url(${iconUrl})` : "none",
    "--grain": grainUrl ? `url(${grainUrl})` : "none",
    "--behind-gradient": showBehindGradient
      ? behindGradient ?? themedDefaultBehindGradient
      : "none",
    "--inner-gradient": innerGradient ?? themedDefaultInnerGradient,
  } as CSSProperties), [
    iconUrl,
    grainUrl,
    showBehindGradient,
    behindGradient,
    themedDefaultBehindGradient,
    innerGradient,
    themedDefaultInnerGradient,
  ]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className || ""}`} style={cardStyle}>
      <div ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
          <Image
              priority
              className="avatar"
              src={avatarUrl}
              alt={`${name} avatar`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain', objectPosition: 'bottom' }}
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name} mini avatar`}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.opacity = "0.5";
                        img.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={() => onContactClick?.()}
                  type="button"
                  aria-label={`Contact ${name}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;

    