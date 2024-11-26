import { useEffect, useRef } from "react";

function SmoothScroll() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;
    let isScrolling = false;

    const smoothScroll = () => {
      isScrolling = true;
      lastScrollTop += (window.scrollY - lastScrollTop) * 0.1;

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${-lastScrollTop}px)`;
      }

      if (Math.abs(window.scrollY - lastScrollTop) > 0.5) {
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
      }
    };

    const handleScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="smooth-scroll-container" ref={containerRef}>
        <div className="content" ref={contentRef}>
          <section>
            <h1>Desplazamiento Suave Mejorado</h1>
            <p>Contenido adicional...</p>
            <div style={{ height: "100vh", backgroundColor: "lime" }}>a</div>
            <div style={{ height: "100vh", backgroundColor: "lightskyblue" }}>
              a
            </div>
            <div style={{ height: "100vh", backgroundColor: "mediumpurple" }}>
              a
            </div>
            <div style={{ height: "100vh", backgroundColor: "orchid" }}>a</div>
            <div style={{ height: "100vh", backgroundColor: "red" }}>a</div>
          </section>
        </div>
      </div>
    </>
  );
}
    
export default SmoothScroll;
