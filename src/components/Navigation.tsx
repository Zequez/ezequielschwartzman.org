import cx from "classnames";
import { useEffect, useState } from "preact/hooks";

export default function Navigation({
  items,
  initialActive,
}: {
  items: [string, string][];
  initialActive: number;
}) {
  const [bigScreen, setBigScreen] = useState(true);
  const itemsColors = items.map((_, i) => `hsl(${i * (360 / items.length)}, 50%, 50%)`);
  const itemsColorsTransparent = items.map(
    (_, i) => `hsla(${i * (360 / items.length)}, 50%, 50%, 10%)`
  );
  const itemsColorsDimmer = items.map((_, i) => `hsl(${i * (360 / items.length)}, 20%, 50%)`);
  const itemsColorsDarker = items.map((_, i) => `hsl(${i * (360 / items.length)}, 50%, 40%)`);
  const itemsColorsDarkerDimmer = items.map((_, i) => `hsl(${i * (360 / items.length)}, 20%, 40%)`);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const mediaQuery = window.matchMedia("(min-width: 640px)");
  //     mediaQuery.addEventListener("change", (e) => {
  //       setBigScreen(!!e.matches);
  //     });
  //     setBigScreen(!!mediaQuery.matches);
  //   }
  // }, []);

  return bigScreen ? (
    <>
      <header class="fixed h-10 bottom-0 inset-x-0 bg-gray-100 border-t border-gray-200 z-40 sm:hidden">
        <a class="flex items-center" href="/">
          <div class="h-10 w-10 mr-4">
            <img src="/assets/avatar2.jpg" alt="A picture of myself in the woods" />
          </div>
          <h1 class="text-base font-serif text-black/70" style={{ textShadow: "0 1px 0 #fff" }}>
            Ezequiel Schwartzman
          </h1>
        </a>
      </header>
      <header class="fixed w-56 inset-y-0 right-0 bg-gray-100 z-20 border-l border-gray-300 hidden sm:block">
        <a class="block" href="/">
          <div class="p-4">
            <img
              src="/assets/avatar2.jpg"
              alt="A picture of myself in the woods"
              class="rounded-full border-2 border-gray-300"
            />
          </div>

          <h1
            class="text-2xl font-serif text-center mb-4 text-black/70"
            style={{ textShadow: "0 1px 0 #fff" }}
          >
            Ezequiel Schwartzman
          </h1>
        </a>
        <div class="text-white font-serif text-center">
          {items.map(([title, href], i) => (
            <div>
              <a
                href={href}
                class="inline-block rounded-md px-2 py-1 mb-2 outline-2 hover:outline-solid"
                style={{
                  color: i == initialActive ? "white" : itemsColors[i],
                  backgroundColor: i === initialActive ? itemsColors[i] : itemsColorsTransparent[i],
                  outlineColor: i == initialActive ? itemsColorsDarker[i] : itemsColors[i],
                }}
              >
                {title}
              </a>
            </div>
          ))}
        </div>
      </header>
    </>
  ) : null;
}
