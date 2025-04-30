import TabsContent from "./TabsContent";
import "./Tabs.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const initialItems = [
  {
    id: 1,
    title: "Cambodia",
    content: "I like Cambodia and its treasures",
    url: "/tabs/cambodia",
  },
  { id: 2, title: "PoE", content: "I like casuals", url: "/tabs/poe" },
  { id: 3, title: "Art", content: "Art", url: "/tabs/art" },
];

const Tabs = () => {
  const [active, setActive] = useState(0);
  const [items, setItems] = useState(() =>
    localStorage.getItem("tabs")
      ? JSON.parse(localStorage.getItem("tabs"))
      : initialItems
  );
  const [visibleCount, setVisibleCount] = useState(items.length);

  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef();

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const updateCount = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const tabWidth = 16;
      const maxTabs = Math.floor(containerWidth / tabWidth) - 1;
      setVisibleCount(maxTabs);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, [items]);

  const handleTabClick = (index) => {
    setActive(index);
    navigate(items[index].url);
  };

  const handleClose = (id) => {
    setItems((prev) => {
      const updated = prev.filter((tab) => tab.id !== id);
      if (active >= updated.length) {
        setActive(updated.length - 1);
      }
      return updated;
    });
  };

  const handleAdd = () => {
    const newTab = {
      id: Date.now(),
      title: `New ${items.length + 1}`,
      content: `Content ${items.length + 1}`,
      url: `/tabs/new${items.length + 1}`,
    };
    setItems((prev) => [...prev, newTab]);
    setActive(items.length);
  };

  const hiddenTabs = items.slice(visibleCount);

  useEffect(() => {
    const currentPath = location.pathname;
    const index = items.findIndex((tab) => tab.url === currentPath);
    if (index !== -1) {
      setActive(index);
    }
  }, [location.pathname, items]);

  return (
    <div className="tabs__containet">
      <div className="tabs__wrapper" ref={containerRef}>
        {items.slice(0, visibleCount).map((tab, index) => (
          <TabsContent
            key={tab.id}
            title={tab.title}
            content={tab.content}
            isActive={active === index}
            onClick={() => handleTabClick(index)}
            onClose={() => handleClose(tab.id)}
          />
        ))}
        {hiddenTabs.length > 0 && (
          <div className="dropdown">
            ⋯
            <div className="dropdown__content">
              {hiddenTabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className="dropdown__item"
                  onClick={() => handleTabClick(visibleCount + index)}
                >
                  {tab.title}
                </div>
              ))}
            </div>
          </div>
        )}
        <span className="add" onClick={handleAdd}>
          +
        </span>
      </div>
    </div>
  );
};

export default Tabs;
