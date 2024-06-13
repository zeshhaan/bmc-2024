import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

interface Person {
  name: string;
  gender: string;
  status: string;
}

const useRandomImageUrl = (gender: string) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(
      `https://xsgames.co/randomusers/avatar.php?g=${gender}&${Math.random()}`
    );
  }, [gender]);

  return imageUrl;
};

const Card = ({ person }: { person: Person }) => {
  const imageUrl = useRandomImageUrl(person.gender);

  return (
    <div className="relative flex flex-col items-center bg-white shadow-md w-64 cursor-pointer ring-1 ring-transparent ring-offset-8 transition-transform hover:scale-110 hover:ring-black/40">
      <span className="absolute right-3 top-4 inline-flex items-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-xs font-bold text-black capitalize">
        <svg
          className={`h-1.5 w-1.5 fill-current ${
            person.status === "active" ? "text-green-500" : "text-red-500"
          }`}
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx="3" cy="3" r="3" />
        </svg>
        {person.status}
      </span>
      <img
        src={imageUrl}
        alt={person.name}
        className="aspect-[4/5] w-full object-cover"
      />
      <h3 className="absolute bottom-2 text-2xl text-white font-black mb-2">
        {person.name}
      </h3>
    </div>
  );
};

const MarqueeSlider = () => {
  const sliderContent = useRef(null);
  const [variableDuration, setVariableDuration] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastTimeRef = useRef(0);

  const people = useMemo(
    () => [
      {
        name: "John Doe",
        gender: "male",
        status: "active",
      },
      {
        name: "Jane Smith",
        gender: "female",
        status: "active",
      },
      {
        name: "Mike Johnson",
        gender: "male",
        status: "active",
      },
      {
        name: "Emily Brown",
        gender: "female",
        status: "active",
      },
      {
        name: "Chris Lee",
        gender: "male",
        status: "inactive",
      },
      {
        name: "Sarah Wilson",
        gender: "female",
        status: "active",
      },
      {
        name: "David Taylor",
        gender: "male",
        status: "inactive",
      },
      {
        name: "Lisa Chen",
        gender: "female",
        status: "inactive",
      },
    ],
    []
  );

  const updateVariableDuration = useCallback(() => {
    const minWidth = 320;
    const maxWidth = 1920;
    const windowWidth = window.innerWidth;
    const normalized = Math.min(
      1,
      Math.max(
        0,
        parseFloat(
          ((windowWidth - minWidth) / (maxWidth - minWidth)).toFixed(2)
        )
      )
    );
    setVariableDuration(normalized);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateVariableDuration);
    updateVariableDuration();

    const sliderContentElement = sliderContent.current as HTMLElement | null;
    if (sliderContentElement) {
      const children = Array.from(sliderContentElement.children);
      children.forEach((child) => {
        sliderContentElement.appendChild(child.cloneNode(true));
      });
    }

    return () => {
      window.removeEventListener("resize", updateVariableDuration);
    };
  }, [updateVariableDuration]);

  const animate = useCallback(
    (time: number) => {
      if (!isPaused) {
        const deltaTime = time - lastTimeRef.current;
        const speed = 0.1 * (1 - variableDuration * 0.5);

        setTranslateX((prev) => {
          const newTranslateX = prev - speed * deltaTime;
          const containerWidth =
            (sliderContent.current as HTMLElement | null)?.offsetWidth || 0;
          return newTranslateX <= -containerWidth / 2 ? 0 : newTranslateX;
        });
      }
      lastTimeRef.current = time;
    },
    [isPaused, variableDuration]
  );

  useEffect(() => {
    let animationFrame: number;

    const runAnimation = (time: any) => {
      animate(time);
      animationFrame = requestAnimationFrame(runAnimation);
    };

    animationFrame = requestAnimationFrame(runAnimation);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [animate]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const sliderStyle = useMemo(
    () => ({
      transform: `translateX(${translateX}px)`,
      gap: "2rem",
    }),
    [translateX]
  );

  return (
    <div className="person-slider overflow-hidden max-w-[1920px] min-w-[320px] w-full flex py-10">
      <div
        ref={sliderContent}
        className="flex items-center"
        style={sliderStyle}
      >
        {people.map((person, index) => (
          <div
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSlider;
