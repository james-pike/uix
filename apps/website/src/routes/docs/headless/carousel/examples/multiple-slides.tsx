import { component$, useStyles$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
  const isPlaying = useSignal<boolean>(false);

  const slidesPerViewSig = useSignal(1.3); // Default to 1.3 for mobile

  // Update slidesPerView based on screen size
  useVisibleTask$(({ cleanup }) => {
    isPlaying.value = true;

    const updateSlidesPerView = () => {
      // Use Tailwind's default 'sm' breakpoint (640px) or adjust as needed
      if (window.matchMedia('(min-width: 640px)').matches) {
        slidesPerViewSig.value = 2.5; // Larger screens
      } else {
        slidesPerViewSig.value = 1.3; // Mobile
      }
    };

    // Run on initial load
    updateSlidesPerView();

    // Listen for window resize
    window.addEventListener('resize', updateSlidesPerView);

    // Cleanup listener on component unmount
    cleanup(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });
  });

  return (
    <Carousel.Root
      class="carousel-root"
      slidesPerView={slidesPerViewSig.value}
      gap={30}
      autoPlayIntervalMs={5500}
      bind:autoplay={isPlaying}
    >
      <Carousel.Scroller class="carousel-scroller">
        {colors.map((color) => (
          <Carousel.Slide key={color} class="carousel-slide bg-primary/10">
            {color}
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
      <div class="-mt-2 flex items-center justify-between gap-4">
        <Carousel.Pagination class="carousel-pagination">
          {colors.map((color, index) => (
            <Carousel.Bullet class="carousel-pagination-bullet" key={color}>
              {index + 1}
            </Carousel.Bullet>
          ))}
        </Carousel.Pagination>
        <div class="carousel-buttons mt-4 gap-1.5">
          <Carousel.Previous>
            <LuArrowLeft />
          </Carousel.Previous>
          <Carousel.Next>
            <LuArrowRight />
          </Carousel.Next>
        </div>
      </div>
    </Carousel.Root>
  );
});
// internal
import styles from './carousel.css?inline';
import { LuArrowLeft, LuArrowRight } from '@qwikest/icons/lucide';
